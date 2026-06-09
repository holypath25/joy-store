(function () {
  'use strict';

  var API_URL = window.JOYCHAT_API_URL || '';
  var PRODUCT_BASE_URL = window.JOYCHAT_PRODUCT_URL || '/products/';

  var SUGGESTIONS = ['주름 개선', '피부 탄력', '여드름 흉터', '볼 볼륨', '피부 재생'];

  var history = [];
  var loading = false;

  // ── Styles ──────────────────────────────────────────────────────────────────
  var css = `
    #joy-chat-btn {
      position: fixed; bottom: 24px; right: 24px; z-index: 99999;
      height: 56px; border-radius: 50px;
      background: #0f2340; border: none; cursor: pointer;
      box-shadow: 0 4px 24px rgba(15,35,64,0.35);
      display: flex; align-items: center; gap: 10px;
      padding: 0 20px 0 8px;
      transition: transform 0.2s, background 0.2s, box-shadow 0.2s;
      white-space: nowrap;
    }
    #joy-chat-btn:hover { background: #1a3a5c; transform: translateY(-2px); box-shadow: 0 6px 28px rgba(15,35,64,0.45); }
    #joy-btn-avatar {
      width: 40px; height: 40px; border-radius: 50%; background: #4db8b8;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    #joy-btn-avatar svg { width: 22px; height: 22px; color: #fff; }
    #joy-btn-text {
      display: flex; flex-direction: column; align-items: flex-start; gap: 1px;
    }
    #joy-btn-text-top { font-size: 10px; color: rgba(255,255,255,0.55); font-family: sans-serif; line-height: 1; }
    #joy-btn-text-bottom { font-size: 13px; color: #fff; font-weight: 700; font-family: sans-serif; line-height: 1.2; }
    #joy-chat-badge {
      position: absolute; top: -4px; right: -4px;
      background: #ef4444; color: #fff; border-radius: 50%;
      width: 18px; height: 18px; font-size: 9px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      font-family: sans-serif;
    }
    @media (max-width: 479px) {
      #joy-chat-btn { width: 56px; padding: 0; border-radius: 50%; justify-content: center; }
      #joy-btn-text { display: none; }
      #joy-btn-avatar { width: 38px; height: 38px; }
    }
    #joy-chat-panel {
      position: fixed; bottom: 24px; right: 24px; z-index: 99998;
      width: 360px; max-width: calc(100vw - 24px);
      height: 560px; max-height: calc(100svh - 80px);
      background: #fff; border-radius: 20px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.18);
      border: 1px solid #f1f5f9;
      display: flex; flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 14px;
      transform-origin: bottom right;
      transition: opacity 0.25s, transform 0.25s;
    }
    #joy-chat-panel.joy-hidden { opacity: 0; transform: scale(0.88); pointer-events: none; }
    #joy-chat-header {
      background: #0f2340; color: #fff;
      padding: 14px 18px; border-radius: 20px 20px 0 0;
      display: flex; align-items: center; justify-content: space-between;
      flex-shrink: 0;
    }
    #joy-chat-header-info { display: flex; align-items: center; gap: 12px; }
    .joy-avatar {
      width: 32px; height: 32px; border-radius: 50%;
      background: #4db8b8; color: #fff; font-weight: 700; font-size: 14px;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .joy-header-title { font-weight: 600; font-size: 14px; line-height: 1.2; }
    .joy-header-sub { font-size: 11px; color: rgba(255,255,255,0.5); }
    #joy-close-btn {
      background: none; border: none; cursor: pointer;
      color: rgba(255,255,255,0.5); padding: 4px; border-radius: 8px;
      display: flex; align-items: center;
      transition: color 0.15s;
    }
    #joy-close-btn:hover { color: #fff; }
    #joy-messages {
      flex: 1; overflow-y: auto; padding: 16px; display: flex;
      flex-direction: column; gap: 10px; min-height: 0;
    }
    .joy-welcome { text-align: center; padding: 20px 8px; }
    .joy-welcome-icon {
      width: 52px; height: 52px; border-radius: 50%;
      background: rgba(77,184,184,0.12); margin: 0 auto 10px;
      display: flex; align-items: center; justify-content: center;
    }
    .joy-welcome-title { font-weight: 600; color: #1e293b; margin-bottom: 4px; }
    .joy-welcome-sub { font-size: 12px; color: #94a3b8; line-height: 1.5; }
    .joy-chips { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; margin-top: 14px; }
    .joy-chip {
      font-size: 12px; background: #f0fafa; color: #008080;
      border: 1px solid rgba(77,184,184,0.3);
      padding: 5px 12px; border-radius: 20px; cursor: pointer;
      font-weight: 500; transition: background 0.15s;
    }
    .joy-chip:hover { background: rgba(77,184,184,0.2); }
    .joy-row { display: flex; }
    .joy-row.user { justify-content: flex-end; }
    .joy-row.assistant { justify-content: flex-start; align-items: flex-start; gap: 6px; }
    .joy-bubble {
      max-width: 80%; padding: 10px 14px; border-radius: 18px;
      line-height: 1.5; white-space: pre-wrap; word-break: break-word;
    }
    .joy-row.user .joy-bubble { background: #0f2340; color: #fff; border-bottom-right-radius: 4px; }
    .joy-row.assistant .joy-bubble {
      background: #f8fafc; color: #1e293b;
      border: 1px solid #f1f5f9; border-bottom-left-radius: 4px;
    }
    .joy-typing {
      background: #f8fafc; border: 1px solid #f1f5f9;
      border-radius: 18px; border-bottom-left-radius: 4px;
      padding: 12px 16px; display: flex; gap: 4px; align-items: center;
    }
    .joy-dot {
      width: 7px; height: 7px; border-radius: 50%; background: #4db8b8;
      animation: joy-bounce 1s infinite;
    }
    .joy-dot:nth-child(2) { animation-delay: 0.15s; }
    .joy-dot:nth-child(3) { animation-delay: 0.3s; }
    @keyframes joy-bounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-5px); }
    }
    .joy-recs-label { font-size: 11px; color: #94a3b8; font-weight: 600; padding: 0 2px; }
    .joy-rec-card {
      display: flex; align-items: center; gap: 10px;
      background: #fff; border: 1px solid #f1f5f9; border-radius: 12px;
      padding: 10px 12px; text-decoration: none; color: inherit;
      transition: border-color 0.15s, box-shadow 0.15s;
    }
    .joy-rec-card:hover { border-color: #4db8b8; box-shadow: 0 2px 8px rgba(77,184,184,0.15); }
    .joy-rec-thumb {
      width: 38px; height: 38px; border-radius: 8px; flex-shrink: 0;
      display: flex; align-items: flex-end; padding: 3px 4px;
    }
    .joy-rec-thumb span { color: #fff; font-size: 7px; font-weight: 700; line-height: 1.1; }
    .joy-rec-info { flex: 1; min-width: 0; }
    .joy-rec-name { font-weight: 600; font-size: 13px; color: #1e293b; }
    .joy-rec-reason { font-size: 11px; color: #64748b; margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .joy-rec-cat { font-size: 10px; color: #94a3b8; margin-top: 1px; }
    .joy-rec-arrow { color: #cbd5e1; flex-shrink: 0; transition: color 0.15s; }
    .joy-rec-card:hover .joy-rec-arrow { color: #008080; }
    #joy-input-area {
      padding: 10px 12px 8px; border-top: 1px solid #f1f5f9; flex-shrink: 0;
    }
    #joy-form { display: flex; gap: 8px; }
    #joy-input {
      flex: 1; border: 1px solid #e2e8f0; border-radius: 12px;
      padding: 9px 14px; font-size: 13px; outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;
      font-family: inherit; background: #fff;
    }
    #joy-input:focus { border-color: #4db8b8; box-shadow: 0 0 0 3px rgba(77,184,184,0.15); }
    #joy-send-btn {
      width: 38px; height: 38px; border-radius: 10px;
      background: #4db8b8; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: background 0.15s; color: #fff;
    }
    #joy-send-btn:hover { background: #3da8a8; }
    #joy-send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    #joy-disclaimer { font-size: 10px; color: #cbd5e1; text-align: center; margin-top: 6px; }
  `;

  var PRODUCT_COLORS = {
    nabota: '#1e3a5f', botulax: '#1e3a5f', xeomin: '#2d4a6e',
    yvoire: '#008080', rejuran: '#b8952a', rituo: '#005f5f',
  };

  var PRODUCT_CATEGORIES = {
    nabota: 'Botulinum Toxin', botulax: 'Botulinum Toxin', xeomin: 'Botulinum Toxin',
    yvoire: 'HA Filler', rejuran: 'PDRN / Polynucleotide', rituo: 'HA Filler',
  };

  // ── DOM ──────────────────────────────────────────────────────────────────────
  function init() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // Floating button
    var btn = document.createElement('button');
    btn.id = 'joy-chat-btn';
    btn.setAttribute('aria-label', '피부 고민 AI 제품 추천');
    btn.innerHTML = `
      <div id="joy-btn-avatar">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
        </svg>
      </div>
      <div id="joy-btn-text">
        <span id="joy-btn-text-top">피부 고민 AI에게</span>
        <span id="joy-btn-text-bottom">제품 추천 받아보세요</span>
      </div>
      <span id="joy-chat-badge">AI</span>
    `;
    document.body.appendChild(btn);

    // Panel
    var panel = document.createElement('div');
    panel.id = 'joy-chat-panel';
    panel.classList.add('joy-hidden');
    panel.innerHTML = `
      <div id="joy-chat-header">
        <div id="joy-chat-header-info">
          <div class="joy-avatar">J</div>
          <div>
            <div class="joy-header-title">JOY 제품 추천</div>
            <div class="joy-header-sub">피부·건강 고민을 입력하세요</div>
          </div>
        </div>
        <button id="joy-close-btn" aria-label="닫기">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div id="joy-messages"></div>
      <div id="joy-input-area">
        <form id="joy-form">
          <input id="joy-input" type="text" placeholder="피부 고민을 입력하세요..." maxlength="300" autocomplete="off"/>
          <button type="submit" id="joy-send-btn" aria-label="전송">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
            </svg>
          </button>
        </form>
        <div id="joy-disclaimer">AI 추천은 참고용이며 의학적 진단이 아닙니다.</div>
      </div>
    `;
    document.body.appendChild(panel);

    renderWelcome();

    btn.addEventListener('click', function () { openPanel(); });
    document.getElementById('joy-close-btn').addEventListener('click', function () { closePanel(); });
    document.getElementById('joy-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var val = document.getElementById('joy-input').value;
      sendMessage(val);
    });
  }

  function openPanel() {
    document.getElementById('joy-chat-btn').style.opacity = '0';
    document.getElementById('joy-chat-btn').style.pointerEvents = 'none';
    document.getElementById('joy-chat-panel').classList.remove('joy-hidden');
    setTimeout(function () { document.getElementById('joy-input').focus(); }, 120);
  }

  function closePanel() {
    document.getElementById('joy-chat-btn').style.opacity = '1';
    document.getElementById('joy-chat-btn').style.pointerEvents = '';
    document.getElementById('joy-chat-panel').classList.add('joy-hidden');
  }

  function renderWelcome() {
    var msgs = document.getElementById('joy-messages');
    var chips = SUGGESTIONS.map(function (s) {
      return '<button class="joy-chip" data-msg="' + s + '">' + s + '</button>';
    }).join('');
    msgs.innerHTML = `
      <div class="joy-welcome">
        <div class="joy-welcome-icon">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#4db8b8" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
          </svg>
        </div>
        <div class="joy-welcome-title">안녕하세요! 저는 조이예요 👋</div>
        <div class="joy-welcome-sub">피부 고민이나 건강 고민을 알려주시면<br>맞춤 제품을 추천해 드릴게요.</div>
        <div class="joy-chips">${chips}</div>
      </div>
    `;
    msgs.querySelectorAll('.joy-chip').forEach(function (chip) {
      chip.addEventListener('click', function () { sendMessage(chip.dataset.msg); });
    });
  }

  function appendMessage(role, text) {
    var msgs = document.getElementById('joy-messages');
    var welcome = msgs.querySelector('.joy-welcome');
    if (welcome) welcome.remove();

    var row = document.createElement('div');
    row.className = 'joy-row ' + role;

    if (role === 'assistant') {
      var av = document.createElement('div');
      av.className = 'joy-avatar';
      av.style.cssText = 'width:24px;height:24px;font-size:11px;margin-top:2px;';
      av.textContent = 'J';
      row.appendChild(av);
    }

    var bubble = document.createElement('div');
    bubble.className = 'joy-bubble';
    bubble.textContent = text;
    row.appendChild(bubble);
    msgs.appendChild(row);
    scrollBottom();
    return row;
  }

  function showTyping() {
    var msgs = document.getElementById('joy-messages');
    var row = document.createElement('div');
    row.className = 'joy-row assistant';
    row.id = 'joy-typing';
    var av = document.createElement('div');
    av.className = 'joy-avatar';
    av.style.cssText = 'width:24px;height:24px;font-size:11px;margin-top:2px;';
    av.textContent = 'J';
    row.appendChild(av);
    var dots = document.createElement('div');
    dots.className = 'joy-typing';
    dots.innerHTML = '<div class="joy-dot"></div><div class="joy-dot"></div><div class="joy-dot"></div>';
    row.appendChild(dots);
    msgs.appendChild(row);
    scrollBottom();
  }

  function hideTyping() {
    var t = document.getElementById('joy-typing');
    if (t) t.remove();
  }

  function renderRecommendations(recs) {
    if (!recs || !recs.length) return;
    var msgs = document.getElementById('joy-messages');

    var label = document.createElement('div');
    label.className = 'joy-recs-label';
    label.textContent = '추천 제품';
    msgs.appendChild(label);

    recs.forEach(function (rec) {
      var color = PRODUCT_COLORS[rec.id] || '#1e3a5f';
      var cat = PRODUCT_CATEGORIES[rec.id] || '';
      var url = PRODUCT_BASE_URL + rec.id;
      var card = document.createElement('a');
      card.className = 'joy-rec-card';
      card.href = url;
      card.innerHTML = `
        <div class="joy-rec-thumb" style="background:${color}"><span>${rec.name}</span></div>
        <div class="joy-rec-info">
          <div class="joy-rec-name">${rec.name}</div>
          <div class="joy-rec-reason">${rec.reason}</div>
          <div class="joy-rec-cat">${cat}</div>
        </div>
        <svg class="joy-rec-arrow" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      `;
      msgs.appendChild(card);
    });
    scrollBottom();
  }

  function scrollBottom() {
    var msgs = document.getElementById('joy-messages');
    msgs.scrollTop = msgs.scrollHeight;
  }

  function sendMessage(text) {
    if (!text || !text.trim() || loading) return;
    if (!API_URL) {
      appendMessage('assistant', '⚠️ 챗봇 API 주소가 설정되지 않았습니다.\nShopify 테마에서 JOYCHAT_API_URL을 확인해 주세요.');
      return;
    }
    var trimmed = text.trim();
    document.getElementById('joy-input').value = '';
    document.getElementById('joy-send-btn').disabled = true;

    appendMessage('user', trimmed);
    history.push({ role: 'user', content: trimmed });
    loading = true;
    showTyping();

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: trimmed, history: history.slice(0, -1) }),
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        hideTyping();
        var replyText = data.error || data.text || '죄송합니다. 다시 시도해 주세요.';
        appendMessage('assistant', replyText);
        history.push({ role: 'assistant', content: replyText });
        if (data.recommendations) renderRecommendations(data.recommendations);
      })
      .catch(function () {
        hideTyping();
        appendMessage('assistant', '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      })
      .finally(function () {
        loading = false;
        document.getElementById('joy-send-btn').disabled = false;
        document.getElementById('joy-input').focus();
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
