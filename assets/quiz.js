/* ==========================================================================
   题库：顺序练习 / 背题 / 模拟考试 / 错题本
   ========================================================================== */
(function () {
  'use strict';

  /* 软导航（PJAX）会替换 DOM，所以每次用到节点都重新取一次 */
  function $root() { return document.getElementById('quizRoot'); }
  function $home() { return document.getElementById('quizHome'); }
  function $play() { return document.getElementById('quizPlay'); }
  function $res() { return document.getElementById('quizResult'); }

  var DATA = null;
  var EXAM_SIZE = 100;
  var LS_DONE = 'qzDone';
  var LS_WRONG = 'qzWrong';
  var LS_BEST = 'qzBest';

  var state = {
    mode: 'practice',
    list: [],
    index: 0,
    answers: {},        // qid -> [idx...]
    revealed: {},       // qid -> true（是否已出解析）
    finished: false,
    timer: null,
    startedAt: 0,
    title: '',
  };

  /* ---------- 本地存档 ---------- */
  function readJson(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
  function writeJson(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }
  function getDone() { return readJson(LS_DONE, {}); }
  function getWrong() { return readJson(LS_WRONG, []); }

  function recordAnswer(q, correct) {
    var done = getDone();
    done[q.id] = correct ? 1 : 0;
    writeJson(LS_DONE, done);

    var wrong = getWrong();
    if (correct) {
      var i = wrong.indexOf(q.id);
      if (i > -1) wrong.splice(i, 1);
    } else if (wrong.indexOf(q.id) === -1) {
      wrong.push(q.id);
    }
    writeJson(LS_WRONG, wrong);
  }

  /* ---------- 工具 ---------- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function typeName(t) {
    return t === 'multi' ? '多选' : t === 'judge' ? '判断' : '单选';
  }
  function same(a, b) {
    if (!a || !b || a.length !== b.length) return false;
    var x = a.slice().sort().join(','), y = b.slice().sort().join(',');
    return x === y;
  }
  function topicTitle(id) {
    var t = DATA.topics.filter(function (x) { return x.id === id; })[0];
    return t ? t.title : '';
  }

  /* ---------- 载入状态 ---------- */
  function setLoading(on) {
    var root2 = document.getElementById('quizRoot');
    if (!root2) return;
    root2.classList.toggle('is-loading', !!on);
    var tip = document.getElementById('qzLoading');
    if (tip) tip.hidden = !on;
  }

  /* ---------- 首页统计 ---------- */
  function refreshHome() {
    var done = getDone();
    var ids = Object.keys(done);
    var right = ids.filter(function (k) { return done[k] === 1; }).length;

    var doneEl = document.getElementById('qzDone');
    var rateEl = document.getElementById('qzRate');
    var wrongEl = document.getElementById('qzWrong');
    var bestEl = document.getElementById('qzExamBest');

    if (doneEl) doneEl.textContent = ids.length;
    if (rateEl) rateEl.textContent = ids.length ? Math.round((right / ids.length) * 100) + '%' : '–';
    if (wrongEl) wrongEl.textContent = getWrong().length;
    if (bestEl) {
      var best = readJson(LS_BEST, null);
      bestEl.textContent = best == null ? '–' : best + ' 分';
    }
  }

  /* ---------- 按专题比例抽题 ---------- */
  function sampleExam(size) {
    var byTopic = {};
    DATA.questions.forEach(function (q) {
      (byTopic[q.topic] = byTopic[q.topic] || []).push(q);
    });
    var topicIds = Object.keys(byTopic).filter(function (k) { return byTopic[k].length; });
    var totalQ = DATA.questions.length;

    // 最大余数法分配名额
    var quotas = topicIds.map(function (k) {
      var exact = (byTopic[k].length / totalQ) * size;
      return { id: k, base: Math.floor(exact), rest: exact - Math.floor(exact) };
    });
    var assigned = quotas.reduce(function (n, q) { return n + q.base; }, 0);
    var left = size - assigned;
    quotas.sort(function (a, b) { return b.rest - a.rest; });
    for (var i = 0; i < left; i++) quotas[i % quotas.length].base += 1;

    // 每个专题内部随机抽取，并保证不超过该专题题量
    var picked = [];
    quotas.forEach(function (q) {
      var pool = byTopic[q.id].slice();
      shuffle(pool);
      picked = picked.concat(pool.slice(0, Math.min(q.base, pool.length)));
    });
    // 不足则从剩余题里补足
    if (picked.length < size) {
      var used = {};
      picked.forEach(function (q) { used[q.id] = 1; });
      var rest = DATA.questions.filter(function (q) { return !used[q.id]; });
      shuffle(rest);
      picked = picked.concat(rest.slice(0, size - picked.length));
    }
    shuffle(picked);
    return picked.slice(0, size);
  }

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  /* ---------- 开始一次练习/考试 ---------- */
  var pending = null;

  function start(mode, opts) {
    opts = opts || {};
    if (!$root()) return;
    /* 数据还没到（移动网络较慢时常见）：先记下来，等加载完自动进入 */
    if (!DATA) {
      pending = { mode: mode, opts: opts };
      setLoading(true);
      return;
    }
    state.mode = mode;
    state.index = 0;
    state.answers = {};
    state.revealed = {};
    state.finished = false;
    state.startedAt = Date.now();

    if (mode === 'exam') {
      state.list = sampleExam(EXAM_SIZE);
      state.title = '模拟考试';
      startTimer();
    } else if (mode === 'wrong') {
      var wrong = getWrong();
      state.list = DATA.questions.filter(function (q) { return wrong.indexOf(q.id) > -1; });
      state.title = '错题本';
      stopTimer();
    } else if (mode === 'topic') {
      state.list = DATA.questions.filter(function (q) { return q.topic === opts.topic; });
      state.title = topicTitle(opts.topic);
      stopTimer();
    } else if (mode === 'study') {
      state.list = DATA.questions.slice();
      state.title = '背题模式';
      stopTimer();
    } else {
      state.list = DATA.questions.slice();
      state.title = '顺序练习';
      stopTimer();
    }

    // 顺序练习与错题本从上次位置继续（仅练习模式）
    if (mode === 'practice' && state.list.length) {
      var done = getDone();
      var firstUndone = state.list.findIndex(function (q) { return done[q.id] === undefined; });
      if (firstUndone > 0 && opts.resume !== false) state.index = firstUndone;
    }

    $home().hidden = true;
    $res().hidden = true;
    $play().hidden = false;
    render();
  }

  function exit() {
    stopTimer();
    $play().hidden = true;
    $play().innerHTML = '';
    $res().hidden = true;
    $home().hidden = false;
    refreshHome();
  }

  function startTimer() {
    stopTimer();
    state.timer = setInterval(function () {
      var el = document.getElementById('qzClock');
      if (el) el.textContent = fmtTime(Date.now() - state.startedAt);
    }, 1000);
  }
  function stopTimer() {
    if (state.timer) { clearInterval(state.timer); state.timer = null; }
  }
  function fmtTime(ms) {
    var s = Math.floor(ms / 1000);
    var m = Math.floor(s / 60);
    return String(m).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }

  /* ---------- 渲染一题 ---------- */
  function render() {
    if (!state.list.length) {
      $play().innerHTML =
        '<div class="qz-empty">' +
        '<p>这里还没有题。</p>' +
        '<p class="qz-empty-hint">' + (state.mode === 'wrong' ? '先把错题做出来再来。' : '换一个模式试试。') + '</p>' +
        '<button class="qz-btn" type="button" data-act="exit">返回</button>' +
        '</div>';
      bindPlay();
      return;
    }

    var q = state.list[state.index];
    var isExam = state.mode === 'exam';
    var isStudy = state.mode === 'study';
    var picked = state.answers[q.id] || [];
    var revealed = isStudy || isExam ? true : !!state.revealed[q.id];
    var correct = same(picked, q.answer);

    var opts = q.options.map(function (text, i) {
      var cls = 'qz-opt';
      if (revealed && (isStudy || state.revealed[q.id])) {
        if (q.answer.indexOf(i) > -1) cls += ' is-right';
        else if (picked.indexOf(i) > -1) cls += ' is-wrong';
      } else if (picked.indexOf(i) > -1) {
        cls += ' is-picked';
      }
      var mark = '';
      if (revealed && (isStudy || state.revealed[q.id])) {
        if (q.answer.indexOf(i) > -1) mark = '<span class="qz-mark">✓</span>';
        else if (picked.indexOf(i) > -1) mark = '<span class="qz-mark">✕</span>';
      }
      return '      <button class="' + cls + '" type="button" data-opt="' + i + '">' +
        '<span class="qz-opt-key">' + String.fromCharCode(65 + i) + '</span>' +
        '<span class="qz-opt-text">' + esc(text) + '</span>' + mark + '</button>';
    }).join('\n');

    var showExplain = (isStudy) || (state.revealed[q.id] && !isExam);

    var head = [
      '<div class="qz-bar">',
      '  <button class="qz-back" type="button" data-act="exit" title="返回">←</button>',
      '  <span class="qz-bar-title">' + esc(state.title) + '</span>',
      isExam
        ? '  <span class="qz-clock" id="qzClock">' + fmtTime(Date.now() - state.startedAt) + '</span>'
        : '  <span class="qz-bar-count">' + (state.index + 1) + ' / ' + state.list.length + '</span>',
      '</div>',
      '<div class="qz-progress"><i style="width:' + Math.round(((state.index + 1) / state.list.length) * 100) + '%"></i></div>',
    ].join('\n');

    var body = [
      '<div class="qz-card">',
      '  <div class="qz-meta">',
      '    <span class="qz-badge is-' + q.type + '">' + typeName(q.type) + '</span>',
      '    <span class="qz-topic-name">' + esc(topicTitle(q.topic)) + '</span>',
      '  </div>',
      '  <h2 class="qz-stem">' + esc(q.stem) + '</h2>',
      '  <div class="qz-opts">',
      opts,
      '  </div>',
      isExam
        ? '  <div class="qz-actions"><button class="qz-btn" type="button" data-act="submit">交卷</button></div>'
        : (q.type === 'multi' && !showExplain
            ? '  <div class="qz-actions"><button class="qz-btn" type="button" data-act="check">确认答案</button></div>'
            : ''),
      showExplain
        ? '  <div class="qz-explain' + (picked.length ? (correct ? ' is-right' : ' is-wrong') : '') + '">' +
          '    <div class="qz-explain-head">' +
          (picked.length ? '<span class="qz-verdict">' + (correct ? '回答正确' : '回答错误') + '</span>' : '<span class="qz-verdict">答案</span>') +
          '    <span class="qz-answer">正确答案：' + q.answer.map(function (i) { return String.fromCharCode(65 + i); }).join('') + '</span>' +
          '    </div>' +
          '    <p class="qz-explain-text">' + esc(q.explain || '暂无解析') + '</p>' +
          '  </div>'
        : '',
      '</div>',
    ].join('\n');

    var nav = [
      '<div class="qz-nav">',
      '  <button class="qz-btn is-ghost" type="button" data-act="prev"' + (state.index === 0 ? ' disabled' : '') + '>上一题</button>',
      isExam
        ? '  <button class="qz-btn is-ghost" type="button" data-act="jump">题目列表</button>'
        : '  <button class="qz-btn" type="button" data-act="next"' + (state.index >= state.list.length - 1 ? ' disabled' : '') + '>下一题</button>',
      isExam
        ? '  <button class="qz-btn" type="button" data-act="next"' + (state.index >= state.list.length - 1 ? ' disabled' : '') + '>下一题</button>'
        : '',
      '</div>',
    ].join('\n');

    $play().innerHTML = head + body + nav;
    bindPlay();
  }

  /* ---------- 交互 ---------- */
  function bindPlay() {
    $play().onclick = function (e) {
      var t = e.target.closest('[data-opt],[data-act]');
      if (!t) return;

      if (t.hasAttribute('data-opt')) {
        pickOption(Number(t.getAttribute('data-opt')));
        return;
      }

      var act = t.getAttribute('data-act');
      if (act === 'exit') return exit();
      if (act === 'prev') return go(-1);
      if (act === 'next') return go(1);
      if (act === 'check') return revealCurrent();
      if (act === 'submit') return submitExam();
      if (act === 'jump') return toggleJump();
    };
  }

  function pickOption(i) {
    var q = state.list[state.index];
    if (!q) return;
    if (state.mode === 'exam') {
      var sel = (state.answers[q.id] || []).slice();
      if (q.type === 'multi') {
        var at = sel.indexOf(i);
        if (at > -1) sel.splice(at, 1); else sel.push(i);
      } else {
        sel = [i];
      }
      state.answers[q.id] = sel;
      render();
      return;
    }

    if (state.mode === 'study') return;      // 背题模式不响应点击
    if (state.revealed[q.id]) return;        // 已作答不再改

    if (q.type === 'multi') {
      var arr = (state.answers[q.id] || []).slice();
      var pos = arr.indexOf(i);
      if (pos > -1) arr.splice(pos, 1); else arr.push(i);
      state.answers[q.id] = arr;
      render();
      return;
    }

    state.answers[q.id] = [i];
    revealCurrent();
  }

  function revealCurrent() {
    var q = state.list[state.index];
    if (!q) return;
    var picked = state.answers[q.id] || [];
    if (!picked.length) return;
    state.revealed[q.id] = true;
    recordAnswer(q, same(picked, q.answer));
    render();
    var ex = $play().querySelector('.qz-explain');
    if (ex && ex.scrollIntoView) ex.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function go(delta) {
    var next = state.index + delta;
    if (next < 0 || next >= state.list.length) return;
    state.index = next;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function toggleJump() {
    var existing = $play().querySelector('.qz-jump');
    if (existing) { existing.remove(); return; }

    var cells = state.list.map(function (q, i) {
      var done = (state.answers[q.id] || []).length > 0;
      return '<button class="qz-jump-cell' + (done ? ' is-done' : '') + (i === state.index ? ' is-cur' : '') +
        '" type="button" data-goto="' + i + '">' + (i + 1) + '</button>';
    }).join('');

    var box = document.createElement('div');
    box.className = 'qz-jump';
    box.innerHTML = '<div class="qz-jump-grid">' + cells + '</div>' +
      '<div class="qz-jump-foot"><span>已答 ' + Object.keys(state.answers).length + ' / ' + state.list.length + '</span>' +
      '<button class="qz-btn" type="button" data-act="submit">交卷</button></div>';
    $play().appendChild(box);

    box.onclick = function (e) {
      var c = e.target.closest('[data-goto]');
      if (c) {
        state.index = Number(c.getAttribute('data-goto'));
        box.remove();
        render();
        return;
      }
      var s = e.target.closest('[data-act="submit"]');
      if (s) submitExam();
    };
    box.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  /* ---------- 交卷 ---------- */
  function submitExam() {
    var total = state.list.length;
    var right = 0;
    state.list.forEach(function (q) {
      if (same(state.answers[q.id] || [], q.answer)) right += 1;
    });
    var unanswered = state.list.filter(function (q) { return !(state.answers[q.id] || []).length; }).length;
    var score = total ? Math.round((right / total) * 100) : 0;

    stopTimer();
    state.finished = true;

    var best = readJson(LS_BEST, null);
    if (best == null || score > best) writeJson(LS_BEST, score);

    // 考试也记入错题本
    state.list.forEach(function (q) {
      var ok = same(state.answers[q.id] || [], q.answer);
      var done = getDone();
      done[q.id] = ok ? 1 : 0;
      writeJson(LS_DONE, done);
      var wrong = getWrong();
      if (ok) {
        var i = wrong.indexOf(q.id);
        if (i > -1) wrong.splice(i, 1);
      } else if (wrong.indexOf(q.id) === -1) {
        wrong.push(q.id);
      }
      writeJson(LS_WRONG, wrong);
    });

    var used = fmtTime(Date.now() - state.startedAt);

    var review = state.list.map(function (q, i) {
      var picked = state.answers[q.id] || [];
      var ok = same(picked, q.answer);
      return '      <li class="qz-review' + (ok ? ' is-right' : ' is-wrong') + '">' +
        '<div class="qz-review-head"><b>' + (i + 1) + '.</b> <span class="qz-badge is-' + q.type + '">' + typeName(q.type) + '</span> ' +
        (ok ? '<span class="qz-ok">正确</span>' : '<span class="qz-no">错误</span>') + '</div>' +
        '<p class="qz-review-stem">' + esc(q.stem) + '</p>' +
        '<p class="qz-review-ans">你的答案：' + (picked.length ? picked.map(function (k) { return String.fromCharCode(65 + k); }).join('') : '未作答') +
        '　正确答案：' + q.answer.map(function (k) { return String.fromCharCode(65 + k); }).join('') + '</p>' +
        '<p class="qz-review-exp">' + esc(q.explain || '') + '</p>' +
        '</li>';
    }).join('\n');

    $play().hidden = true;
    $res().hidden = false;
    $res().innerHTML = [
      '<div class="qz-scorecard">',
      '  <div class="qz-score' + (score >= 60 ? ' is-pass' : '') + '">' + score + '<small>分</small></div>',
      '  <div class="qz-score-meta">',
      '    <span>答对 ' + right + ' / ' + total + '</span>',
      '    <span>未答 ' + unanswered + '</span>',
      '    <span>用时 ' + used + '</span>',
      '  </div>',
      '  <div class="qz-score-actions">',
      '    <button class="qz-btn" type="button" data-act="again">再考一次</button>',
      '    <button class="qz-btn is-ghost" type="button" data-act="home">返回题库</button>',
      '  </div>',
      '</div>',
      '<h2 class="qz-sub">逐题回顾</h2>',
      '<ol class="qz-review-list">',
      review,
      '</ol>',
    ].join('\n');

    $res().onclick = function (e) {
      var t = e.target.closest('[data-act]');
      if (!t) return;
      if (t.getAttribute('data-act') === 'again') { $res().hidden = true; start('exam'); }
      if (t.getAttribute('data-act') === 'home') exit();
    };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------- 首页按钮 ---------- */
  function onHomeClick(e) {
    var modeBtn = e.target.closest('[data-mode]');
    if (modeBtn) {
      start(modeBtn.getAttribute('data-mode'));
      return;
    }
    var topicBtn = e.target.closest('[data-topic]');
    if (topicBtn) start('topic', { topic: topicBtn.getAttribute('data-topic') });
  }

  /* 事件委托到 document：即便节点被替换或移动端点按，也能响应 */
  document.addEventListener('click', function (e) {
    if (!e.target.closest) return;
    if (!e.target.closest('#quizHome')) return;
    onHomeClick(e);
  });

  /* ---------- 初始化（首次加载和软导航后都会调用） ---------- */
  /* 支持 /quiz.html?q=123 直接跳到某题，便于分享与排查 */
  function jumpTo() {
    var m = /[?&]q=(\d+)/.exec(location.search);
    if (!m || !DATA) return;
    var qid = Number(m[1]);
    var idx = DATA.questions.findIndex(function (q) { return q.id === qid; });
    if (idx < 0) return;
    start('practice', { resume: false });
    state.index = idx;
    render();
  }

  function bootQuiz() {
    if (!$root()) return;
    setLoading(!DATA);
    refreshHome();
    if (pending && DATA) {
      var p1 = pending;
      pending = null;
      start(p1.mode, p1.opts);
    }
  }
  window.bootQuiz = bootQuiz;

  /* ---------- 载入数据 ---------- */
  fetch('/assets/data/quiz.json', { cache: 'force-cache' })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      DATA = data;
      setLoading(false);
      refreshHome();
      if (pending) { var p0 = pending; pending = null; start(p0.mode, p0.opts); }
      if (window.__quizAutoStart === 'exam') start('exam');
      jumpTo();
    })
    .catch(function () {
      setLoading(false);
      var h = $home();
      if (h) h.innerHTML = '<p class="qz-empty">题库数据加载失败，刷新试试。</p>';
    });

  window.quizModule = { start: start, sample: sampleExam };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootQuiz);
  } else {
    bootQuiz();
  }
})();
