#!/usr/bin/env node
'use strict';

/**
 * 本地预览服务器（零依赖）
 *
 * 用法:
 *   node serve.js            端口 8080，被占用时自动往后找
 *   node serve.js 9000       指定端口
 *   node serve.js --open     启动后自动打开浏览器
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.join(__dirname, 'public');

const args = process.argv.slice(2);
const openFlag = args.indexOf('--open') !== -1;
const portArg = args.find(function (a) { return /^\d+$/.test(a); });

let port = Number(portArg) || 8080;
const MAX_ATTEMPTS = 20;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function send(res, status, body, type) {
  res.writeHead(status, {
    'Content-Type': type || 'text/html; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

function openBrowser(url) {
  try {
    if (process.platform === 'win32') {
      spawn('cmd', ['/c', 'start', '', url], { detached: true, stdio: 'ignore' }).unref();
    } else if (process.platform === 'darwin') {
      spawn('open', [url], { detached: true, stdio: 'ignore' }).unref();
    } else {
      spawn('xdg-open', [url], { detached: true, stdio: 'ignore' }).unref();
    }
  } catch (e) {
    /* 打不开就算了，用户自己复制地址 */
  }
}

if (!fs.existsSync(ROOT)) {
  console.log('还没有 public 目录，请先运行: node build.js');
  process.exit(1);
}

const server = http.createServer(function (req, res) {
  let urlPath;

  try {
    urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch (e) {
    return send(res, 400, 'Bad Request');
  }

  if (urlPath.endsWith('/')) urlPath += 'index.html';

  let filePath = path.join(ROOT, urlPath);

  if (!filePath.startsWith(ROOT)) return send(res, 403, 'Forbidden');

  if (!fs.existsSync(filePath) && !path.extname(filePath)) {
    if (fs.existsSync(filePath + '.html')) filePath += '.html';
    else if (fs.existsSync(path.join(filePath, 'index.html'))) filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    const notFound = path.join(ROOT, '404.html');
    if (fs.existsSync(notFound)) {
      return send(res, 404, fs.readFileSync(notFound), 'text/html; charset=utf-8');
    }
    return send(res, 404, 'Not Found');
  }

  const ext = path.extname(filePath).toLowerCase();
  send(res, 200, fs.readFileSync(filePath), MIME[ext] || 'application/octet-stream');
});

let attempts = 0;

server.on('listening', function () {
  const url = 'http://127.0.0.1:' + port;
  console.log('');
  console.log('  预览地址: ' + url);
  console.log('  修改文章后重新执行 node build.js，然后刷新页面');
  console.log('  停止服务: Ctrl+C');
  console.log('');
  if (openFlag) openBrowser(url);
});

server.on('error', function (err) {
  if (err.code === 'EADDRINUSE' && attempts < MAX_ATTEMPTS) {
    attempts += 1;
    port += 1;
    console.log('  端口被占用，尝试 ' + port + ' ...');
    setTimeout(function () {
      server.listen(port, '127.0.0.1');
    }, 60);
    return;
  }

  console.error('启动失败: ' + err.message);
  process.exit(1);
});

server.listen(port, '127.0.0.1');
