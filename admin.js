#!/usr/bin/env node
'use strict';

/**
 * 本地管理后台（零依赖）
 * ------------------------------------------------------------
 * 运行: node admin.js          → http://127.0.0.1:8090
 * 只监听本机，不对外暴露；改完内容可一键构建。
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = __dirname;
const CONTENT = path.join(ROOT, 'content');
const POSTS = path.join(CONTENT, 'posts');
const IMAGES = path.join(ROOT, 'assets', 'images');
const CONFIG_FILE = path.join(ROOT, 'config.json');

let port = Number(process.argv.find((a) => /^\d+$/.test(a))) || 8090;
const MAX_BODY = 30 * 1024 * 1024;

/* ---------------------------- 工具 ---------------------------- */

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    return fallback;
  }
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function json(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

function readBody(req) {
  return new Promise(function (resolve, reject) {
    let size = 0;
    const chunks = [];
    req.on('data', function (c) {
      size += c.length;
      if (size > MAX_BODY) {
        reject(new Error('请求体过大'));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', function () {
      if (!chunks.length) return resolve({});
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch (e) {
        reject(new Error('JSON 解析失败'));
      }
    });
    req.on('error', reject);
  });
}

function safeSlug(slug) {
  return String(slug || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function parseFrontMatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: raw };

  const data = {};
  m[1].split(/\r?\n/).forEach(function (line) {
    const i = line.indexOf(':');
    if (i === -1) return;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if (!key) return;
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (val.startsWith('[') && val.endsWith(']')) {
      data[key] = val
        .slice(1, -1)
        .split(',')
        .map(function (s) { return s.trim(); })
        .filter(Boolean);
    } else {
      data[key] = val;
    }
  });
  return { data: data, body: raw.slice(m[0].length) };
}

function listPosts() {
  if (!fs.existsSync(POSTS)) return [];
  return fs
    .readdirSync(POSTS)
    .filter(function (f) { return /\.md$/i.test(f); })
    .map(function (file) {
      const slug = file.replace(/\.md$/i, '');
      const raw = fs.readFileSync(path.join(POSTS, file), 'utf8');
      const parsed = parseFrontMatter(raw);
      const cjk = (parsed.body.match(/[\u4e00-\u9fa5]/g) || []).length;
      return {
        slug: slug,
        title: parsed.data.title || slug,
        date: String(parsed.data.date || '').slice(0, 10),
        tags: Array.isArray(parsed.data.tags) ? parsed.data.tags : [],
        summary: parsed.data.summary || '',
        draft: String(parsed.data.draft || '').toLowerCase() === 'true',
        chars: cjk,
        bytes: Buffer.byteLength(raw, 'utf8'),
      };
    })
    .sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });
}

function monthKey(date) {
  return String(date || '').slice(0, 7);
}

function buildStats(posts, notes, albums) {
  const tags = {};
  posts.forEach(function (p) {
    p.tags.forEach(function (t) { tags[t] = (tags[t] || 0) + 1; });
  });

  const months = {};
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months[d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0')] = 0;
  }
  posts.forEach(function (p) {
    const k = monthKey(p.date);
    if (k in months) months[k] += 1;
  });

  return {
    posts: posts.length,
    drafts: posts.filter(function (p) { return p.draft; }).length,
    chars: posts.reduce(function (s, p) { return s + p.chars; }, 0),
    tags: Object.keys(tags).length,
    tagList: Object.keys(tags)
      .map(function (t) { return { tag: t, count: tags[t] }; })
      .sort(function (a, b) { return b.count - a.count; }),
    notes: notes.length,
    albums: albums.length,
    photos: albums.reduce(function (s, a) { return s + (a.photos ? a.photos.length : 0); }, 0),
    months: Object.keys(months).map(function (k) { return { month: k, count: months[k] }; }),
  };
}

/* ---------------------------- 构建 ---------------------------- */

function runBuild() {
  return new Promise(function (resolve) {
    const started = Date.now();
    const child = spawn(process.execPath, [path.join(ROOT, 'build.js')], { cwd: ROOT });
    let out = '';

    child.stdout.on('data', function (d) { out += d.toString(); });
    child.stderr.on('data', function (d) { out += d.toString(); });
    child.on('close', function (code) {
      resolve({ code: code, output: out.trim(), ms: Date.now() - started });
    });
  });
}

/* ---------------------------- 路由 ---------------------------- */

const server = http.createServer(async function (req, res) {
  const url = new URL(req.url, 'http://127.0.0.1');
  const pathname = url.pathname;

  try {
    /* 管理页面 */
    if (pathname === '/' || pathname === '/index.html') {
      const html = fs.readFileSync(path.join(ROOT, 'admin', 'index.html'), 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
      return res.end(html);
    }

    /* 全量状态 */
    if (pathname === '/api/state' && req.method === 'GET') {
      const posts = listPosts();
      const notes = readJson(path.join(CONTENT, 'notes.json'), []);
      const albums = readJson(path.join(CONTENT, 'albums.json'), []);
      const config = readJson(CONFIG_FILE, {});

      return json(res, 200, {
        site: {
          title: config.title,
          author: config.author,
          url: config.url,
        },
        posts: posts,
        notes: notes,
        albums: albums,
        stats: buildStats(posts, notes, albums),
      });
    }

    /* 单篇文章原文 */
    if (pathname === '/api/post' && req.method === 'GET') {
      const slug = safeSlug(url.searchParams.get('slug'));
      const file = path.join(POSTS, slug + '.md');
      if (!slug || !fs.existsSync(file)) return json(res, 404, { error: '文章不存在' });
      return json(res, 200, { slug: slug, raw: fs.readFileSync(file, 'utf8') });
    }

    /* 保存 / 新建文章 */
    if (pathname === '/api/post' && req.method === 'POST') {
      const body = await readBody(req);
      const slug = safeSlug(body.slug || body.title);
      if (!slug) return json(res, 400, { error: 'slug 不能为空，只能包含字母、数字和连字符' });

      const tags = Array.isArray(body.tags)
        ? body.tags
        : String(body.tags || '')
            .split(/[,，]/)
            .map(function (s) { return s.trim(); })
            .filter(Boolean);

      const fm = [
        '---',
        'title: ' + (body.title || slug),
        'date: ' + (body.date || new Date().toISOString().slice(0, 10)),
      ];
      if (body.updated) fm.push('updated: ' + body.updated);
      if (tags.length) fm.push('tags: [' + tags.join(', ') + ']');
      if (body.summary) fm.push('summary: ' + body.summary);
      if (body.draft) fm.push('draft: true');
      fm.push('---', '');

      fs.mkdirSync(POSTS, { recursive: true });
      fs.writeFileSync(path.join(POSTS, slug + '.md'), fm.join('\n') + (body.body || '') + '\n', 'utf8');

      return json(res, 200, { ok: true, slug: slug });
    }

    /* 删除文章 */
    if (pathname === '/api/post' && req.method === 'DELETE') {
      const slug = safeSlug(url.searchParams.get('slug'));
      const file = path.join(POSTS, slug + '.md');
      if (!slug || !fs.existsSync(file)) return json(res, 404, { error: '文章不存在' });
      fs.unlinkSync(file);
      return json(res, 200, { ok: true });
    }

    /* 说说 */
    if (pathname === '/api/notes' && req.method === 'POST') {
      const body = await readBody(req);
      if (!Array.isArray(body.notes)) return json(res, 400, { error: 'notes 必须是数组' });
      writeJson(path.join(CONTENT, 'notes.json'), body.notes);
      return json(res, 200, { ok: true, count: body.notes.length });
    }

    /* 相册 */
    if (pathname === '/api/albums' && req.method === 'POST') {
      const body = await readBody(req);
      if (!Array.isArray(body.albums)) return json(res, 400, { error: 'albums 必须是数组' });
      writeJson(path.join(CONTENT, 'albums.json'), body.albums);
      return json(res, 200, { ok: true, count: body.albums.length });
    }

    /* 上传图片（base64） */
    if (pathname === '/api/upload' && req.method === 'POST') {
      const body = await readBody(req);
      const album = safeSlug(body.album);
      const name = String(body.filename || '').replace(/[^\w.-]/g, '');
      if (!album || !name) return json(res, 400, { error: '相册名或文件名不合法' });
      if (!/\.(jpg|jpeg|png|webp|gif|svg|avif)$/i.test(name)) {
        return json(res, 400, { error: '只支持图片格式：jpg / png / webp / gif / svg / avif' });
      }

      const buffer = Buffer.from(String(body.data || '').split(',').pop(), 'base64');
      if (!buffer.length) return json(res, 400, { error: '图片内容为空' });

      const dir = path.join(IMAGES, album);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, name), buffer);

      return json(res, 200, { ok: true, src: '/assets/images/' + album + '/' + name, size: buffer.length });
    }

    /* 构建 */
    if (pathname === '/api/build' && req.method === 'POST') {
      const result = await runBuild();
      return json(res, 200, result);
    }

    json(res, 404, { error: '接口不存在' });
  } catch (e) {
    json(res, 500, { error: e.message });
  }
});

server.on('error', function (err) {
  if (err.code === 'EADDRINUSE') {
    port += 1;
    console.log('  端口被占用，改用 ' + port);
    server.listen(port, '127.0.0.1');
    return;
  }
  console.error('启动失败: ' + err.message);
  process.exit(1);
});

server.on('listening', function () {
  const url = 'http://127.0.0.1:' + port;
  console.log('');
  console.log('  管理后台: ' + url);
  console.log('  只监听本机，改完内容点「构建」即可生成页面');
  console.log('  停止: Ctrl+C');
  console.log('');

  if (process.argv.indexOf('--open') !== -1) {
    spawn('cmd', ['/c', 'start', '', url], { detached: true, stdio: 'ignore' }).unref();
  }
});

server.listen(port, '127.0.0.1');
