/* ==========================================================================
   站点交互
   - 明暗主题（含评论框联动）
   - 阅读进度 / 回到顶部
   - 代码复制
   - 目录滚动高亮
   - 站内搜索
   - 图片灯箱
   - 照片扇子展开 / 相册筛选
   - 网易云音乐播放器
   ========================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  /* ---------------------------- 主题 ---------------------------- */

  var toggle = $('#themeToggle');

  function syncComments(theme) {
    var frame = document.querySelector('iframe.giscus-frame');
    if (!frame || !frame.contentWindow) return;
    try {
      frame.contentWindow.postMessage(
        { giscus: { setConfig: { theme: theme === 'dark' ? 'dark' : 'light' } } },
        'https://giscus.app'
      );
    } catch (e) {}
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (toggle) {
      toggle.textContent = theme === 'dark' ? '☀' : '◐';
      toggle.setAttribute('title', theme === 'dark' ? '切换到浅色' : '切换到深色');
    }
    try { localStorage.setItem('theme', theme); } catch (e) {}
    syncComments(theme);
  }

  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  if (!saved && window.matchMedia) {
    saved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  applyTheme(saved || 'light');

  if (toggle) {
    toggle.addEventListener('click', function () {
      applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
    });
  }

  /* ------------------- 阅读进度 + 回到顶部 ------------------- */

  var progress = $('#progress');
  var toTop = $('#toTop');

  if (progress || toTop) {
    var onScroll = function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var y = window.pageYOffset || doc.scrollTop;
      var ratio = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;

      if (progress) progress.style.width = (ratio * 100).toFixed(2) + '%';
      if (toTop) toTop.hidden = y < 600;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* --------------------------- 代码复制 --------------------------- */

  $$('pre.code').forEach(function (pre) {
    var btn = document.createElement('button');
    btn.className = 'code-copy';
    btn.type = 'button';
    btn.textContent = '复制';

    btn.addEventListener('click', function () {
      var code = pre.querySelector('code');
      var text = code ? code.textContent : pre.textContent;

      var done = function () {
        btn.textContent = '已复制';
        setTimeout(function () { btn.textContent = '复制'; }, 1600);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
        return;
      }

      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
      done();
    });

    pre.appendChild(btn);
  });

  /* --------------------------- 目录 --------------------------- */

  var toc = $('.toc');

  if (toc) {
    if (window.innerWidth < 760) toc.removeAttribute('open');

    var links = $$('a', toc);
    var targets = links
      .map(function (a) {
        var el = document.getElementById(a.getAttribute('href').slice(1));
        return el ? { link: a, el: el } : null;
      })
      .filter(Boolean);

    if (targets.length) {
      var activeLink = null;
      var spy = function () {
        var current = targets[0];
        targets.forEach(function (t) {
          if (t.el.getBoundingClientRect().top - 120 <= 0) current = t;
        });

        if (current.link !== activeLink) {
          if (activeLink) activeLink.classList.remove('active');
          current.link.classList.add('active');
          activeLink = current.link;
        }
      };

      window.addEventListener('scroll', spy, { passive: true });
      spy();
    }
  }

  /* --------------------------- 灯箱 --------------------------- */

  var lb = $('#lightbox');
  var lbImg = lb ? $('.lb-img', lb) : null;
  var lbCap = lb ? $('.lb-caption', lb) : null;
  var lbItems = [];
  var lbIndex = 0;

  function renderLightbox() {
    var item = lbItems[lbIndex];
    if (!item) return;
    lbImg.src = item.src;
    lbImg.alt = item.caption || '';
    lbCap.textContent = item.caption || '';
    var multi = lbItems.length > 1;
    $$('.lb-prev, .lb-next', lb).forEach(function (b) { b.hidden = !multi; });
  }

  function openLightbox(items, index) {
    if (!lb || !items.length) return;
    lbItems = items;
    lbIndex = index || 0;
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    renderLightbox();
    var close = $('.lb-close', lb);
    if (close) close.focus();
  }

  function closeLightbox() {
    if (!lb) return;
    lb.hidden = true;
    document.body.style.overflow = '';
    if (lbImg) lbImg.removeAttribute('src');
  }

  function stepLightbox(delta) {
    if (!lbItems.length) return;
    lbIndex = (lbIndex + delta + lbItems.length) % lbItems.length;
    renderLightbox();
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-src]');
    if (!trigger || !lb) return;

    var group = trigger.closest('.fan, .album, .note, .note-grid') || document;
    var nodes = $$('[data-src]', group);
    var items = nodes.map(function (n) {
      return { src: n.getAttribute('data-src'), caption: n.getAttribute('data-caption') || '' };
    });

    openLightbox(items, nodes.indexOf(trigger));
  });

  if (lb) {
    $('.lb-close', lb).addEventListener('click', closeLightbox);
    $('.lb-prev', lb).addEventListener('click', function () { stepLightbox(-1); });
    $('.lb-next', lb).addEventListener('click', function () { stepLightbox(1); });
    lb.addEventListener('click', function (e) {
      if (e.target === lb) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') stepLightbox(-1);
      if (e.key === 'ArrowRight') stepLightbox(1);
    });
  }

  /* ----------------------- 照片扇子 / 筛选 ----------------------- */

  $$('.fan').forEach(function (fan) {
    var cards = $$('.fan-card', fan);
    var n = cards.length;
    cards.forEach(function (card, i) {
      card.style.setProperty('--o', (i - (n - 1) / 2).toFixed(2));
    });

    var noHover = window.matchMedia && window.matchMedia('(hover: none)').matches;
    if (noHover) {
      fan.addEventListener('click', function (e) {
        if (!fan.classList.contains('is-open')) {
          e.preventDefault();
          fan.classList.add('is-open');
        }
      });
    }
  });

  var chips = $$('.album-tabs .chip');
  if (chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var filter = chip.getAttribute('data-filter');
        chips.forEach(function (c) { c.classList.toggle('is-active', c === chip); });
        $$('.album').forEach(function (album) {
          var hit = filter === 'all' || album.getAttribute('data-slug') === filter;
          album.classList.toggle('is-hidden', !hit);
        });
      });
    });
  }

  /* --------------------------- 搜索 --------------------------- */

  var input = $('#searchInput');
  var resultsEl = $('#searchResults');
  var statusEl = $('#searchStatus');

  if (input && resultsEl) {
    var posts = null;
    var loading = false;

    var escapeHtml = function (s) {
      return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };

    var highlight = function (text, tokens) {
      var html = escapeHtml(text);
      tokens.forEach(function (tk) {
        if (!tk) return;
        var safe = tk.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        html = html.replace(new RegExp('(' + safe + ')', 'gi'), '\u0001$1\u0002');
      });
      return html.replace(/\u0001/g, '<mark>').replace(/\u0002/g, '</mark>');
    };

    var snippet = function (text, tokens) {
      if (!text) return '';
      var lower = text.toLowerCase();
      var pos = -1;

      tokens.forEach(function (tk) {
        var i = lower.indexOf(tk.toLowerCase());
        if (i !== -1 && (pos === -1 || i < pos)) pos = i;
      });

      if (pos === -1) return text.slice(0, 110) + (text.length > 110 ? '…' : '');

      var start = Math.max(0, pos - 45);
      var end = Math.min(text.length, pos + 95);
      return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
    };

    var loadIndex = function () {
      if (posts || loading) return;
      loading = true;
      fetch('/search.json', { cache: 'no-cache' })
        .then(function (r) { return r.json(); })
        .then(function (data) { posts = data; loading = false; run(); })
        .catch(function () {
          loading = false;
          if (statusEl) statusEl.textContent = '搜索索引加载失败，请刷新页面重试。';
        });
    };

    var run = function () {
      var q = input.value.trim().toLowerCase();
      if (!posts) return;

      if (!q) {
        resultsEl.innerHTML = '';
        if (statusEl) statusEl.textContent = '输入关键词开始搜索。';
        return;
      }

      var tokens = q.split(/\s+/).filter(Boolean);
      var hits = [];

      posts.forEach(function (p) {
        var title = p.title.toLowerCase();
        var tags = (p.tags || []).join(' ').toLowerCase();
        var text = (p.text || '').toLowerCase();
        var hay = title + ' ' + tags + ' ' + text;
        var score = 0;

        for (var i = 0; i < tokens.length; i++) {
          if (hay.indexOf(tokens[i]) === -1) return;
          if (title.indexOf(tokens[i]) !== -1) score += 10;
          if (tags.indexOf(tokens[i]) !== -1) score += 5;
          if (text.indexOf(tokens[i]) !== -1) score += 1;
        }

        hits.push({ p: p, score: score });
      });

      hits.sort(function (a, b) {
        return b.score - a.score || (a.p.date < b.p.date ? 1 : -1);
      });

      if (!hits.length) {
        resultsEl.innerHTML = '';
        if (statusEl) statusEl.textContent = '没有找到匹配「' + input.value.trim() + '」的文章。';
        return;
      }

      if (statusEl) statusEl.textContent = '找到 ' + hits.length + ' 篇文章';

      resultsEl.innerHTML = hits
        .slice(0, 30)
        .map(function (h) {
          var p = h.p;
          return (
            '<li><h3><a href="' + p.url + '">' + highlight(p.title, tokens) + '</a></h3>' +
            '<p class="snip">' + highlight(snippet(p.text, tokens), tokens) + '</p>' +
            '<p class="meta">' + escapeHtml(p.date) +
            (p.tags && p.tags.length ? ' · ' + escapeHtml(p.tags.join(' / ')) : '') +
            '</p></li>'
          );
        })
        .join('');
    };

    var timer = null;
    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () { loadIndex(); run(); }, 120);
    });

    var params = new URLSearchParams(window.location.search);
    if (params.get('q')) {
      input.value = params.get('q');
      input.dispatchEvent(new Event('input'));
    } else {
      loadIndex();
    }
  }

  /* --------------------------- 音乐 --------------------------- */

  var music = $('#musicPlayer');
  if (music) {
    var mToggle = $('#musicToggle', music);
    var mPanel = $('#musicPanel', music);
    var mFrame = mPanel ? $('iframe', mPanel) : null;

    mToggle.addEventListener('click', function () {
      var willOpen = mPanel.hidden;
      mPanel.hidden = !willOpen;
      mToggle.setAttribute('aria-expanded', String(willOpen));
      music.classList.toggle('is-playing', willOpen);

      if (willOpen && mFrame && !mFrame.getAttribute('src')) {
        mFrame.src = mFrame.getAttribute('data-src');
      }
    });
  }
})();
