#!/usr/bin/env node
'use strict';

/**
 * 一键发布：构建 → 提交 → 推送
 * 用法: node tools/publish.js [提交说明]
 */

const { spawnSync } = require('child_process');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://junyang33.github.io/';
const ACTIONS_URL = 'https://github.com/junyang33/junyang33.github.io/actions';

function sh(cmd, args, opts) {
  return spawnSync(cmd, args, Object.assign({ cwd: ROOT, stdio: 'inherit' }, opts || {}));
}

function git(args) {
  return spawnSync('git', args, { cwd: ROOT, stdio: 'inherit' });
}

function gitQuiet(args) {
  return spawnSync('git', args, { cwd: ROOT, stdio: 'ignore' });
}

function stamp() {
  const d = new Date();
  const p = (n) => (n < 10 ? '0' : '') + n;
  return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' +
    p(d.getHours()) + ':' + p(d.getMinutes());
}

console.log('');
console.log('  ┌─────────────────────────────────────────┐');
console.log('  │  发布到 GitHub Pages                     │');
console.log('  └─────────────────────────────────────────┘');
console.log('');

/* 1. 构建 */
console.log('[1/3] 构建站点…');
const build = sh('node', ['build.js']);
if (build.status !== 0) {
  console.error('\n  构建失败，已停止。');
  process.exit(1);
}

/* 2. 提交 */
console.log('[2/3] 提交改动…');
git(['add', '-A']);

const diff = gitQuiet(['diff', '--cached', '--quiet']);
if (diff.status === 0) {
  console.log('  没有文件改动，跳过提交和推送。');
  console.log('');
  process.exit(0);
}

const message = process.argv.slice(2).join(' ').trim() || ('update: ' + stamp());
const commit = git(['commit', '-m', message]);
if (commit.status !== 0) {
  console.error('\n  提交失败，已停止。');
  process.exit(1);
}

/* 3. 推送 */
console.log('[3/3] 推送到 GitHub…');
const push = git(['push']);
if (push.status !== 0) {
  console.error('\n  推送失败。检查网络或 SSH 密钥（ssh -T git@github.com）。');
  process.exit(1);
}

console.log('');
console.log('  ✅ 已推送。GitHub Actions 正在构建，约 1 分钟后上线。');
console.log('     站点: ' + SITE_URL);
console.log('     构建日志: ' + ACTIONS_URL);
console.log('');
