#!/usr/bin/env node
'use strict';

/**
 * 本地预览服务器（零依赖）
 * 用法: node serve.js [端口]      默认 8080
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'public');
const PORT = Number(process.argv[2]) || 8080;

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

server.listen(PORT, '127.0.0.1', function () {
  console.log('');
  console.log('  预览地址: http://127.0.0.1:' + PORT);
  console.log('  修改文章后重新执行 node build.js，然后刷新页面');
  console.log('  按 Ctrl+C 停止');
  console.log('');
});
