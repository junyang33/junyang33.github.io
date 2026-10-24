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

  var THEME_ICON = {
    sun: '<svg class="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>',
    moon: '<svg class="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>',
  };

  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (toggle) {
      toggle.innerHTML = theme === 'dark' ? THEME_ICON.sun : THEME_ICON.moon;
      toggle.setAttribute('title', theme === 'dark' ? '切换到浅色' : '切换到深色');
    }
    try { localStorage.setItem('theme', theme); } catch (e) {}
    syncComments(theme);
    document.dispatchEvent(new Event('themechange'));
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

  /* ============================ 导航 ============================ */

  var dropdowns = $$('.dropdown');

  function closeDropdowns(except) {
    dropdowns.forEach(function (d) {
      if (d === except) return;
      d.classList.remove('is-open');
      var btn = $('.dropdown-toggle', d);
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  dropdowns.forEach(function (d) {
    var btn = $('.dropdown-toggle', d);
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = d.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
      closeDropdowns(d);
    });
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('.dropdown')) return;
    closeDropdowns(null);
  });

  var menuBtn = $('#menuBtn');
  var mobileMenu = $('#mobileMenu');

  function setMobileMenu(open) {
    if (!menuBtn || !mobileMenu) return;
    mobileMenu.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      setMobileMenu(mobileMenu.hidden);
    });
    mobileMenu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMobileMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !mobileMenu.hidden) setMobileMenu(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1080 && !mobileMenu.hidden) setMobileMenu(false);
    });
  }

  /* ============================ 漂浮气泡 ============================ */

  function initBubbles() {
    var layer = document.getElementById('bubbles');
    var btn = document.getElementById('bubbleBtn');
    if (!layer || !btn) return;

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var off = false;
    try { off = localStorage.getItem('bubblesOff') === '1'; } catch (e) {}

    var kindOf = function () {
      return document.documentElement.dataset.theme === 'dark' ? 'bubble' : 'petal';
    };

    var spawn = function (kind) {
      layer.innerHTML = '';
      layer.dataset.kind = kind;

      var narrow = window.innerWidth < 760;
      var petal = kind === 'petal';
      var count = narrow ? (petal ? 26 : 14) : (petal ? 58 : 28);
      var frag = document.createDocumentFragment();

      for (var i = 0; i < count; i++) {
        var el = document.createElement('span');
        el.className = petal ? 'petal' : 'bubble';

        var size = petal
          ? 6 + Math.random() * 15
          : 8 + Math.random() * (narrow ? 22 : 34);

        el.style.width = size.toFixed(1) + 'px';
        el.style.height = petal ? (size * (0.8 + Math.random() * 0.5)).toFixed(1) + 'px' : size.toFixed(1) + 'px';
        el.style.left = (Math.random() * 98 + 1).toFixed(2) + '%';

        var dur = petal ? 9 + Math.random() * 11 : 14 + Math.random() * 16;
        el.style.animationDuration = dur.toFixed(1) + 's';
        el.style.animationDelay = (-Math.random() * dur).toFixed(1) + 's';
        el.style.setProperty('--bubble-sway', (Math.random() * 50 - 25).toFixed(0) + 'px');
        el.style.setProperty('--bubble-op', petal
          ? (0.35 + Math.random() * 0.4).toFixed(2)
          : (0.26 + Math.random() * 0.26).toFixed(2));

        frag.appendChild(el);
      }

      layer.appendChild(frag);
    };

    var sync = function () {
      if (off || reduce) {
        layer.hidden = true;
      } else {
        spawn(kindOf());
        layer.hidden = false;
      }
      btn.classList.toggle('is-off', off);
      btn.setAttribute('aria-pressed', String(!off));
      btn.setAttribute('title', off ? '显示浮动效果' : '隐藏浮动效果');
    };

    btn.addEventListener('click', function () {
      off = !off;
      try { localStorage.setItem('bubblesOff', off ? '1' : '0'); } catch (e) {}
      sync();
    });

    document.addEventListener('themechange', function () {
      if (!off && !reduce) spawn(kindOf());
    });

    sync();
  }

  initBubbles();

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
  /* 自建播放器：<audio> 在 <main> 之外，软导航不会中断播放 */

  var musicEl = document.getElementById('musicPlayer');
  var musicAudio = document.getElementById('musicAudio');
  var musicDataEl = document.getElementById('musicData');
  var mTracks = [];
  var mIndex = 0;
  var mRestored = false;

  function fmtTime(sec) {
    if (!sec || !isFinite(sec) || sec < 0) sec = 0;
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function mTrack() {
    return mTracks[mIndex] || null;
  }

  function mRender() {
    var t = mTrack();
    if (!t) return;

    var title = t.title || '未知曲目';
    var sub = t.artist || '';
    var dur = musicAudio && isFinite(musicAudio.duration) ? musicAudio.duration : 0;
    var cur = musicAudio ? musicAudio.currentTime : 0;
    var ratio = dur > 0 ? Math.min(1, cur / dur) : 0;
    var playing = musicAudio && !musicAudio.paused;
    var icon = playing ? '❚❚' : '▶';

    var mpTitle = $('#mpTitle');
    var mpSub = $('#mpSub');
    var mpPlay = $('#mpPlay');
    var mpFill = $('#mpProgress i');
    if (mpTitle) mpTitle.textContent = title;
    if (mpSub) mpSub.textContent = sub;
    if (mpPlay) {
      mpPlay.textContent = icon;
      mpPlay.setAttribute('aria-label', playing ? '暂停' : '播放');
    }
    if (mpFill) mpFill.style.width = (ratio * 100).toFixed(2) + '%';
    if (musicEl) musicEl.classList.toggle('is-playing', !!playing);

    /* 侧栏挂件 */
    var mwTitle = $('#mwTitle');
    var mwSub = $('#mwSub');
    var mwFill = $('#mwProgress i');
    var mwTime = $('#mwTime');
    var widget = document.querySelector('.widget-music');
    var mwCover = $('#mwCover');
    var mwVol = $('#mwVol');

    if (mwTitle) mwTitle.textContent = title;
    if (mwSub) mwSub.textContent = sub;
    if (mwFill) mwFill.style.width = (ratio * 100).toFixed(2) + '%';
    if (mwTime) mwTime.textContent = fmtTime(cur) + ' / ' + fmtTime(dur);
    if (mwCover && t.cover && mwCover.getAttribute('src') !== t.cover) mwCover.src = t.cover;

    if (widget) {
      widget.classList.toggle('is-playing', !!playing);
      var mwPlayBtn = $('#mwPlay', widget);
      if (mwPlayBtn) mwPlayBtn.setAttribute('aria-label', playing ? '暂停' : '播放');

      var loopBtn = $('#mwLoop', widget);
      if (loopBtn) loopBtn.classList.toggle('is-on', !!(musicAudio && musicAudio.loop));

      if (mwVol) {
        var muted = !!(musicAudio && (musicAudio.muted || musicAudio.volume === 0));
        mwVol.innerHTML = muted ? VOL_ICON.mute : VOL_ICON.volume;
        mwVol.setAttribute('aria-label', muted ? '取消静音' : '静音');
        mwVol.classList.toggle('is-on', muted);
      }

      $$('.mw-track', widget).forEach(function (btn) {
        btn.classList.toggle('is-active', Number(btn.getAttribute('data-index')) === mIndex);
      });
    }
  }

  function mSave() {
    if (!musicAudio) return;
    try {
      localStorage.setItem('musicState', JSON.stringify({
        i: mIndex,
        t: musicAudio.currentTime || 0,
        v: musicAudio.volume,
      }));
    } catch (e) {}
  }

  function mLoad(i, resumeAt, autoPlay) {
    if (!mTracks.length) return;
    mIndex = ((i % mTracks.length) + mTracks.length) % mTracks.length;

    var t = mTrack();
    if (!t) return;

    musicAudio.src = t.src;
    musicAudio.load();

    if (resumeAt) {
      var seek = function () {
        try { musicAudio.currentTime = Math.min(resumeAt, musicAudio.duration || resumeAt); } catch (e) {}
        musicAudio.removeEventListener('loadedmetadata', seek);
      };
      musicAudio.addEventListener('loadedmetadata', seek);
    }

    if (autoPlay) {
      var p = musicAudio.play();
      if (p && p.catch) p.catch(function () { mRender(); });
    }
    mRender();
  }

  function mToggle() {
    if (!musicAudio || !mTracks.length) return;
    if (!musicAudio.src) {
      mLoad(mIndex, 0, true);
      return;
    }
    if (musicAudio.paused) {
      var p = musicAudio.play();
      if (p && p.catch) p.catch(function () {});
    } else {
      musicAudio.pause();
    }
  }

  function mStep(delta) {
    mLoad(mIndex + delta, 0, true);
  }

  function mSeekTo(el, clientX) {
    if (!musicAudio || !musicAudio.duration || !el) return;
    var r = el.getBoundingClientRect();
    var ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    musicAudio.currentTime = ratio * musicAudio.duration;
    mRender();
  }

  var VOL_ICON = {
    volume: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M17 9.5a4 4 0 0 1 0 5"/></svg>',
    mute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="m17 9 4 6M21 9l-4 6"/></svg>',
  };

  function toggleLoop() {
    if (!musicAudio) return;
    musicAudio.loop = !musicAudio.loop;
    mRender();
  }

  function toggleMute() {
    if (!musicAudio) return;
    musicAudio.muted = !musicAudio.muted;
    mRender();
  }

  function bindMusicControls(root) {
    if (!root) return;
    $$('[data-act]', root).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var act = btn.getAttribute('data-act');
        if (act === 'play') mToggle();
        else if (act === 'next') mStep(1);
        else if (act === 'prev') mStep(-1);
        else if (act === 'loop') toggleLoop();
        else if (act === 'list') {
          var listEl = document.getElementById('mwList');
          if (!listEl) return;
          var open = listEl.hidden;
          listEl.hidden = !open;
          btn.setAttribute('aria-expanded', String(open));
        }
      });
    });
  }

  if (musicEl && musicAudio && musicDataEl) {
    try {
      var data = JSON.parse(musicDataEl.textContent || '{}');
      mTracks = Array.isArray(data.tracks) ? data.tracks.filter(function (t) { return t && t.src; }) : [];
    } catch (e) {
      mTracks = [];
    }

    if (mTracks.length) {
      /* 悬浮条控件（只绑一次） */
      bindMusicControls(musicEl);

      var floatingProgress = $('#mpProgress');
      if (floatingProgress) {
        floatingProgress.addEventListener('click', function (e) {
          mSeekTo(floatingProgress, e.clientX);
        });
      }

      musicAudio.addEventListener('timeupdate', mRender);
      musicAudio.addEventListener('durationchange', mRender);
      musicAudio.addEventListener('play', mRender);
      musicAudio.addEventListener('pause', mRender);
      musicAudio.addEventListener('ended', function () { mStep(1); });
      musicAudio.addEventListener('error', function () {
        var mpSub = $('#mpSub');
        if (mpSub) mpSub.textContent = '音频加载失败';
      });

      /* 恢复上次的曲目与进度（不自动播放） */
      var savedState = null;
      try { savedState = JSON.parse(localStorage.getItem('musicState') || 'null'); } catch (e) {}
      var startIndex = savedState && typeof savedState.i === 'number' ? savedState.i : 0;
      var startAt = savedState && savedState.t ? savedState.t : 0;

      mLoad(startIndex, startAt, false);
      mRestored = true;

      /* 页头音乐按钮 */
      var headerMusicBtn = $('#musicBtn');
      if (headerMusicBtn) {
        headerMusicBtn.addEventListener('click', function () { mToggle(); });
      }

      window.addEventListener('pagehide', mSave);
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) mSave();
      });

      /* 快捷键：M 播放/暂停，Shift+M 下一首 */
      document.addEventListener('keydown', function (e) {
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        var el = e.target;
        if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return;
        if (e.key !== 'm' && e.key !== 'M') return;
        e.preventDefault();
        if (e.shiftKey) mStep(1);
        else mToggle();
      });
    }
  }

  function syncMusicWidget() {
    var widget = document.querySelector('.widget-music');
    if (!widget || !musicEl) return;

    bindMusicControls(widget);

    var bar = $('#mwProgress');
    if (bar) {
      bar.addEventListener('click', function (e) {
        mSeekTo(bar, e.clientX);
      });
    }

    var volBtn = $('#mwVol');
    if (volBtn) volBtn.addEventListener('click', toggleMute);

    $$('.mw-track', widget).forEach(function (btn) {
      btn.addEventListener('click', function () {
        mLoad(Number(btn.getAttribute('data-index')), 0, true);
      });
    });

    mRender();
  }

  /* ============================ 快捷键 ============================ */

  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    var el = e.target;
    if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return;

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

  /* ====================== 评论（giscus） ====================== */

  /* 软导航插入的 <script> 不会自动执行，需要重新创建一次 */
  function activateScripts(container) {
    $$('script', container).forEach(function (old) {
      var type = (old.getAttribute('type') || '').toLowerCase();
      if (type && type.indexOf('javascript') === -1 && type !== 'module') return; /* 跳过 JSON 数据块 */

      var src = old.getAttribute('src');
      if (!src && !old.textContent.trim()) return;

      var s = document.createElement('script');
      Array.prototype.forEach.call(old.attributes, function (attr) {
        s.setAttribute(attr.name, attr.value);
      });
      s.textContent = old.textContent;
      old.parentNode.replaceChild(s, old);
    });
  }

  /* giscus 加载后同步一次主题（它默认只跟随系统） */
  function syncGiscusTheme() {
    var wrap = document.querySelector('.giscus');
    if (!wrap) return;

    var tries = 0;
    var timer = setInterval(function () {
      var frame = document.querySelector('iframe.giscus-frame');
      if (frame) {
        syncComments(root.dataset.theme);
        clearInterval(timer);
        return;
      }
      if (++tries > 40) clearInterval(timer);
    }, 250);

    addCleanup(function () { clearInterval(timer); });
  }

  /* ====================== 首页横幅：打字机副标题 ====================== */

  function initHeroTyping(hero) {
    var out = document.getElementById('hbType');
    var data = document.getElementById('heroSubs');
    if (!out || !data) return;

    var lines = [];
    try { lines = JSON.parse(data.textContent || '[]'); } catch (e) {}
    lines = (Array.isArray(lines) ? lines : []).filter(Boolean);
    if (!lines.length) return;

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      out.textContent = lines[0];
      return;
    }

    var li = 0;
    var ci = 0;
    var deleting = false;
    var timer = null;

    function tick() {
      var line = lines[li % lines.length];

      if (!deleting) {
        ci++;
        out.textContent = line.slice(0, ci);
        if (ci >= line.length) {
          /* 只有一句时打完就停住，不再删除重打 */
          if (lines.length === 1) return;
          deleting = true;
          timer = setTimeout(tick, 1900);
          return;
        }
        timer = setTimeout(tick, 110 + Math.random() * 60);
        return;
      }

      ci--;
      out.textContent = line.slice(0, ci);
      if (ci <= 0) {
        deleting = false;
        li++;
        timer = setTimeout(tick, 320);
        return;
      }
      timer = setTimeout(tick, 45);
    }

    timer = setTimeout(tick, 500);
    addCleanup(function () { clearTimeout(timer); });
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
      var WEEK = ['日', '一', '二', '三', '四', '五', '六'];

      var pad2 = function (n) { return (n < 10 ? '0' : '') + n; };
      var keyOf = function (y, m, d) { return y + '-' + pad2(m + 1) + '-' + pad2(d); };

      var todayKey = keyOf(today.getFullYear(), today.getMonth(), today.getDate());
      var selected = null;

      var listEl = document.getElementById('calList');

      /* 点击某天后，在下方列出这一天的文章 */
      var renderList = function (key) {
        if (!listEl) return;
        var hits = byDate[key] || [];

        if (!hits.length) {
          listEl.innerHTML = '<p class="cal-empty">这一天没有写东西。</p>';
          return;
        }

        listEl.innerHTML = hits.map(function (h) {
          return '<a class="cal-item" href="' + h.u + '">' +
            '<span class="cal-item-t">' + h.t + '</span>' +
            '<span class="cal-item-d">' + h.d.slice(5) + '</span>' +
            '</a>';
        }).join('');
      };

      var renderCalendar = function () {
        var y = view.getFullYear();
        var m = view.getMonth();
        var startIdx = new Date(y, m, 1).getDay();
        var total = new Date(y, m + 1, 0).getDate();
        var cells = [];

        for (var i = 0; i < startIdx; i++) cells.push('<span class="cal-d is-out"></span>');

        for (var d = 1; d <= total; d++) {
          var key = keyOf(y, m, d);
          var hits = byDate[key];
          var cls = 'cal-d' +
            (hits ? ' has-post' : '') +
            (key === todayKey ? ' is-today' : '') +
            (key === selected ? ' is-selected' : '');

          cells.push(
            '<button class="' + cls + '" type="button" data-date="' + key + '"' +
              (hits ? ' aria-label="' + d + ' 日，' + hits.length + ' 篇文章"' : '') + '>' +
              d + (hits ? '<i class="cal-dot"></i>' : '') +
            '</button>'
          );
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
        if (nav) {
          view.setMonth(view.getMonth() + Number(nav.getAttribute('data-step')));
          renderCalendar();
          return;
        }

        var day = e.target.closest('.cal-d[data-date]');
        if (!day) return;

        var key = day.getAttribute('data-date');
        selected = key === selected ? null : key;
        renderCalendar();
        renderList(selected || todayKey);
      });

      /* 默认显示最近一篇有文章的日期 */
      var latestPost = entries.map(function (x) { return x.d; }).sort().pop();
      selected = latestPost || todayKey;
      renderCalendar();
      renderList(selected);
    }

    /* ---------- 动态：展开全文 / 评论 ---------- */
    $$('.pn-more').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var body = document.getElementById(btn.getAttribute('data-target') || '');
        if (!body) return;
        var clamped = body.classList.toggle('is-clamped');
        btn.classList.toggle('is-open', !clamped);
        btn.setAttribute('aria-expanded', String(!clamped));
        btn.innerHTML = (clamped ? '查看更多' : '收起') + ' <span class="pn-caret">⌄</span>';
      });
    });

    $$('.pn-comments').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var box = btn.parentNode.querySelector('.pn-giscus');
        if (!box) return;

        var open = box.hidden;
        box.hidden = !open;
        btn.setAttribute('aria-expanded', String(open));

        if (open && !box.dataset.mounted) {
          box.dataset.mounted = '1';
          var sc = document.createElement('script');
          sc.src = 'https://giscus.app/client.js';
          sc.setAttribute('data-repo', btn.getAttribute('data-repo') || '');
          sc.setAttribute('data-repo-id', btn.getAttribute('data-repo-id') || '');
          sc.setAttribute('data-category-id', btn.getAttribute('data-category-id') || '');
          sc.setAttribute('data-mapping', 'specific');
          sc.setAttribute('data-term', btn.getAttribute('data-term') || 'note');
          sc.setAttribute('data-reactions-enabled', '1');
          sc.setAttribute('data-emit-metadata', '0');
          sc.setAttribute('data-input-position', 'top');
          sc.setAttribute('data-theme', root.dataset.theme === 'dark' ? 'dark' : 'light');
          sc.setAttribute('data-lang', 'zh-CN');
          sc.setAttribute('data-loading', 'lazy');
          sc.crossOrigin = 'anonymous';
          sc.async = true;
          box.appendChild(sc);
        }
      });
    });

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

    /* ---------- 音乐挂件 ---------- */
    syncMusicWidget();

    /* ---------- 天气 ---------- */
    var weatherEl = document.getElementById('weatherWidget');
    if (weatherEl) initWeather(weatherEl);

    /* ---------- 评论 ---------- */
    syncGiscusTheme();

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
      initHeroTyping(hero);
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

        var freshMain = document.getElementById('main');
        if (freshMain) activateScripts(freshMain);

        document.title = doc.title;
        document.body.className = doc.body.className;
        document.body.setAttribute('data-page', doc.body.getAttribute('data-page') || '');

        var path = target.pathname;
        var inMore = false;

        $$('.nav .nav-link').forEach(function (a) {
          if (a.classList.contains('dropdown-toggle')) return;
          var ap = new URL(a.href, location.origin).pathname;
          var hit = ap === path || (ap !== '/' && path.indexOf(ap) === 0);
          a.classList.toggle('active', hit);
        });

        $$('#navMore .dropdown-item').forEach(function (a) {
          var ap = new URL(a.href, location.origin).pathname;
          if (ap === path) inMore = true;
        });

        var moreToggle = document.querySelector('.nav #navMore .dropdown-toggle');
        if (moreToggle) moreToggle.classList.toggle('active', inMore);
        closeDropdowns(null);
        setMobileMenu(false);

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
