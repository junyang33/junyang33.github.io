#!/usr/bin/env node
'use strict';

/**
 * 保存即上线：监视内容变化 → 自动构建并推送
 * 用法: node tools/watch.js
 * 停止: Ctrl+C
 */

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const WATCH = ['content', 'assets', 'config.json', 'build.js'];
const IGNORE = /(^|[\\/])(\.git|public|\.preview|node_modules|public\.trash)/;
const DELAY = 2500; /* 停止编辑 2.5 秒后才发布 */

let timer = null;
let publishing = false;
let cooldownUntil = 0; /* 发布后短暂忽略事件，避免构建产物触发循环 */

function publish() {
  if (publishing) return;
  publishing = true;
  cooldownUntil = Date.now() + 8000;

  const d = new Date();
  const p = (n) => (n < 10 ? '0' : '') + n;
  const stamp = p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());

  console.log('\n[' + stamp + '] 检测到改动，开始发布…');

  const res = spawnSync('node', ['tools/publish.js', 'auto: ' + stamp], {
    cwd: ROOT,
    stdio: 'inherit',
  });

  publishing = false;

  if (res.status === 0) {
    console.log('    完成。继续监视中…');
  } else {
    console.log('    发布失败，继续监视（改一下文件会重试）。');
  }
}

function schedule(label) {
  if (IGNORE.test(label)) return;
  if (publishing || Date.now() < cooldownUntil) return;
  clearTimeout(timer);
  timer = setTimeout(publish, DELAY);
}

function watchPath(rel) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) return;

  try {
    fs.watch(abs, { recursive: true }, (event, filename) => {
      const name = filename ? String(filename) : '';
      const full = path.join(rel, name);
      if (IGNORE.test(full)) return;
      console.log('  改动: ' + full);
      schedule(full);
    });
    console.log('  监视: ' + rel);
  } catch (e) {
    console.log('  无法监视 ' + rel + '：' + e.message);
  }
}

console.log('');
console.log('  ┌─────────────────────────────────────────┐');
console.log('  │  保存即上线 · 正在监视文件改动           │');
console.log('  │  Ctrl+C 停止                             │');
console.log('  └─────────────────────────────────────────┘');
console.log('');
console.log('  会监视: ' + WATCH.join(', '));
console.log('  停止编辑 2.5 秒后自动构建并推送。');
console.log('');

WATCH.forEach(watchPath);

process.on('SIGINT', function () {
  console.log('\n  已停止监视。');
  process.exit(0);
});
