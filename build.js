#!/usr/bin/env node
'use strict';

/**
 * 静态博客生成器
 * ------------------------------------------------------------
 * content/posts/*.md  →  public/**.html
 * 零依赖，只用到 Node.js 内置模块。
 * 用法: node build.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'public');
const ASSETS = path.join(ROOT, 'assets');
const CONTENT = path.join(ROOT, 'content');
const POSTS_DIR = path.join(CONTENT, 'posts');

const rawConfig = JSON.parse(fs.readFileSync(path.join(ROOT, 'config.json'), 'utf8'));

const SITE = {
  title: rawConfig.title || '我的博客',
  tagline: rawConfig.tagline || '',
  description: rawConfig.description || '',
  author: rawConfig.author || '',
  email: rawConfig.email || '',
  url: String(rawConfig.url || 'https://example.com').replace(/\/+$/, ''),
  lang: rawConfig.language || 'zh-CN',
  perPage: Math.max(1, Number(rawConfig.postsPerPage) || 8),
  startYear: Number(rawConfig.startYear) || new Date().getFullYear(),
  footerNote: rawConfig.footerNote || '',
  social: Array.isArray(rawConfig.social) ? rawConfig.social : [],
  comments: rawConfig.comments || { enabled: false },
  analytics: rawConfig.analytics || { enabled: false },
  music: rawConfig.music || { enabled: false },
  background: rawConfig.background || { enabled: false },
  carousel: rawConfig.carousel || { enabled: false },
  notice: rawConfig.notice || { enabled: false },
  profile: rawConfig.profile || { enabled: true },
  weather: rawConfig.weather || { enabled: false },
};

const NAV = [
  { href: '/', label: '首页', key: 'home', icon: 'home' },
  { href: '/archive.html', label: '文章', key: 'archive', icon: 'file' },
  { href: '/notes.html', label: '说说', key: 'notes', icon: 'chat' },
  { href: '/photos.html', label: '照片', key: 'photos', icon: 'image' },
  { href: '/tags.html', label: '标签', key: 'tags', icon: 'tag' },
  { href: '/links.html', label: '友链', key: 'links', icon: 'users' },
  { href: '/about.html', label: '关于', key: 'about', icon: 'user' },
];

/* 下拉菜单里的次要入口 */
const NAV_MORE = [
  { href: '/categories.html', label: '分类', key: 'categories', icon: 'folder' },
  { href: '/search.html', label: '搜索', key: 'search', icon: 'search' },
  { href: '/feed.xml', label: 'RSS 订阅', key: 'rss', icon: 'rss', external: true },
];

const NAV_ICON = {
  home: '<path d="M4 11.2 12 4l8 7.2V20a1 1 0 0 1-1 1h-4v-7H9v7H5a1 1 0 0 1-1-1z"/>',
  file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 16h6"/>',
  chat: '<path d="M4 5h16v11H9l-4 4z"/>',
  image: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m5 17 5-5 4 4 3-2 3 3"/>',
  tag: '<path d="M4 11V5a1 1 0 0 1 1-1h6l9 9-7 7z"/><circle cx="8.5" cy="8.5" r="1.3"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 5.5a3 3 0 0 1 0 5.6M17 20a6 6 0 0 0-2-4.5"/>',
  user: '<circle cx="12" cy="8" r="3.4"/><path d="M5 20a7 7 0 0 1 14 0"/>',
  folder: '<path d="M4 6a2 2 0 0 1 2-2h4l2 3h6a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
  rss: '<path d="M5 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="M5 11a8 8 0 0 1 8 8M5 5a14 14 0 0 1 14 14"/>',
  music: '<circle cx="7" cy="18" r="2.6"/><circle cx="18" cy="16" r="2.6"/><path d="M9.6 18V7l11-2v11"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
};

let POST_COUNT = 0;

/* ============================ 工具函数 ============================ */

const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function fmtDate(iso) {
  const s = String(iso || '').slice(0, 10);
  const parts = s.split('-');
  if (parts.length < 3) return s;
  return parts[0] + '年' + Number(parts[1]) + '月' + Number(parts[2]) + '日';
}

function isoDate(v) {
  return String(v || '').slice(0, 10);
}

function readingMinutes(text) {
  const cjk = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const words = (text.replace(/[\u4e00-\u9fa5]/g, ' ').match(/[A-Za-z0-9_]+/g) || []).length;
  return Math.max(1, Math.round(cjk / 400 + words / 200));
}

function stripHtml(html) {
  return String(html)
    .replace(/<pre[\s\S]*?<\/pre>/g, ' ')
    .replace(/<table[\s\S]*?<\/table>/g, ' ')
    .replace(/<a class="anchor"[\s\S]*?<\/a>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripMd(md) {
  return String(md)
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_`>|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(s, n) {
  s = String(s || '');
  return s.length > n ? s.slice(0, n) + '…' : s;
}

const tagId = (t) => 'tag-' + encodeURIComponent(t);

function tagSlugText(t) {
  return '#' + t;
}

/* ============================ Markdown ============================ */

function renderInline(text) {
  const codes = [];

  let s = esc(text).replace(/`([^`]+)`/g, function (m, c) {
    codes.push(c);
    return '\u0001' + (codes.length - 1) + '\u0001';
  });

  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, function (m, alt, src) {
    return '<img src="' + src + '" alt="' + alt + '" loading="lazy">';
  });

  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (m, label, href) {
    const ext = /^https?:\/\//.test(href) ? ' target="_blank" rel="noopener"' : '';
    return '<a href="' + href + '"' + ext + '>' + label + '</a>';
  });

  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  s = s.replace(/~~([^~]+)~~/g, '<del>$1</del>');

  return s.replace(/\u0001(\d+)\u0001/g, function (m, i) {
    return '<code>' + codes[Number(i)] + '</code>';
  });
}

const BLOCK_START = /^\s*(#{1,6}\s+|```|>|\|)/;
const LIST_START = /^\s*([-*+]|\d+\.)\s+/;
const HR_LINE = /^\s*([-*_])(\s*\1){2,}\s*$/;

function renderBlocks(md, toc) {
  const lines = md.replace(/\r\n?/g, '\n').split('\n');
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (/^\s*$/.test(line)) {
      i++;
      continue;
    }

    /* 代码块 */
    const fence = line.match(/^\s*```\s*([\w+#.-]*)\s*$/);
    if (fence) {
      const lang = fence[1];
      i++;
      const buf = [];
      while (i < lines.length && !/^\s*```\s*$/.test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      i++;
      const codeLines = buf
        .map(function (line) { return '<span class="cl">' + esc(line) + '</span>'; })
        .join('');

      out.push(
        '<pre class="code"' + (lang ? ' data-lang="' + esc(lang) + '"' : '') + '><code' +
          (lang ? ' class="language-' + esc(lang) + '"' : '') +
          '>' + codeLines + '</code></pre>'
      );
      continue;
    }

    /* 标题 */
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].replace(/\s+#+\s*$/, '');
      const id = 'sec-' + (toc.length + 1);
      toc.push({ id: id, level: level, text: text });
      out.push(
        '<h' + level + ' id="' + id + '">' + renderInline(text) +
        '<a class="anchor" href="#' + id + '" aria-hidden="true">#</a></h' + level + '>'
      );
      i++;
      continue;
    }

    /* 分隔线 */
    if (HR_LINE.test(line)) {
      out.push('<hr>');
      i++;
      continue;
    }

    /* 引用 */
    if (/^\s*>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^\s*>\s?/, ''));
        i++;
      }
      out.push('<blockquote>' + renderBlocks(buf.join('\n'), []) + '</blockquote>');
      continue;
    }

    /* 表格 */
    if (/^\s*\|.*\|\s*$/.test(line) && i + 1 < lines.length && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1])) {
      const rows = [];
      while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i])) {
        rows.push(
          lines[i].trim().replace(/^\||\|$/g, '').split('|').map(function (c) {
            return c.trim();
          })
        );
        i++;
      }
      const head = rows[0] || [];
      const body = rows.slice(2);
      out.push(
        '<div class="table-wrap"><table><thead><tr>' +
          head.map(function (c) { return '<th>' + renderInline(c) + '</th>'; }).join('') +
          '</tr></thead><tbody>' +
          body.map(function (r) {
            return '<tr>' + r.map(function (c) { return '<td>' + renderInline(c) + '</td>'; }).join('') + '</tr>';
          }).join('') +
          '</tbody></table></div>'
      );
      continue;
    }

    /* 列表 */
    if (LIST_START.test(line)) {
      const ordered = /^\s*\d+\.\s+/.test(line);
      const tag = ordered ? 'ol' : 'ul';
      const items = [];
      while (i < lines.length && LIST_START.test(lines[i])) {
        let item = lines[i].replace(LIST_START, '');
        i++;
        while (
          i < lines.length &&
          /^\s{2,}\S/.test(lines[i]) &&
          !LIST_START.test(lines[i]) &&
          !/^\s*$/.test(lines[i])
        ) {
          item += ' ' + lines[i].trim();
          i++;
        }
        items.push('<li>' + renderInline(item) + '</li>');
      }
      out.push('<' + tag + '>' + items.join('') + '</' + tag + '>');
      continue;
    }

    /* 段落 */
    const para = [];
    while (i < lines.length && !/^\s*$/.test(lines[i])) {
      const blocked = BLOCK_START.test(lines[i]) || LIST_START.test(lines[i]) || HR_LINE.test(lines[i]);
      if (blocked && para.length) break;
      para.push(lines[i].trim());
      i++;
      if (blocked) break;
    }
    if (para.length) out.push('<p>' + renderInline(para.join(' ')) + '</p>');
  }

  return out.join('\n');
}

function renderMarkdown(md) {
  const toc = [];
  const html = renderBlocks(md, toc);
  return { html: html, toc: toc };
}

/* ============================ 内容加载 ============================ */

function parseFrontMatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: raw };

  const data = {};
  m[1].split(/\r?\n/).forEach(function (line) {
    const idx = line.indexOf(':');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (!key) return;
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (val.startsWith('[') && val.endsWith(']')) {
      data[key] = val
        .slice(1, -1)
        .split(',')
        .map(function (s) { return s.trim().replace(/^["']|["']$/g, ''); })
        .filter(Boolean);
    } else {
      data[key] = val;
    }
  });
  return { data: data, body: raw.slice(m[0].length) };
}

function loadPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR)
    .filter(function (f) { return /\.md$/i.test(f); })
    .map(function (file) {
      const slug = file.replace(/\.md$/i, '');
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
      const parsed = parseFrontMatter(raw);
      const rendered = renderMarkdown(parsed.body);

      return {
        slug: slug,
        title: parsed.data.title || slug,
        date: isoDate(parsed.data.date),
        updated: isoDate(parsed.data.updated),
        tags: Array.isArray(parsed.data.tags) ? parsed.data.tags : parsed.data.tags ? [parsed.data.tags] : [],
        category: parsed.data.category || '未分类',
        summary: parsed.data.summary || truncate(stripMd(parsed.body), 110),
        draft: String(parsed.data.draft || '').toLowerCase() === 'true',
        pinned: String(parsed.data.pinned || '').toLowerCase() === 'true',
        html: rendered.html,
        toc: rendered.toc,
        minutes: readingMinutes(parsed.body),
        chars: stripMd(parsed.body).replace(/\s+/g, '').length,
        text: truncate(stripHtml(rendered.html), 600),
      };
    })
    .filter(function (p) { return !p.draft; })
    .sort(function (a, b) {
      return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
    });
}

function loadJson(fileName, fallback) {
  const file = path.join(CONTENT, fileName);
  if (!fs.existsSync(file)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    console.warn('  ! ' + fileName + ' 解析失败: ' + e.message);
    return fallback;
  }
}

function loadNotes() {
  const raw = loadJson('notes.json', []);
  return (Array.isArray(raw) ? raw : [])
    .filter(function (n) { return n && n.text; })
    .map(function (n, i) {
      return {
        id: n.id || 'note-' + (i + 1),
        date: isoDate(n.date),
        color: n.color || 'amber',
        text: String(n.text),
        images: Array.isArray(n.images) ? n.images : [],
      };
    })
    .sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });
}

function loadAlbums() {
  const raw = loadJson('albums.json', []);
  return (Array.isArray(raw) ? raw : [])
    .filter(function (a) { return a && a.slug; })
    .map(function (a) {
      const photos = (Array.isArray(a.photos) ? a.photos : []).filter(function (p) { return p && p.src; });
      return {
        slug: a.slug,
        title: a.title || a.slug,
        description: a.description || '',
        date: isoDate(a.date),
        cover: a.cover || (photos[0] && photos[0].src) || '',
        photos: photos,
      };
    });
}

/* ============================ 模板片段 ============================ */

function ni(name, cls) {
  return '<svg class="' + (cls || 'ni') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor"' +
    ' stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    (NAV_ICON[name] || '') + '</svg>';
}

function navHtml(active, idSuffix) {
  const links = NAV.map(function (item) {
    const cls = 'nav-link' + (active === item.key ? ' active' : '');
    return '<a class="' + cls + '" href="' + item.href + '">' + ni(item.icon) +
      '<span>' + item.label + '</span></a>';
  });

  const more = NAV_MORE.map(function (item) {
    const ext = item.external ? ' target="_blank" rel="noopener"' : '';
    return '<a class="dropdown-item" href="' + item.href + '"' + ext + '>' + ni(item.icon) +
      '<span>' + item.label + '</span></a>';
  }).join('');

  const hasActiveMore = NAV_MORE.some(function (i) { return i.key === active; });

  links.push(
    '<div class="dropdown" id="navMore' + (idSuffix || '') + '">' +
      '<button class="nav-link dropdown-toggle' + (hasActiveMore ? ' active' : '') + '" type="button"' +
        ' aria-expanded="false" aria-haspopup="true">' +
        ni('folder') + '<span>更多</span>' + ni('chevron', 'ni ni-chevron') +
      '</button>' +
      '<div class="dropdown-menu">' + more + '</div>' +
    '</div>'
  );

  return links.join('\n        ');
}

function analyticsHtml() {
  const a = SITE.analytics;
  if (!a || !a.enabled) return '';
  if (a.provider === 'umami' && a.umami && a.umami.src && a.umami.websiteId) {
    return (
      '<script defer src="' + esc(a.umami.src) + '" data-website-id="' + esc(a.umami.websiteId) + '"></script>'
    );
  }
  return '';
}

function hasBg() {
  return !!(SITE.background && SITE.background.enabled && SITE.background.image);
}

function hasCarousel() {
  const c = SITE.carousel;
  return !!(c && c.enabled && Array.isArray(c.slides) && c.slides.length);
}

function firstSlideImage() {
  const c = SITE.carousel;
  return hasCarousel() && c.slides[0].image ? c.slides[0].image : '';
}

/* 动态波浪：三层不同速度、不同方向的周期曲线，各自两个周期以便无缝循环 */
const WAVE_LAYERS = [
  '<div class="hb-waves" aria-hidden="true">',
  '  <svg class="hb-wave w1" viewBox="0 0 2880 120" preserveAspectRatio="none">',
  '    <path d="M0,52 C320,86 400,26 720,52 C1040,78 1120,24 1440,52 C1760,86 1840,26 2160,52 C2480,78 2560,24 2880,52 L2880,120 L0,120 Z"/>',
  '  </svg>',
  '  <svg class="hb-wave w2" viewBox="0 0 2880 120" preserveAspectRatio="none">',
  '    <path d="M0,70 C180,40 360,96 720,66 C1080,36 1260,96 1440,70 C1620,40 1800,96 2160,66 C2520,36 2700,96 2880,70 L2880,120 L0,120 Z"/>',
  '  </svg>',
  '  <svg class="hb-wave w3" viewBox="0 0 2880 120" preserveAspectRatio="none">',
  '    <path d="M0,58 C240,96 480,22 720,58 C960,94 1200,20 1440,58 C1680,96 1920,22 2160,58 C2400,94 2640,20 2880,58 L2880,120 L0,120 Z"/>',
  '  </svg>',
  '</div>',
].join('\n');

function carouselHtml() {
  const c = SITE.carousel;
  if (!hasCarousel()) return '';

  const slides = c.slides
    .map(function (s, i) {
      return '<div class="hb-slide' + (i === 0 ? ' is-active' : '') +
        '" style="background-image:url(' + esc(s.image) + ')"></div>';
    })
    .join('\n    ');

  const pill = SITE.tagline || SITE.description || '';

  return [
    '<section class="hero-banner" id="heroBanner" data-autoplay="' + (Number(c.autoplay) || 5200) + '">',
    '  <div class="hb-slides">',
    '    ' + slides,
    '  </div>',
    '  <div class="hb-scrim"></div>',
    '  <div class="hb-inner">',
    '    <h1 class="hb-title">' + esc(SITE.title) + '</h1>',
    pill ? '    <p class="hb-pill">' + esc(pill) + '</p>' : '',
    '  </div>',
    WAVE_LAYERS,
    '</section>',
  ]
    .filter(Boolean)
    .join('\n');
}

function loadMusic() {
  const raw = loadJson('music.json', null);
  if (!raw || !Array.isArray(raw.tracks) || !raw.tracks.length) return null;

  const tracks = raw.tracks.filter(function (t) {
    return t && t.src;
  });
  if (!tracks.length) return null;

  return { title: raw.title || '听点什么', tracks: tracks };
}

function musicPlayerHtml() {
  const m = SITE.music;
  if (!m || !m.enabled) return '';

  const music = loadMusic();
  if (!music) return '';

  return [
    '<div class="music" id="musicPlayer">',
    '  <audio id="musicAudio" preload="metadata"></audio>',
    '  <div class="mp-card">',
    '    <div class="mp-top">',
    '      <span class="music-disc" aria-hidden="true">♪</span>',
    '      <div class="mp-info">',
    '        <span class="mp-title" id="mpTitle">' + esc(music.tracks[0].title) + '</span>',
    '        <span class="mp-sub" id="mpSub">' + esc(music.tracks[0].artist || '') + '</span>',
    '      </div>',
    '      <div class="mp-controls">',
    '        <button class="mp-btn" type="button" data-act="prev" aria-label="上一首">‹‹</button>',
    '        <button class="mp-btn mp-play" type="button" id="mpPlay" data-act="play" aria-label="播放">▶</button>',
    '        <button class="mp-btn" type="button" data-act="next" aria-label="下一首">››</button>',
    '      </div>',
    '    </div>',
    '    <div class="mp-progress" id="mpProgress" role="slider" tabindex="0" aria-label="播放进度">',
    '      <i></i>',
    '    </div>',
    '  </div>',
    '  <script type="application/json" id="musicData">' +
      JSON.stringify({ title: music.title, tracks: music.tracks }).replace(/</g, '\\u003c') +
      '</script>',
    '</div>',
  ].join('\n');
}

function lightboxHtml() {
  return [
    '<div class="lightbox" id="lightbox" hidden role="dialog" aria-modal="true" aria-label="图片查看">',
    '  <button class="lb-btn lb-close" type="button" aria-label="关闭">×</button>',
    '  <button class="lb-btn lb-prev" type="button" aria-label="上一张">‹</button>',
    '  <button class="lb-btn lb-next" type="button" aria-label="下一张">›</button>',
    '  <figure class="lb-stage">',
    '    <img class="lb-img" alt="">',
    '    <figcaption class="lb-caption"></figcaption>',
    '  </figure>',
    '</div>',
  ].join('\n');
}

function layout(opts) {
  opts = opts || {};
  const pageTitle = opts.title
    ? opts.title + ' · ' + SITE.title
    : SITE.title + (SITE.tagline ? ' · ' + SITE.tagline : '');

  const canonical = SITE.url + (opts.path || '/');
  const desc = opts.description || SITE.description;
  const head = [];

  head.push('<meta charset="utf-8">');
  head.push('<meta name="viewport" content="width=device-width, initial-scale=1">');
  head.push('<meta name="color-scheme" content="light dark">');
  head.push('<title>' + esc(pageTitle) + '</title>');
  head.push('<meta name="description" content="' + esc(desc) + '">');
  head.push('<meta name="author" content="' + esc(SITE.author) + '">');
  head.push('<link rel="canonical" href="' + esc(canonical) + '">');
  head.push('<meta property="og:type" content="' + (opts.ogType || 'website') + '">');
  head.push('<meta property="og:site_name" content="' + esc(SITE.title) + '">');
  head.push('<meta property="og:title" content="' + esc(opts.title || SITE.title) + '">');
  head.push('<meta property="og:description" content="' + esc(desc) + '">');
  head.push('<meta property="og:url" content="' + esc(canonical) + '">');
  head.push('<meta property="og:locale" content="' + esc(SITE.lang.replace('-', '_')) + '">');
  head.push('<meta name="twitter:card" content="summary">');
  head.push('<meta name="twitter:title" content="' + esc(opts.title || SITE.title) + '">');
  head.push('<meta name="twitter:description" content="' + esc(desc) + '">');

  if (opts.published) {
    head.push('<meta property="article:published_time" content="' + esc(opts.published) + '">');
  }
  if (opts.modified) {
    head.push('<meta property="article:modified_time" content="' + esc(opts.modified) + '">');
  }
  if (opts.tags && opts.tags.length) {
    opts.tags.forEach(function (t) {
      head.push('<meta property="article:tag" content="' + esc(t) + '">');
    });
  }

  head.push('<link rel="alternate" type="application/rss+xml" title="' + esc(SITE.title) + '" href="/feed.xml">');
  head.push('<link rel="alternate" type="application/feed+json" title="' + esc(SITE.title) + ' (JSON Feed)" href="/feed.json">');
  head.push('<link rel="stylesheet" href="/assets/style.css">');
  head.push('<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Ctext y=%27.9em%27 font-size=%2790%27%3E%E2%9C%A6%3C/text%3E%3C/svg%3E">');
  head.push(
    '<script>(function(){try{var t=localStorage.getItem("theme");if(t){document.documentElement.dataset.theme=t;}}catch(e){}})();</script>'
  );
  if (opts.jsonld) {
    head.push('<script type="application/ld+json">' + JSON.stringify(opts.jsonld) + '</script>');
  }
  head.push(analyticsHtml());

  const bodyClass = ['page', opts.bodyClass || '', hasBg() ? 'has-bg' : '', opts.carousel ? 'has-carousel has-hero' : '']
    .filter(Boolean)
    .join(' ');

  return [
    '<!DOCTYPE html>',
    '<html lang="' + esc(SITE.lang) + '" data-theme="light">',
    '<head>',
    head.filter(Boolean).join('\n'),
    '</head>',
    '<body class="' + bodyClass + '" id="top" data-page="' + (opts.active || '') + '">',
    hasBg()
      ? '<div class="bg" aria-hidden="true" style="background-image:url(' + esc(SITE.background.image) +
        ');background-position:' + esc(SITE.background.position || 'center 15%') + '"></div>'
      : '',
    '<a class="skip" href="#main">跳到正文</a>',
    '<header class="site-header">',
    '  <div class="header-inner">',
    '    <a class="brand" href="/">',
    '      <span class="brand-logo" aria-hidden="true">' + ni('home', 'brand-svg') + '</span>',
    '      <span class="brand-text">' + esc(SITE.title) +
      (SITE.tagline ? '<span class="brand-tag">' + esc(SITE.tagline) + '</span>' : '') + '</span>',
    '    </a>',
    '    <nav class="nav" aria-label="主导航">',
    '        ' + navHtml(opts.active),
    '    </nav>',
    '    <form class="nav-search" action="/search.html" method="get" role="search">',
    '      ' + ni('search', 'search-ico'),
    '      <input type="search" name="q" placeholder="搜索" aria-label="搜索文章" autocomplete="off">',
    '    </form>',
    '    <div class="nav-actions">',
    '      <button class="icon-btn" id="musicBtn" type="button" title="播放/暂停音乐（M）" aria-label="播放音乐">' + ni('music') + '</button>',
    '      <button class="icon-btn" id="themeToggle" type="button" title="切换明暗主题" aria-label="切换明暗主题">' + ni('moon') + '</button>',
    '      <button class="icon-btn menu-btn" id="menuBtn" type="button" title="菜单" aria-label="展开菜单" aria-expanded="false">' + ni('menu') + '</button>',
    '    </div>',
    '  </div>',
    '  <div class="mobile-menu" id="mobileMenu" hidden>',
    '    <form class="mobile-search" action="/search.html" method="get" role="search">',
    '      ' + ni('search', 'search-ico'),
    '      <input type="search" name="q" placeholder="搜索文章…" aria-label="搜索文章" autocomplete="off">',
    '    </form>',
    navHtml(opts.active, '-m').replace(/class="nav-link/g, 'class="mobile-link nav-link').replace(/<div class="dropdown"/g, '<div class="dropdown mobile-dropdown"'),
    '  </div>',
    '</header>',
    opts.carousel ? carouselHtml() : '',
    '<main class="container' + (opts.wide ? ' wide' : '') + '" id="main">',
    opts.progress ? '  <div class="progress" id="progress" aria-hidden="true"></div>' : '',
    opts.content,
    opts.progress ? '  <div class="read-meter" id="readMeter" aria-hidden="true">0%</div>' : '',
    opts.progress ? '  <button class="font-btn" id="fontBtn" type="button" title="调整正文字号（快捷键 F）">A</button>' : '',
    opts.progress ? '  <button class="to-top" id="toTop" type="button" title="回到顶部" hidden>↑</button>' : '',
    '</main>',
    '<footer class="site-footer">',
    '  <div class="footer-inner">',
    SITE.social.length
      ? '    <p class="social">' +
        SITE.social
          .map(function (s) {
            const ext = /^https?:\/\//.test(s.url) ? ' target="_blank" rel="noopener"' : '';
            return '<a href="' + esc(s.url) + '"' + ext + '>' + esc(s.label) + '</a>';
          })
          .join('') +
        '</p>'
      : '',
    '    <p class="footer-nav">',
    '      <a href="/">首页</a><a href="/archive.html">文章</a><a href="/notes.html">说说</a>',
    '      <a href="/photos.html">照片</a><a href="/tags.html">标签</a><a href="/links.html">友链</a>',
    '      <a href="/about.html">关于</a><a href="/search.html">搜索</a><a href="#top">回到顶部</a>',
    '    </p>',
    '    <p>© ' + SITE.startYear + '–' + new Date().getFullYear() + ' ' + esc(SITE.author) + '</p>',
    SITE.footerNote ? '    <p class="muted">' + esc(SITE.footerNote) + '</p>' : '',
    '    <p class="muted built">本站共 ' + POST_COUNT + ' 篇文章 · 由 build.js 生成 · 无数据库、无追踪</p>',
    '  </div>',
    '</footer>',
    musicPlayerHtml(),
    lightboxHtml(),
    '<script src="/assets/main.js"></script>',
    '</body>',
    '</html>',
  ].join('\n');
}

/* ============================ 各页面 ============================ */

function pageUrl(n) {
  return n <= 1 ? '/' : '/page/' + n + '/';
}

function postCard(p) {
  const tags = p.tags.length
    ? '      <ul class="tags">' +
      p.tags
        .map(function (t) {
          return '<li><a href="/tags.html#' + tagId(t) + '">' + esc(t) + '</a></li>';
        })
        .join('') +
      '</ul>'
    : '';

  return [
    '    <article class="post-item">',
    '      <h2><a href="/posts/' + p.slug + '.html">' + esc(p.title) + '</a></h2>',
    '      <p class="meta">' + (p.pinned ? '<span class="pin">置顶</span>' : '') +
      '<time datetime="' + esc(p.date) + '">' + fmtDate(p.date) +
      '</time><span class="dot">·</span>约 ' + p.minutes + ' 分钟</p>',
    '      <p class="summary">' + esc(p.summary) + '</p>',
    tags,
    '    </article>',
  ].join('\n');
}

function buildIndex(posts, page, totalPages) {
  const ordered = posts.slice().sort(function (a, b) {
    if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
    return 0;
  });

  const start = (page - 1) * SITE.perPage;
  const slice = ordered.slice(start, start + SITE.perPage);

  const useCarousel = page === 1 && hasCarousel();

  const hero = page !== 1
    ? '<h1 class="page-title">第 ' + page + ' 页</h1>'
    : useCarousel
      ? '<div class="home-bar">' +
        '<span>' + posts.length + ' 篇文章</span>' +
        '<span>Since ' + SITE.startYear + '</span>' +
        '<a href="/feed.xml">RSS 订阅</a>' +
        '</div>'
      : [
          '<section class="hero">',
          '  <h1>' + esc(SITE.title) + '</h1>',
          SITE.tagline ? '  <p class="tagline">' + esc(SITE.tagline) + '</p>' : '',
          SITE.description ? '  <p class="lead">' + esc(SITE.description) + '</p>' : '',
          '  <p class="hero-meta">',
          '    <span>Since ' + SITE.startYear + '</span>',
          '    <span>' + posts.length + ' 篇文章</span>',
          '    <a href="/feed.xml">RSS 订阅</a>',
          '  </p>',
          '</section>',
          '<hr class="hero-rule">',
        ].filter(Boolean).join('\n');

  let pager = '';
  if (totalPages > 1) {
    const parts = [];
    if (page > 1) {
      parts.push('<a class="page-link" href="' + pageUrl(page - 1) + '" rel="prev">← 前一页</a>');
    } else {
      parts.push('<span class="page-link disabled">← 前一页</span>');
    }
    parts.push('<span class="page-info">' + page + ' / ' + totalPages + '</span>');
    if (page < totalPages) {
      parts.push('<a class="page-link" href="' + pageUrl(page + 1) + '" rel="next">后一页 →</a>');
    } else {
      parts.push('<span class="page-link disabled">后一页 →</span>');
    }
    pager = '<nav class="pagination" aria-label="分页">\n    ' + parts.join('\n    ') + '\n  </nav>';
  }

  const list = slice.length
    ? slice.map(postCard).join('\n')
    : '<p class="empty">还没有文章。在 <code>content/posts/</code> 里新建一个 <code>.md</code> 文件，' +
      '运行 <code>node build.js</code> 就有了。</p>';

  let bodyHtml = [
    '  <div class="post-list">',
    list,
    '  </div>',
    pager,
  ].filter(Boolean).join('\n');

  if (page === 1) {
    const side = buildSidebar(siteStats(ordered), ordered);

    bodyHtml = [
      '<div class="home-layout">',
      side.left ? '  <aside class="rail rail-left">\n' + side.left + '\n  </aside>' : '',
      '  <div class="home-main">\n' + bodyHtml + '\n  </div>',
      side.right ? '  <aside class="rail rail-right">\n' + side.right + '\n  </aside>' : '',
      '</div>',
    ].filter(Boolean).join('\n');
  }

  const content = [hero, bodyHtml].filter(Boolean).join('\n');

  return layout({
    content: content,
    active: 'home',
    path: pageUrl(page),
    carousel: useCarousel,
    title: page === 1 ? '' : '第 ' + page + ' 页',
    jsonld: page === 1 ? {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.title,
      description: SITE.description,
      url: SITE.url + '/',
      author: { '@type': 'Person', name: SITE.author },
    } : null,
  });
}

function renderToc(toc) {
  const items = toc.filter(function (t) { return t.level === 2 || t.level === 3; });
  if (items.length < 2) return '';
  const lis = items
    .map(function (t) {
      return '<li class="toc-l' + t.level + '"><a href="#' + t.id + '">' + esc(t.text) + '</a></li>';
    })
    .join('\n        ');
  const wide = items.length > 6 ? ' toc-wide' : '';
  return [
    '<aside class="toc-rail">',
    '  <details class="toc' + wide + '" open>',
    '    <summary>本文目录</summary>',
    '    <ul>',
    '      ' + lis,
    '    </ul>',
    '  </details>',
    '</aside>',
  ].join('\n');
}

function relatedPosts(post, posts) {
  const scored = posts
    .filter(function (p) { return p.slug !== post.slug; })
    .map(function (p) {
      const shared = p.tags.filter(function (t) { return post.tags.indexOf(t) !== -1; }).length;
      return { post: p, score: shared };
    })
    .filter(function (x) { return x.score > 0; })
    .sort(function (a, b) { return b.score - a.score; })
    .slice(0, 3)
    .map(function (x) { return x.post; });

  if (scored.length) return scored;
  return posts.filter(function (p) { return p.slug !== post.slug; }).slice(0, 3);
}

function commentBlock() {
  const c = SITE.comments;
  if (!c || !c.enabled || c.provider !== 'giscus') return '';
  const g = c.giscus || {};
  if (!g.repo || !g.repoId) return '';

  return [
    '<section class="comments">',
    '  <h2>评论</h2>',
    '  <div class="giscus"></div>',
    '  <script src="https://giscus.app/client.js"',
    '    data-repo="' + esc(g.repo) + '"',
    '    data-repo-id="' + esc(g.repoId) + '"',
    '    data-category="' + esc(g.category || '') + '"',
    '    data-category-id="' + esc(g.categoryId || '') + '"',
    '    data-mapping="' + esc(g.mapping || 'pathname') + '"',
    '    data-strict="0" data-reactions-enabled="1" data-emit-metadata="0"',
    '    data-input-position="bottom" data-theme="preferred_color_scheme"',
    '    data-lang="zh-CN" data-loading="lazy" crossorigin="anonymous" async>',
    '  </script>',
    '</section>',
  ].join('\n');
}

function buildPost(post, all) {
  const idx = all.findIndex(function (p) { return p.slug === post.slug; });
  const newer = idx > 0 ? all[idx - 1] : null;
  const older = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;

  const meta = [
    '<time datetime="' + esc(post.date) + '">' + fmtDate(post.date) + '</time>',
    '<span class="dot">·</span>约 ' + post.minutes + ' 分钟',
    post.updated && post.updated !== post.date
      ? '<span class="dot">·</span>更新于 ' + fmtDate(post.updated)
      : '',
  ].filter(Boolean).join(' ');

  const tags = post.tags.length
    ? '<ul class="tags">' +
      post.tags
        .map(function (t) {
          return '<li><a href="/tags.html#' + tagId(t) + '">' + esc(t) + '</a></li>';
        })
        .join('') +
      '</ul>'
    : '';

  const tocHtml = renderToc(post.toc);

  const related = relatedPosts(post, all).map(function (p) {
    return '<li><a href="/posts/' + p.slug + '.html">' + esc(p.title) + '</a>' +
      '<time datetime="' + esc(p.date) + '">' + fmtDate(p.date) + '</time></li>';
  }).join('\n        ');

  const pager = [];
  pager.push('<nav class="pager" aria-label="文章导航">');
  if (older) {
    pager.push('<a class="pager-link prev" href="/posts/' + older.slug + '.html">' +
      '<span>← 更早</span>' + esc(older.title) + '</a>');
  } else {
    pager.push('<span class="pager-link placeholder"></span>');
  }
  if (newer) {
    pager.push('<a class="pager-link next" href="/posts/' + newer.slug + '.html">' +
      '<span>更新 →</span>' + esc(newer.title) + '</a>');
  } else {
    pager.push('<span class="pager-link placeholder"></span>');
  }
  pager.push('</nav>');

  const content = [
    '<header class="post-hero' + (hasCarousel() ? ' has-photo' : '') + '">',
    hasCarousel() && firstSlideImage()
      ? '  <div class="post-hero-photo" style="background-image:url(' + esc(firstSlideImage()) + ')"></div>'
      : '',
    '  <div class="post-hero-inner">',
    '    <h1>' + esc(post.title) + '</h1>',
    '    <p class="meta">' + meta + '</p>',
    tags ? tags : '',
    '  </div>',
    '</header>',
    '<div class="post-shell">',
    '  <div class="post-layout">',
    '    <article class="post">',
    '      <div class="post-content">',
    post.html,
    '      </div>',
    commentBlock(),
    '    </article>',
    tocHtml,
    '  </div>',
    related
      ? '<section class="related">\n      <h2>相关文章</h2>\n      <ul>\n        ' + related + '\n      </ul>\n    </section>'
      : '',
    pager.join('\n'),
    '<p class="back"><a href="/">← 返回首页</a></p>',
    '</div>',
  ].filter(Boolean).join('\n');

  return layout({
    title: post.title,
    description: post.summary,
    path: '/posts/' + post.slug + '.html',
    content: content,
    wide: true,
    ogType: 'article',
    published: post.date,
    modified: post.updated || post.date,
    tags: post.tags,
    progress: true,
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.summary,
      datePublished: post.date,
      dateModified: post.updated || post.date,
      author: { '@type': 'Person', name: SITE.author },
      publisher: { '@type': 'Person', name: SITE.author },
      mainEntityOfPage: SITE.url + '/posts/' + post.slug + '.html',
      keywords: post.tags.join(', '),
      wordCount: post.text.length,
    },
  });
}

function buildArchive(posts) {
  const byYear = {};
  posts.forEach(function (p) {
    const y = (p.date || '').slice(0, 4) || '未标注日期';
    (byYear[y] = byYear[y] || []).push(p);
  });

  const years = Object.keys(byYear).sort(function (a, b) { return b.localeCompare(a); });

  const html = years.map(function (y) {
    const rows = byYear[y].map(function (p) {
      return '<li><time datetime="' + esc(p.date) + '">' + esc(String(p.date).slice(5)) + '</time>' +
        '<a href="/posts/' + p.slug + '.html">' + esc(p.title) + '</a></li>';
    }).join('\n        ');
    return [
      '<section class="year-group">',
      '  <h2>' + esc(y) + ' <span class="count">' + byYear[y].length + '</span></h2>',
      '  <ul class="archive-list">',
      '        ' + rows,
      '  </ul>',
      '</section>',
    ].join('\n');
  }).join('\n');

  const content = '<h1 class="page-title">归档</h1>\n<p class="page-desc">共 ' + posts.length +
    ' 篇文章，按年份排列。</p>\n' + (posts.length ? html : '<p class="empty">还没有文章。</p>');

  return layout({ title: '归档', content: content, active: 'archive', path: '/archive.html' });
}

function buildTags(posts) {
  const map = {};
  posts.forEach(function (p) {
    p.tags.forEach(function (t) { (map[t] = map[t] || []).push(p); });
  });

  const tags = Object.keys(map).sort(function (a, b) { return map[b].length - map[a].length; });

  const cloud = tags.length
    ? '<p class="tag-cloud">' + tags.map(function (t) {
        return '<a href="#' + tagId(t) + '">' + esc(t) + '<span>' + map[t].length + '</span></a>';
      }).join('') + '</p>'
    : '';

  const body = tags.map(function (t) {
    const rows = map[t].map(function (p) {
      return '<li><a href="/posts/' + p.slug + '.html">' + esc(p.title) + '</a>' +
        '<time datetime="' + esc(p.date) + '">' + fmtDate(p.date) + '</time></li>';
    }).join('\n        ');
    return [
      '<section class="tag-group" id="' + tagId(t) + '">',
      '  <h2>' + esc(tagSlugText(t)) + ' <span class="count">' + map[t].length + '</span></h2>',
      '  <ul class="tag-posts">',
      '        ' + rows,
      '  </ul>',
      '</section>',
    ].join('\n');
  }).join('\n');

  const content = '<h1 class="page-title">标签</h1>\n' +
    '<p class="page-desc">共 ' + tags.length + ' 个标签。</p>\n' +
    cloud + '\n' + (tags.length ? body : '<p class="empty">还没有标签。</p>');

  return layout({ title: '标签', content: content, active: 'tags', path: '/tags.html' });
}

function buildCategories(posts) {
  const map = {};
  posts.forEach(function (p) {
    (map[p.category] = map[p.category] || []).push(p);
  });

  const names = Object.keys(map).sort(function (a, b) { return map[b].length - map[a].length; });

  const body = names.map(function (name) {
    const rows = map[name].map(function (p) {
      return '<li><a href="/posts/' + p.slug + '.html">' + esc(p.title) + '</a>' +
        '<time datetime="' + esc(p.date) + '">' + fmtDate(p.date) + '</time></li>';
    }).join('\n        ');

    return [
      '<section class="tag-group" id="' + encodeURIComponent(name) + '">',
      '  <h2>' + esc(name) + ' <span class="count">' + map[name].length + '</span></h2>',
      '  <ul class="tag-posts">',
      '        ' + rows,
      '  </ul>',
      '</section>',
    ].join('\n');
  }).join('\n');

  const content = '<h1 class="page-title">分类</h1>\n' +
    '<p class="page-desc">共 ' + names.length + ' 个分类，' + posts.length + ' 篇文章。</p>\n' +
    (names.length ? body : '<p class="empty">还没有分类。在文章的 front matter 里写 <code>category: 分类名</code>。</p>');

  return layout({ title: '分类', content: content, active: 'archive', path: '/categories.html' });
}

function buildSearch() {
  const content = [
    '<section class="search-page">',
    '  <h1 class="page-title">搜索</h1>',
    '  <p class="page-desc">输入关键词，匹配标题、标签和正文。共 ' + POST_COUNT + ' 篇文章可检索。</p>',
    '  <input id="searchInput" class="search-input" type="search" placeholder="例如：静态博客" autocomplete="off" autofocus>',
    '  <p class="search-status" id="searchStatus"></p>',
    '  <ul class="search-results" id="searchResults"></ul>',
    '  <noscript><p class="empty">搜索需要启用 JavaScript。也可以直接看<a href="/archive.html">归档</a>。</p></noscript>',
    '</section>',
  ].join('\n');

  return layout({ title: '搜索', content: content, active: 'search', path: '/search.html' });
}

function loadFriends() {
  const raw = loadJson('friends.json', []);
  return (Array.isArray(raw) ? raw : []).filter(function (f) {
    return f && f.name && f.url;
  });
}

function buildLinks(friends) {
  const file = path.join(CONTENT, 'links.md');
  let title = '友链';
  let introHtml = '';

  if (fs.existsSync(file)) {
    const parsed = parseFrontMatter(fs.readFileSync(file, 'utf8'));
    title = parsed.data.title || title;
    introHtml = renderMarkdown(parsed.body).html;
  }

  const cards = friends
    .map(function (f) {
      const initial = String(f.name).trim().charAt(0);
      const avatar = f.avatar
        ? '<img src="' + esc(f.avatar) + '" alt="' + esc(f.name) + '" loading="lazy">'
        : '<span class="friend-initial">' + esc(initial) + '</span>';

      return [
        '<a class="friend friend--' + esc(f.color || 'violet') + '" href="' + esc(f.url) +
          '" target="_blank" rel="noopener">',
        '  <span class="friend-avatar">' + avatar + '</span>',
        '  <span class="friend-body">',
        '    <strong>' + esc(f.name) + '</strong>',
        '    <em>' + esc(f.desc || f.url) + '</em>',
        '  </span>',
        '</a>',
      ].join('\n');
    })
    .join('\n');

  const content = [
    '<article class="page-content">',
    '<h1 class="page-title">' + esc(title) + '</h1>',
    friends.length
      ? '  <div class="friends-wrap">\n' +
        '    <div class="friends" id="friends">\n' + cards + '\n    </div>\n' +
        '    <button class="friends-shuffle" type="button" id="friendsShuffle">换个顺序 →</button>\n' +
        '  </div>'
      : '',
    '<div class="post-content">' + introHtml + '</div>',
    '</article>',
  ]
    .filter(Boolean)
    .join('\n');

  return layout({ title: title, content: content, active: 'links', path: '/links.html' });
}

function buildMarkdownPage(fileName, fallbackTitle, active, pathUrl) {
  const file = path.join(CONTENT, fileName);
  let title = fallbackTitle;
  let html = '<p>这个页面还没写。</p>';

  if (fs.existsSync(file)) {
    const parsed = parseFrontMatter(fs.readFileSync(file, 'utf8'));
    title = parsed.data.title || fallbackTitle;
    html = renderMarkdown(parsed.body).html;
  }

  const content = '<article class="page-content">\n<h1 class="page-title">' + esc(title) +
    '</h1>\n<div class="post-content">' + html + '</div>\n</article>';

  return layout({ title: title, content: content, active: active, path: pathUrl });
}

function build404() {
  const content = [
    '<section class="notfound">',
    '  <p class="code">404</p>',
    '  <p>这一页不存在。可能是链接写错了，也可能是我还没写。</p>',
    '  <p class="actions"><a href="/">回首页</a><a href="/archive.html">看归档</a><a href="/search.html">搜一下</a></p>',
    '</section>',
  ].join('\n');

  return layout({ title: '页面不存在', description: '404 Not Found', content: content, path: '/404.html' });
}

/* ============================ 订阅与索引 ============================ */

function buildFeed(posts) {
  const items = posts.map(function (p) {
    const url = SITE.url + '/posts/' + p.slug + '.html';
    const date = new Date((p.date || '1970-01-01') + 'T09:00:00+08:00').toUTCString();
    const cats = p.tags.map(function (t) { return '      <category>' + esc(t) + '</category>'; }).join('\n');
    return [
      '    <item>',
      '      <title>' + esc(p.title) + '</title>',
      '      <link>' + esc(url) + '</link>',
      '      <guid isPermaLink="true">' + esc(url) + '</guid>',
      '      <pubDate>' + date + '</pubDate>',
      '      <description>' + esc(p.summary) + '</description>',
      '      <content:encoded><![CDATA[' + p.html + ']]></content:encoded>',
      cats,
      '    </item>',
    ].filter(Boolean).join('\n');
  }).join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">',
    '  <channel>',
    '    <title>' + esc(SITE.title) + '</title>',
    '    <link>' + esc(SITE.url + '/') + '</link>',
    '    <description>' + esc(SITE.description) + '</description>',
    '    <language>' + esc(SITE.lang) + '</language>',
    '    <lastBuildDate>' + new Date().toUTCString() + '</lastBuildDate>',
    '    <atom:link href="' + esc(SITE.url + '/feed.xml') + '" rel="self" type="application/rss+xml"/>',
    items,
    '  </channel>',
    '</rss>',
  ].join('\n');
}

function buildSitemap(posts) {
  const pages = ['/', '/archive.html', '/tags.html', '/categories.html', '/notes.html', '/photos.html', '/search.html', '/links.html', '/about.html'];
  const latest = posts.length ? posts[0].date : '';

  const rows = pages.map(function (u) {
    return '  <url>\n    <loc>' + esc(SITE.url + u) + '</loc>' +
      '\n    <changefreq>weekly</changefreq>' +
      (latest ? '\n    <lastmod>' + latest + '</lastmod>' : '') +
      '\n  </url>';
  }).concat(
    posts.map(function (p) {
      return '  <url>\n    <loc>' + esc(SITE.url + '/posts/' + p.slug + '.html') + '</loc>' +
        '\n    <changefreq>monthly</changefreq>' +
        '\n    <lastmod>' + esc(p.updated || p.date) + '</lastmod>\n  </url>';
    })
  );

  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    rows.join('\n') + '\n</urlset>';
}

function buildJsonFeed(posts) {
  const items = posts.map(function (p) {
    const url = SITE.url + '/posts/' + p.slug + '.html';
    return {
      id: url,
      url: url,
      title: p.title,
      summary: p.summary,
      content_html: p.html,
      date_published: (p.date || '') + 'T09:00:00+08:00',
      date_modified: (p.updated || p.date || '') + 'T09:00:00+08:00',
      tags: p.tags,
    };
  });

  return JSON.stringify(
    {
      version: 'https://jsonfeed.org/version/1.1',
      title: SITE.title,
      home_page_url: SITE.url + '/',
      feed_url: SITE.url + '/feed.json',
      description: SITE.description,
      language: SITE.lang,
      authors: [{ name: SITE.author }],
      items: items,
    },
    null,
    2
  );
}

function buildSearchIndex(posts) {
  return JSON.stringify(posts.map(function (p) {
    return {
      url: '/posts/' + p.slug + '.html',
      title: p.title,
      date: p.date,
      tags: p.tags,
      text: p.text,
    };
  }));
}

/* ============================ 说说 / 照片 ============================ */

function buildNotes(notes) {
  const cards = notes.map(function (n, i) {
    const images = n.images.length
      ? '<div class="note-images">' +
        n.images
          .map(function (src) {
            return (
              '<button class="thumb" type="button" data-src="' + esc(src) +
              '" data-caption="' + esc(fmtDate(n.date)) + '" aria-label="查看图片">' +
              '<img src="' + esc(src) + '" alt="" loading="lazy"></button>'
            );
          })
          .join('') +
        '</div>'
      : '';

    const paragraphs = n.text
      .split(/\n{2,}/)
      .map(function (p) { return '<p>' + esc(p).replace(/\n/g, '<br>') + '</p>'; })
      .join('');

    return [
      '<article class="note note--' + esc(n.color) + '" style="--i:' + (i % 6) + '">',
      '  <time class="note-date" datetime="' + esc(n.date) + '">' + fmtDate(n.date) + '</time>',
      '  <div class="note-body">' + paragraphs + '</div>',
      images ? '  ' + images : '',
      '</article>',
    ]
      .filter(Boolean)
      .join('\n');
  }).join('\n');

  const content = [
    '<section class="notes-page">',
    '  <header class="page-head">',
    '    <h1 class="page-title">说说</h1>',
    '    <p class="page-desc">零碎的记录，比文章短，比朋友圈长。共 ' + notes.length + ' 条。</p>',
    '  </header>',
    notes.length
      ? '  <div class="note-grid">\n' + cards + '\n  </div>'
      : '  <p class="empty">还没有说说。在 <code>content/notes.json</code> 里加一条，或打开管理后台。</p>',
    '</section>',
  ].join('\n');

  return layout({ title: '说说', content: content, active: 'notes', path: '/notes.html', description: '零碎的日常记录' });
}

function buildPhotos(albums) {
  const tabs = albums.length
    ? [
        '<div class="album-tabs" role="tablist">',
        '  <button class="chip is-active" type="button" data-filter="all">全部</button>',
        albums
          .map(function (a) {
            return '  <button class="chip" type="button" data-filter="' + esc(a.slug) + '">' + esc(a.title) + '</button>';
          })
          .join('\n'),
        '</div>',
      ].join('\n')
    : '';

  const sections = albums.map(function (a) {
    const fanCards = a.photos
      .slice(0, 7)
      .map(function (p, i) {
        return (
          '<button class="fan-card" type="button" style="--i:' + i + '"' +
          ' data-src="' + esc(p.src) + '" data-caption="' + esc(p.caption || '') + '"' +
          ' aria-label="查看照片：' + esc(p.caption || a.title) + '">' +
          '<img src="' + esc(p.src) + '" alt="' + esc(p.caption || a.title) + '" loading="lazy">' +
          '</button>'
        );
      })
      .join('\n      ');

    const more = a.photos.length > 7 ? '<span class="fan-more">+' + (a.photos.length - 7) + '</span>' : '';

    return [
      '<article class="album" data-slug="' + esc(a.slug) + '">',
      '  <header class="album-head">',
      '    <h2>' + esc(a.title) + '</h2>',
      a.date ? '    <time datetime="' + esc(a.date) + '">' + fmtDate(a.date) + '</time>' : '',
      '  </header>',
      a.description ? '  <p class="album-desc">' + esc(a.description) + '</p>' : '',
      '  <div class="fan" role="group" aria-label="' + esc(a.title) + ' 的照片">',
      '      ' + fanCards,
      more ? '    ' + more : '',
      '  </div>',
      '  <p class="album-count">' + a.photos.length + ' 张照片 · 悬停展开，点击查看大图</p>',
      '</article>',
    ]
      .filter(Boolean)
      .join('\n');
  }).join('\n');

  const content = [
    '<section class="photos-page">',
    '  <header class="page-head">',
    '    <h1 class="page-title">照片</h1>',
    '    <p class="page-desc">' + albums.length + ' 个相册，共 ' +
      albums.reduce(function (sum, a) { return sum + a.photos.length; }, 0) + ' 张。</p>',
    '  </header>',
    tabs,
    albums.length ? '  <div class="albums">\n' + sections + '\n  </div>' : '  <p class="empty">还没有照片。在 <code>content/albums.json</code> 里添加相册。</p>',
    '</section>',
  ].join('\n');

  return layout({ title: '照片', content: content, active: 'photos', path: '/photos.html', description: '相册与照片' });
}

/* 播放器图标 */
const MUSIC_ICON = {
  volume: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M17 9.5a4 4 0 0 1 0 5"/></svg>',
  mute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="m17 9 4 6M21 9l-4 6"/></svg>',
  repeat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l3 3-3 3"/><path d="M20 6H8a4 4 0 0 0-4 4v1"/><path d="M7 21l-3-3 3-3"/><path d="M4 18h12a4 4 0 0 0 4-4v-1"/></svg>',
  prev: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 6h2v12H7zM19 6v12l-9-6z"/></svg>',
  next: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15 6h2v12h-2zM5 6l9 6-9 6z"/></svg>',
  play: '<svg class="i-play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg>',
  pause: '<svg class="i-pause" viewBox="0 0 24 24" fill="currentColor"><rect x="7" y="5.5" width="3.6" height="13" rx="1"/><rect x="13.4" y="5.5" width="3.6" height="13" rx="1"/></svg>',
  list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 7h11M4 12h11M4 17h7"/><path d="M19 9v7"/><circle cx="17.4" cy="17.6" r="1.8"/></svg>',
};

/* ============================ 首页侧栏挂件 ============================ */

const ICON = {
  post: '<path d="M5 4h11l3 3v13H5z"/><path d="M8 9h8M8 13h8M8 17h5"/>',
  cat: '<path d="M4 6a2 2 0 0 1 2-2h4l2 3h6a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/>',
  tag: '<path d="M4 11V5a1 1 0 0 1 1-1h6l9 9-7 7z"/><circle cx="8.5" cy="8.5" r="1.3"/>',
  words: '<path d="M6 4h12v16H6z"/><path d="M9 8h6M9 12h6M9 16h4"/>',
  days: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/>',
  views: '<path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z"/><circle cx="12" cy="12" r="2.6"/>',
  global: '<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c2.5 2.4 2.5 13.6 0 16M12 4c-2.5 2.4-2.5 13.6 0 16"/>',
  pulse: '<path d="M3 12h4l2.5-6 4 12 2.5-6H21"/>',
};

function icon(name) {
  return (
    '<svg class="w-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"' +
    ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    ICON[name] + '</svg>'
  );
}

const PF_ICON = {
  github: '<path d="M12 2.6a9.4 9.4 0 0 0-3 18.3c.5.1.6-.2.6-.5v-1.7c-2.5.6-3.1-1.2-3.1-1.2-.4-1-1-1.3-1-1.3-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .8 1.4 2.2 1 2.7.8.1-.6.3-1 .6-1.3-2-.2-4.1-1-4.1-4.5 0-1 .3-1.8.9-2.4-.1-.2-.4-1.1.1-2.3 0 0 .7-.2 2.4.9a8.3 8.3 0 0 1 4.4 0c1.7-1.1 2.4-.9 2.4-.9.5 1.2.2 2.1.1 2.3.6.6.9 1.4.9 2.4 0 3.5-2.1 4.2-4.1 4.5.3.3.6.9.6 1.7v2.6c0 .3.1.6.6.5A9.4 9.4 0 0 0 12 2.6z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.6 6.4 8.4 6 8.4-6"/>',
  rss: '<path d="M5 19a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z"/><path d="M5 11a8 8 0 0 1 8 8M5 5a14 14 0 0 1 14 14"/>',
  link: '<path d="M10 13.5a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1 1"/><path d="M14 10.5a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1-1"/>',
  user: '<circle cx="12" cy="8" r="3.4"/><path d="M5 20a7 7 0 0 1 14 0"/>',
  music: '<circle cx="7" cy="18" r="2.6"/><circle cx="18" cy="16" r="2.6"/><path d="M9.6 18V7l11-2v11"/>',
};

function profileIconFor(label, url) {
  const s = String(label || '') + ' ' + String(url || '');
  if (/github/i.test(s)) return 'github';
  if (/mail|邮箱|email/i.test(s)) return 'mail';
  if (/rss|feed/i.test(s)) return 'rss';
  if (/music|音乐/i.test(s)) return 'music';
  if (/about|关于/i.test(s)) return 'user';
  return 'link';
}

function widgetProfile() {
  const p = SITE.profile;
  if (!p || p.enabled === false) return '';

  const name = p.name || SITE.author || '';
  const bio = p.bio || '';
  const avatar = p.avatar || '/assets/images/avatar.jpg';
  const links = Array.isArray(p.links) && p.links.length ? p.links : (SITE.social || []);

  const icons = links.map(function (l) {
    const ext = /^https?:\/\//.test(l.url) ? ' target="_blank" rel="noopener"' : '';
    return '<a class="pf-link" href="' + esc(l.url) + '"' + ext + ' aria-label="' + esc(l.label) + '"' +
      ' title="' + esc(l.label) + '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"' +
      ' stroke-linejoin="round" aria-hidden="true">' + (PF_ICON[profileIconFor(l.label, l.url)] || PF_ICON.link) +
      '</svg></a>';
  }).join('\n      ');

  return [
    '<section class="widget widget-profile">',
    '  <div class="pf-avatar"><img src="' + esc(avatar) + '" alt="' + esc(name) + '" loading="lazy"></div>',
    '  <h2 class="pf-name">' + esc(name) + '</h2>',
    '  <span class="pf-bar" aria-hidden="true"></span>',
    bio ? '  <p class="pf-bio">' + esc(bio) + '</p>' : '',
    icons ? '  <div class="pf-links">\n      ' + icons + '\n  </div>' : '',
    '</section>',
  ].filter(Boolean).join('\n');
}

function siteStats(posts) {
  const cats = {};
  const tags = {};
  let chars = 0;

  posts.forEach(function (p) {
    cats[p.category] = (cats[p.category] || 0) + 1;
    p.tags.forEach(function (t) { tags[t] = (tags[t] || 0) + 1; });
    chars += p.chars || 0;
  });

  const dates = posts.map(function (p) { return p.date; }).filter(Boolean).sort();
  const first = dates[0] || '';
  const last = dates[dates.length - 1] || '';
  const now = new Date();
  const day = 86400000;

  const running = first ? Math.max(1, Math.round((now - new Date(first + 'T00:00:00')) / day)) : 0;
  const idle = last ? Math.max(0, Math.round((now - new Date(last + 'T00:00:00')) / day)) : 0;

  return {
    posts: posts.length,
    categories: Object.keys(cats).length,
    tags: Object.keys(tags).length,
    chars: chars,
    running: running,
    idle: idle,
    firstDate: first,
    lastDate: last,
    catList: Object.keys(cats).map(function (c) { return { name: c, count: cats[c] }; }).sort(function (a, b) { return b.count - a.count; }),
    tagList: Object.keys(tags).map(function (t) { return { name: t, count: tags[t] }; }).sort(function (a, b) { return b.count - a.count; }),
  };
}

function widgetNotice() {
  const n = SITE.notice;
  if (!n || !n.enabled) return '';

  return [
    '<section class="widget widget-notice" id="noticeWidget">',
    '  <header class="widget-head"><span class="w-bar"></span><h2>' + esc(n.title || '公告') + '</h2>',
    '    <button class="w-close" type="button" id="noticeClose" aria-label="关闭公告">×</button>',
    '  </header>',
    '  <p class="notice-text">' + esc(n.text || '') + '</p>',
    n.link
      ? '  <a class="notice-link" href="' + esc(n.link) + '">' + esc(n.linkText || '了解更多') + ' →</a>'
      : '',
    '</section>',
  ].filter(Boolean).join('\n');
}

function widgetWeather() {
  const w = SITE.weather;
  if (!w || !w.enabled || !w.city) return '';

  const days = Math.max(1, Math.min(7, Number(w.days) || 3));

  return [
    '<section class="widget widget-weather" id="weatherWidget"',
    '  data-city="' + esc(w.city) + '"',
    w.latitude && w.longitude
      ? '  data-lat="' + esc(String(w.latitude)) + '" data-lon="' + esc(String(w.longitude)) + '"'
      : '',
    '  data-days="' + days + '">',
    '  <header class="widget-head"><span class="w-bar"></span><h2>天气</h2>',
    '    <span class="w-city" id="weatherCity">' + esc(w.city) + '</span>',
    '  </header>',
    '  <div class="weather-body" id="weatherBody">',
    '    <p class="weather-status">正在获取天气…</p>',
    '  </div>',
    '</section>',
  ].filter(Boolean).join('\n');
}

function widgetCalendar(posts) {
  if (!posts.length) return '';

  const data = posts
    .filter(function (p) { return p.date; })
    .map(function (p) {
      return { d: p.date, t: p.title, u: '/posts/' + p.slug + '.html' };
    });

  if (!data.length) return '';

  return [
    '<section class="widget widget-calendar">',
    '  <header class="widget-head"><span class="w-bar"></span><h2>日历</h2></header>',
    '  <div class="cal" id="calendar"></div>',
    '  <script type="application/json" id="calendarData">' +
      JSON.stringify(data).replace(/</g, '\\u003c') +
      '</script>',
    '</section>',
  ].join('\n');
}

function widgetMusic() {
  const m = SITE.music;
  if (!m || !m.enabled) return '';

  const music = loadMusic();
  if (!music) return '';

  const first = music.tracks[0];
  const cover = first.cover || '/assets/images/music/cover.jpg';

  const list = music.tracks
    .map(function (t, i) {
      return '    <li><button class="mw-track" type="button" data-index="' + i + '">' +
        '<span class="mw-track-i">' + (i + 1) + '</span>' +
        '<span class="mw-track-t">' + esc(t.title) + '</span>' +
        '<span class="mw-track-a">' + esc(t.artist || '') + '</span>' +
        '</button></li>';
    })
    .join('\n');

  return [
    '<section class="widget widget-music">',
    '  <header class="widget-head"><span class="w-bar"></span><h2>音乐</h2>',
    '    <span class="w-count" id="mwCount">' + music.tracks.length + ' 首</span>',
    '  </header>',
    '  <div class="mw-main">',
    '    <div class="mw-cover"><img id="mwCover" src="' + esc(cover) + '" alt="" loading="lazy"></div>',
    '    <div class="mw-info">',
    '      <div class="mw-title-row">',
    '        <strong class="mw-title" id="mwTitle">' + esc(first.title) + '</strong>',
    '        <span class="mw-note" aria-hidden="true">♪</span>',
    '      </div>',
    '      <span class="mw-sub" id="mwSub">' + esc(first.artist || '') + '</span>',
    '      <div class="mw-progress-row">',
    '        <span class="mw-time" id="mwTime">0:00 / 0:00</span>',
    '        <button class="mw-vol" id="mwVol" type="button" aria-label="静音">' + MUSIC_ICON.volume + '</button>',
    '        <div class="mw-progress" id="mwProgress" role="slider" tabindex="0" aria-label="播放进度"><i></i></div>',
    '      </div>',
    '    </div>',
    '  </div>',
    '  <div class="mw-footer">',
    '    <button class="mw-ico" id="mwLoop" type="button" data-act="loop" aria-label="单曲循环" title="单曲循环">' + MUSIC_ICON.repeat + '</button>',
    '    <button class="mw-ico" type="button" data-act="prev" aria-label="上一首" title="上一首">' + MUSIC_ICON.prev + '</button>',
    '    <button class="mw-play-big" id="mwPlay" type="button" data-act="play" aria-label="播放">' +
      MUSIC_ICON.play + MUSIC_ICON.pause + '</button>',
    '    <button class="mw-ico" type="button" data-act="next" aria-label="下一首" title="下一首">' + MUSIC_ICON.next + '</button>',
    '    <button class="mw-ico" id="mwListBtn" type="button" data-act="list" aria-expanded="false" aria-label="播放列表" title="播放列表">' + MUSIC_ICON.list + '</button>',
    '  </div>',
    '  <ul class="mw-list" id="mwList" hidden>',
    list,
    '  </ul>',
    '</section>',
  ].join('\n');
}

function widgetCategories(stats) {
  if (!stats.catList.length) return '';
  const rows = stats.catList.slice(0, 6).map(function (c) {
    return '<li><a href="/categories.html#' + encodeURIComponent(c.name) + '"><span>' + esc(c.name) + '</span><b>' + c.count + '</b></a></li>';
  }).join('\n      ');

  return [
    '<section class="widget widget-cats">',
    '  <header class="widget-head"><span class="w-bar"></span><h2>分类</h2></header>',
    '  <ul class="w-list">',
    '      ' + rows,
    '  </ul>',
    stats.catList.length > 6 ? '  <a class="w-more" href="/categories.html">更多 →</a>' : '',
    '</section>',
  ].filter(Boolean).join('\n');
}

function widgetTags(stats) {
  if (!stats.tagList.length) return '';
  const pills = stats.tagList.slice(0, 12).map(function (t) {
    return '<a href="/tags.html#' + encodeURIComponent(t.name) + '">' + esc(t.name) + '<i>' + t.count + '</i></a>';
  }).join('');

  return [
    '<section class="widget widget-tags">',
    '  <header class="widget-head"><span class="w-bar"></span><h2>标签</h2></header>',
    '  <div class="w-pills">' + pills + '</div>',
    stats.tagList.length > 12 ? '  <a class="w-more" href="/tags.html">更多 →</a>' : '',
    '</section>',
  ].filter(Boolean).join('\n');
}

function widgetStats(stats) {
  const rows = [
    ['post', '文章', stats.posts, ''],
    ['cat', '分类', stats.categories, ''],
    ['tag', '标签', stats.tags, ''],
    ['words', '总字数', stats.chars.toLocaleString('en-US'), ''],
    /* 下面两项带 data-since，打开页面时由 JS 按当天时间重算 */
    ['days', '运行时长', stats.running + ' 天',
      stats.firstDate ? ' data-stat="running" data-since="' + stats.firstDate + '"' : ''],
    ['pulse', '近期活动', stats.idle === 0 ? '今天' : stats.idle + ' 天前',
      stats.lastDate ? ' data-stat="idle" data-since="' + stats.lastDate + '"' : ''],
  ];

  return [
    '<section class="widget widget-stats">',
    '  <header class="widget-head"><span class="w-bar"></span><h2>站点数据</h2></header>',
    '  <ul class="stat-list">',
    rows
      .map(function (r) {
        return '    <li>' + icon(r[0]) + '<span>' + r[1] + '</span><b' + r[3] + '>' + r[2] + '</b></li>';
      })
      .join('\n'),
    '  </ul>',
    '</section>',
  ].join('\n');
}

function buildSidebar(postStats, posts) {
  return {
    left: [widgetProfile(), widgetNotice(), widgetCalendar(posts || []), widgetStats(postStats)].filter(Boolean).join('\n'),
    right: [widgetWeather(), widgetMusic(), widgetCategories(postStats), widgetTags(postStats)].filter(Boolean).join('\n'),
  };
}

/* ============================ 输出 ============================ */

function rmrf(dir) {
  if (!fs.existsSync(dir)) return;

  for (var attempt = 0; attempt < 4; attempt++) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
      return;
    } catch (e) {
      if (attempt === 3) {
        // 被占用时退而求其次：改名让路，稍后清理
        var trash = dir + '.trash-' + Date.now();
        try {
          fs.renameSync(dir, trash);
          console.warn('  ! public 目录被占用，已改名为 ' + path.basename(trash));
          setTimeout(function () {
            try { fs.rmSync(trash, { recursive: true, force: true }); } catch (x) {}
          }, 3000).unref();
          return;
        } catch (e2) {
          throw e;
        }
      }
      // 短暂等待后重试
      var until = Date.now() + 200 * (attempt + 1);
      while (Date.now() < until) { /* 同步等待，构建脚本无所谓 */ }
    }
  }
}

function writeFile(rel, content) {
  const dest = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, content, 'utf8');
}

function main() {
  const posts = loadPosts();
  const notes = loadNotes();
  const albums = loadAlbums();
  POST_COUNT = posts.length;

  const totalPages = Math.max(1, Math.ceil(posts.length / SITE.perPage));

  rmrf(OUT);
  fs.mkdirSync(OUT, { recursive: true });

  if (fs.existsSync(ASSETS)) {
    fs.cpSync(ASSETS, path.join(OUT, 'assets'), { recursive: true });
  }

  // 首页与分页
  for (let page = 1; page <= totalPages; page++) {
    const rel = page === 1 ? 'index.html' : 'page/' + page + '/index.html';
    writeFile(rel, buildIndex(posts, page, totalPages));
  }

  // 文章
  posts.forEach(function (p) {
    writeFile('posts/' + p.slug + '.html', buildPost(p, posts));
  });

  // 独立页面
  writeFile('archive.html', buildArchive(posts));
  writeFile('tags.html', buildTags(posts));
  writeFile('categories.html', buildCategories(posts));
  writeFile('notes.html', buildNotes(notes));
  writeFile('photos.html', buildPhotos(albums));
  writeFile('search.html', buildSearch());
  writeFile('about.html', buildMarkdownPage('about.md', '关于', 'about', '/about.html'));
  writeFile('links.html', buildLinks(loadFriends()));
  writeFile('404.html', build404());

  // 订阅与索引
  writeFile('feed.xml', buildFeed(posts));
  writeFile('feed.json', buildJsonFeed(posts));
  writeFile('sitemap.xml', buildSitemap(posts));
  writeFile('search.json', buildSearchIndex(posts));

  // 托管平台配置
  writeFile('robots.txt', 'User-agent: *\nAllow: /\n\nSitemap: ' + SITE.url + '/sitemap.xml\n');
  writeFile('.nojekyll', '');
  writeFile(
    '_headers',
    [
      '/*',
      '  X-Content-Type-Options: nosniff',
      '  Referrer-Policy: strict-origin-when-cross-origin',
      '  X-Frame-Options: SAMEORIGIN',
      '',
      '/assets/*',
      '  Cache-Control: public, max-age=31536000, immutable',
      '',
      '/*.html',
      '  Cache-Control: public, max-age=0, must-revalidate',
      '',
    ].join('\n')
  );

  console.log('');
  console.log('  构建完成');
  console.log('  站点: ' + SITE.title + '  (' + SITE.url + ')');
  console.log('  输出: ' + OUT);
  console.log('  文章: ' + posts.length + ' 篇，分 ' + totalPages + ' 页');
  posts.forEach(function (p) {
    console.log('    · ' + (p.date || '无日期') + '  ' + p.title);
  });
  console.log('');
  console.log('  下一步: node serve.js  然后打开 http://127.0.0.1:8080');
  console.log('  部署前记得把 config.json 里的 url 改成真实域名');
  console.log('');
}

main();
