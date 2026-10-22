/* ==========================================================================
   站点交互
   - 全局（只初始化一次）：主题、字号状态、灯箱、音乐、快捷键、软导航
   - 页面级（每次换页重跑）：阅读进度、代码复制、目录、照片扇子、搜索、
     日历、侧栏挂件、首页横幅、正文图片放大
   ========================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  /* ============================ 主题 ============================ */

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

  /* ============================ 字号 ============================ */

  var SCALES = [1, 1.08, 1.16];
  var LABELS = ['A', 'A+', 'A++'];
  var scaleIdx = 0;

  try {
    var savedScale = Number(localStorage.getItem('fontScale'));
    if (savedScale >= 0 && savedScale < SCALES.length) scaleIdx = savedScale;
  } catch (e) {}

  function applyFont(i) {
    scaleIdx = ((i % SCALES.length) + SCALES.length) % SCALES.length;
    root.style.setProperty('--fs', SCALES[scaleIdx]);
    var btn = $('#fontBtn');
    if (btn) btn.textContent = LABELS[scaleIdx];
    try { localStorage.setItem('fontScale', String(scaleIdx)); } catch (e) {}
  }

  applyFont(scaleIdx);

  /* ============================ 灯箱 ============================ */

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

  /* 缩略图点击（委托，换页后依然有效）*/
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

  /* ============================ 音乐 ============================ */
  /* 播放器在 <main> 之外，软导航不会重建它，所以播放不会中断 */

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

  /* ============================ 快捷键 ============================ */

  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    var el = e.target;
    if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return;

    if (e.key === '/') {
      e.preventDefault();
      var si = document.getElementById('searchInput');
      if (si) si.focus();
      else navigate('/search.html');
      return;
    }

    if (e.key === 't' || e.key === 'T') {
      applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
      return;
    }

    if (e.key === 'f' || e.key === 'F') {
      if (document.getElementById('fontBtn')) {
        e.preventDefault();
        applyFont(scaleIdx + 1);
      }
    }
  });

  /* ====================== 天气（Open-Meteo） ====================== */

  var WEATHER_TEXT = {
    0: '晴', 1: '晴间多云', 2: '多云', 3: '阴',
    45: '有雾', 48: '雾凇',
    51: '毛毛雨', 53: '毛毛雨', 55: '细密雨',
    56: '冻毛雨', 57: '冻毛雨',
    61: '小雨', 63: '中雨', 65: '大雨',
    66: '冻雨', 67: '冻雨',
    71: '小雪', 73: '中雪', 75: '大雪', 77: '雪粒',
    80: '阵雨', 81: '强阵雨', 82: '暴雨',
    85: '阵雪', 86: '强阵雪',
    95: '雷阵雨', 96: '雷阵雨伴冰雹', 99: '强雷暴',
  };

  var WEATHER_ICON = {
    0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
    45: '🌫️', 48: '🌫️',
    51: '🌦️', 53: '🌦️', 55: '🌧️', 56: '🌧️', 57: '🌧️',
    61: '🌧️', 63: '🌧️', 65: '🌧️', 66: '🌧️', 67: '🌧️',
    71: '🌨️', 73: '🌨️', 75: '❄️', 77: '❄️',
    80: '🌦️', 81: '🌧️', 82: '⛈️',
    85: '🌨️', 86: '❄️',
    95: '⛈️', 96: '⛈️', 99: '⛈️',
  };

  var WEEK_CN = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  function weatherText(code) {
    return WEATHER_TEXT[code] || '未知';
  }

  function weatherIcon(code) {
    return WEATHER_ICON[code] || '🌡️';
  }

  function initWeather(el) {
    var body = el.querySelector('#weatherBody') || el.querySelector('.weather-body');
    if (!body) return;

    var city = el.getAttribute('data-city') || '';
    var lat = el.getAttribute('data-lat');
    var lon = el.getAttribute('data-lon');
    var days = Math.max(1, Math.min(7, Number(el.getAttribute('data-days')) || 3));
    var cacheKey = 'weather:' + city + ':' + lat + ',' + lon + ':' + days;

    function paint(data) {
      var cur = data.current || {};
      var daily = data.daily || {};
      var temps = daily.temperature_2m_max || [];
      var mins = daily.temperature_2m_min || [];
      var codes = daily.weather_code || [];
      var dates = daily.time || [];

      var html = '' +
        '<div class="weather-now">' +
          '<span class="weather-ico">' + weatherIcon(cur.weather_code) + '</span>' +
          '<div>' +
            '<div class="weather-temp">' + Math.round(cur.temperature_2m) + '<sup>°C</sup></div>' +
            '<div class="weather-desc">' + weatherText(cur.weather_code) +
              (cur.relative_humidity_2m != null ? ' · 湿度 ' + cur.relative_humidity_2m + '%' : '') +
            '</div>' +
          '</div>' +
        '</div>';

      if (dates.length > 1) {
        html += '<div class="weather-days">';
        for (var i = 0; i < dates.length; i++) {
          var label;
          if (i === 0) label = '今天';
          else if (i === 1) label = '明天';
          else if (i === 2) label = '后天';
          else label = WEEK_CN[new Date(dates[i] + 'T00:00:00').getDay()];

          html += '<div class="weather-day">' +
            '<span class="wd">' + label + '</span>' +
            '<span class="wi">' + weatherIcon(codes[i]) + '</span>' +
            '<span class="wr">' + Math.round(mins[i]) + '° / <b>' + Math.round(temps[i]) + '°</b></span>' +
            '</div>';
        }
        html += '</div>';
      }

      body.innerHTML = html;
    }

    function fail() {
      body.innerHTML = '<p class="weather-status">天气暂时获取不到，稍后再试。</p>';
    }

    /* 10 分钟内复用缓存，避免每次切页都请求 */
    try {
      var cached = JSON.parse(sessionStorage.getItem(cacheKey) || 'null');
      if (cached && Date.now() - cached.t < 600000) {
        paint(cached.d);
        return;
      }
    } catch (e) {}

    var url;
    if (lat && lon) {
      url = 'https://api.open-meteo.com/v1/forecast?latitude=' + encodeURIComponent(lat) +
        '&longitude=' + encodeURIComponent(lon) +
        '&current=temperature_2m,relative_humidity_2m,weather_code' +
        '&daily=weather_code,temperature_2m_max,temperature_2m_min' +
        '&timezone=auto&forecast_days=' + days;
    } else {
      url = 'https://geocoding-api.open-meteo.com/v1/search?name=' + encodeURIComponent(city) +
        '&count=1&language=zh&format=json';
    }

    function forecastFor(la, lo) {
      return 'https://api.open-meteo.com/v1/forecast?latitude=' + la + '&longitude=' + lo +
        '&current=temperature_2m,relative_humidity_2m,weather_code' +
        '&daily=weather_code,temperature_2m_max,temperature_2m_min' +
        '&timezone=auto&forecast_days=' + days;
    }

    fetch(url)
      .then(function (r) { return r.json(); })
      .then(function (json) {
        /* 没写经纬度时，先用城市名查坐标 */
        if (!lat || !lon) {
          var hit = json && json.results && json.results[0];
          if (!hit) throw new Error('no city');
          var nameEl = el.querySelector('#weatherCity');
          if (nameEl) nameEl.textContent = hit.name;
          return fetch(forecastFor(hit.latitude, hit.longitude)).then(function (r) { return r.json(); });
        }
        return json;
      })
      .then(function (data) {
        paint(data);
        try { sessionStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), d: data })); } catch (e) {}
      })
      .catch(fail);
  }

  /* ====================== 页面级初始化 ====================== */

  var cleanups = [];

  function addCleanup(fn) { cleanups.push(fn); }

  function onPageScroll(fn, opts) {
    window.addEventListener('scroll', fn, opts || false);
    addCleanup(function () { window.removeEventListener('scroll', fn, opts || false); });
  }

  function clearPage() {
    cleanups.forEach(function (fn) {
      try { fn(); } catch (e) {}
    });
    cleanups = [];
  }

  function bootPage() {
    /* ---------- 字号按钮（按钮在 main 内，每次重绑） ---------- */
    var fontBtn = $('#fontBtn');
    if (fontBtn) {
      fontBtn.textContent = LABELS[scaleIdx];
      fontBtn.addEventListener('click', function () { applyFont(scaleIdx + 1); });
    }

    /* ---------- 阅读进度 + 回到顶部 ---------- */
    var progress = $('#progress');
    var toTop = $('#toTop');
    var meter = $('#readMeter');

    if (progress || toTop || meter) {
      var onScroll = function () {
        var doc = document.documentElement;
        var max = doc.scrollHeight - doc.clientHeight;
        var y = window.pageYOffset || doc.scrollTop;
        var ratio = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;

        if (progress) progress.style.width = (ratio * 100).toFixed(2) + '%';
        if (toTop) toTop.hidden = y < 600;
        if (meter) {
          meter.textContent = Math.round(ratio * 100) + '%';
          meter.classList.toggle('is-visible', y > 260);
        }
      };

      onPageScroll(onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      addCleanup(function () { window.removeEventListener('resize', onScroll); });
      onScroll();

      if (toTop) {
        toTop.addEventListener('click', function () {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    }

    /* ---------- 代码复制 ---------- */
    $$('pre.code').forEach(function (pre) {
      var btn = document.createElement('button');
      btn.className = 'code-copy';
      btn.type = 'button';
      btn.textContent = '复制';

      btn.addEventListener('click', function () {
        var code = pre.querySelector('code');
        var lineEls = code ? code.querySelectorAll('.cl') : [];
        var text = lineEls.length
          ? Array.prototype.map.call(lineEls, function (l) { return l.textContent; }).join('\n')
          : (code ? code.textContent : pre.textContent);

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

    /* ---------- 目录滚动高亮 ---------- */
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

        onPageScroll(spy, { passive: true });
        spy();
      }
    }

    /* ---------- 照片扇子 / 相册筛选 ---------- */
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

    /* ---------- 搜索 ---------- */
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

    /* ---------- 友链洗牌 ---------- */
    var friendsEl = document.getElementById('friends');
    var shuffleBtn = document.getElementById('friendsShuffle');

    if (friendsEl && shuffleBtn) {
      shuffleBtn.addEventListener('click', function () {
        var items = Array.prototype.slice.call(friendsEl.children);
        for (var i = items.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var tmp = items[i];
          items[i] = items[j];
          items[j] = tmp;
        }
        items.forEach(function (el) { friendsEl.appendChild(el); });
      });
    }

    /* ---------- 日历 ---------- */
    var calEl = $('#calendar');
    var calData = $('#calendarData');

    if (calEl && calData) {
      var entries = [];
      try { entries = JSON.parse(calData.textContent || '[]'); } catch (e) {}

      var byDate = {};
      entries.forEach(function (item) {
        if (!item || !item.d) return;
        (byDate[item.d] = byDate[item.d] || []).push(item);
      });

      var today = new Date();
      var view = new Date(today.getFullYear(), today.getMonth(), 1);
      var WEEK = ['一', '二', '三', '四', '五', '六', '日'];

      var pad2 = function (n) { return (n < 10 ? '0' : '') + n; };
      var keyOf = function (y, m, d) { return y + '-' + pad2(m + 1) + '-' + pad2(d); };

      var renderCalendar = function () {
        var y = view.getFullYear();
        var m = view.getMonth();
        var startIdx = (new Date(y, m, 1).getDay() + 6) % 7;
        var total = new Date(y, m + 1, 0).getDate();
        var todayKey = keyOf(today.getFullYear(), today.getMonth(), today.getDate());
        var cells = [];

        for (var i = 0; i < startIdx; i++) cells.push('<span class="cal-d is-out"></span>');

        for (var d = 1; d <= total; d++) {
          var key = keyOf(y, m, d);
          var hits = byDate[key];
          var cls = 'cal-d' + (hits ? ' has-post' : '') + (key === todayKey ? ' is-today' : '');

          if (hits) {
            var tip = hits.map(function (h) { return h.t; }).join(' / ').replace(/"/g, '&quot;');
            cells.push('<a class="' + cls + '" href="' + hits[0].u + '" title="' + tip + '">' + d + '</a>');
          } else {
            cells.push('<span class="' + cls + '">' + d + '</span>');
          }
        }

        calEl.innerHTML =
          '<div class="cal-head">' +
            '<button class="cal-nav" type="button" data-step="-1" aria-label="上个月">‹</button>' +
            '<span class="cal-title">' + y + ' 年 ' + (m + 1) + ' 月</span>' +
            '<button class="cal-nav" type="button" data-step="1" aria-label="下个月">›</button>' +
          '</div>' +
          '<div class="cal-week">' + WEEK.map(function (w) { return '<span>' + w + '</span>'; }).join('') + '</div>' +
          '<div class="cal-grid">' + cells.join('') + '</div>';
      };

      renderCalendar();

      calEl.addEventListener('click', function (e) {
        var nav = e.target.closest('.cal-nav');
        if (!nav) return;
        var step = Number(nav.getAttribute('data-step'));
        view.setMonth(view.getMonth() + step);
        renderCalendar();
      });
    }

    /* ---------- 侧栏挂件 ---------- */
    var notice = $('#noticeWidget');
    var noticeClose = $('#noticeClose');

    if (notice && noticeClose) {
      try {
        if (localStorage.getItem('noticeClosed') === '1') notice.hidden = true;
      } catch (e) {}

      noticeClose.addEventListener('click', function () {
        notice.hidden = true;
        try { localStorage.setItem('noticeClosed', '1'); } catch (e) {}
      });
    }

    var musicWidgetBtn = $('#musicFromWidget');
    if (musicWidgetBtn) {
      musicWidgetBtn.addEventListener('click', function () {
        var btn = document.getElementById('musicToggle');
        if (btn) btn.click();
      });
    }

    /* ---------- 天气 ---------- */
    var weatherEl = document.getElementById('weatherWidget');
    if (weatherEl) initWeather(weatherEl);

    /* ---------- 站点数据：天数按当天时间重算 ---------- */
    $$('[data-stat]').forEach(function (el) {
      var since = el.getAttribute('data-since');
      if (!since) return;
      var t = Date.parse(since + 'T00:00:00');
      if (isNaN(t)) return;

      var days = Math.round((Date.now() - t) / 86400000);
      if (days < 0) days = 0;

      if (el.getAttribute('data-stat') === 'idle') {
        el.textContent = days === 0 ? '今天' : days + ' 天前';
      } else {
        el.textContent = Math.max(1, days) + ' 天';
      }
    });

    /* ---------- 首页横幅轮换 ---------- */
    var hero = document.getElementById('heroBanner');
    if (hero) {
      var hbSlides = $$('.hb-slide', hero);
      var hbDelay = Number(hero.getAttribute('data-autoplay')) || 5200;
      var hbIndex = 0;
      var hbTimer = null;

      var hbShow = function (i) {
        if (!hbSlides.length) return;
        hbIndex = (i + hbSlides.length) % hbSlides.length;
        hbSlides.forEach(function (s, k) {
          s.classList.toggle('is-active', k === hbIndex);
        });
      };

      var hbStop = function () {
        if (hbTimer) { clearInterval(hbTimer); hbTimer = null; }
      };

      var hbStart = function () {
        if (hbSlides.length < 2) return;
        hbStop();
        hbTimer = setInterval(function () { hbShow(hbIndex + 1); }, hbDelay);
      };

      var hbReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!hbReduce) hbStart();
      addCleanup(hbStop);

      var onVisible = function () {
        if (document.hidden) hbStop();
        else hbStart();
      };
      document.addEventListener('visibilitychange', onVisible);
      addCleanup(function () { document.removeEventListener('visibilitychange', onVisible); });

      var hbSyncHeader = function () {
        var y = window.scrollY || window.pageYOffset || 0;
        document.body.classList.toggle('hero-scrolled', y > 72);
      };
      onPageScroll(hbSyncHeader, { passive: true });
      hbSyncHeader();
    } else {
      document.body.classList.remove('hero-scrolled');
    }

    /* ---------- 正文图片放大 ---------- */
    $$('.post-content img').forEach(function (img) {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function () {
        openLightbox([{ src: img.currentSrc || img.src, caption: img.alt || '' }], 0);
      });
    });
  }

  /* ============================ 软导航 ============================ */
  /* 只替换 <main>（和首页横幅），页面不重载，音乐播放器所在的 iframe 不会被销毁 */

  function isPlainLeftClick(e) {
    return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
  }

  function linkTarget(a) {
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return null;
    if (a.getAttribute('rel') === 'external') return null;

    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#') return null;
    if (/^(mailto:|tel:|javascript:)/i.test(href)) return null;

    var url;
    try { url = new URL(a.href, location.href); } catch (e) { return null; }

    if (url.origin !== location.origin) return null;
    if (!/\.html$/.test(url.pathname) && url.pathname !== '/') return null;

    return url;
  }

  var navToken = 0;

  function navigate(url, push) {
    var target = typeof url === 'string' ? new URL(url, location.href) : url;
    var token = ++navToken;

    fetch(target.href, { credentials: 'same-origin' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      })
      .then(function (html) {
        if (token !== navToken) return;

        var doc = new DOMParser().parseFromString(html, 'text/html');
        var newMain = doc.getElementById('main');
        var oldMain = document.getElementById('main');
        if (!newMain || !oldMain) {
          location.href = target.href;
          return;
        }

        clearPage();

        /* 首页横幅只存在于首页，需要单独搬 */
        var newHero = doc.querySelector('.hero-banner');
        var oldHero = document.querySelector('.hero-banner');
        if (oldHero && newHero) {
          oldHero.replaceWith(document.importNode(newHero, true));
        } else if (oldHero && !newHero) {
          oldHero.remove();
        } else if (!oldHero && newHero) {
          var header = document.querySelector('.site-header');
          if (header) header.insertAdjacentElement('afterend', document.importNode(newHero, true));
        }

        oldMain.replaceWith(document.importNode(newMain, true));

        document.title = doc.title;
        document.body.className = doc.body.className;
        document.body.setAttribute('data-page', doc.body.getAttribute('data-page') || '');

        var path = target.pathname;
        $$('.nav a').forEach(function (a) {
          var ap = new URL(a.href, location.origin).pathname;
          a.classList.toggle('active', ap === path || (ap !== '/' && path.indexOf(ap) === 0));
        });

        if (push) {
          try { history.pushState({ soft: true }, '', target.href); } catch (e) {}
        }

        if (!target.hash) window.scrollTo(0, 0);
        bootPage();
      })
      .catch(function () {
        location.href = target.href;
      });
  }

  document.addEventListener('click', function (e) {
    if (!isPlainLeftClick(e) || e.defaultPrevented) return;

    var a = e.target.closest('a');
    var url = linkTarget(a);
    if (!url) return;
    if (url.pathname === location.pathname && url.hash) return;

    e.preventDefault();
    navigate(url, true);
  });

  window.addEventListener('popstate', function () {
    navigate(location.href, false);
  });

  /* ============================ 启动 ============================ */

  bootPage();
})();
