document.addEventListener('DOMContentLoaded', () => {
  // Create Widget Container
  const widgetContainer = document.createElement('div');
  widgetContainer.className = 'novox-chat-widget';

  // Chat Window HTML
  const chatWindowHTML = `
    <!-- Teaser Bubble -->
    <div class="novox-chat-teaser" id="novoxChatTeaser">
      <div class="novox-teaser-header">
        <img src="assets/imgs/logo/novox_chat_logo.png" alt="Novox">
        <h4>Need help?</h4>
      </div>
      <p>Ask Novox AI anything.</p>
      <div class="novox-teaser-arrow"></div>
    </div>

    <!-- Main Window -->
    <div class="novox-chat-window" id="novoxChatWindow">
      <div class="novox-chat-header">
        <div class="novox-chat-header-left">
          <div class="novox-chat-header-icon">
            <img src="assets/imgs/logo/novox_chat_logo.png" alt="Novox">
          </div>
          <div class="novox-chat-header-text">
            <h3>Novox AI</h3>
            <div class="novox-chat-status">
              <span class="novox-status-dot">●</span>
              <span class="novox-status-text">Online</span>
            </div>
          </div>
        </div>
        <div class="novox-chat-actions">
          <button class="novox-chat-btn" id="novoxChatRefresh" aria-label="Reset chat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          </button>
          <button class="novox-chat-btn novox-chat-close" id="novoxChatClose" aria-label="Close chat">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
        </div>
      </div>
      
      <div class="novox-chat-messages" id="novoxChatMessages">
        <div class="novox-empty-state" id="novoxEmptyState">
          <div class="novox-greeting-title" id="novoxGreetingTitle"></div>
          <div class="novox-greeting-subtitle">How can I help?</div>
          <div class="novox-quick-cards">
            <div class="novox-card" data-action="Services">
              <div class="novox-card-icon">⚡</div>
              <div class="novox-card-title">Services</div>
              <div class="novox-card-desc">What services do you provide?</div>
            </div>
            <div class="novox-card" data-action="About Us">
              <div class="novox-card-icon">ℹ️</div>
              <div class="novox-card-title">About Us</div>
              <div class="novox-card-desc">What is Novox Core?</div>
            </div>
            <div class="novox-card" data-action="Contact">
              <div class="novox-card-icon">📞</div>
              <div class="novox-card-title">Contact</div>
              <div class="novox-card-desc">How can I contact you?</div>
            </div>
          </div>
        </div>
      </div>

      <div class="novox-chat-input-area">
        <div class="novox-chat-input-wrapper">
          <input type="text" class="novox-chat-input" id="novoxChatInput" placeholder="Ask me anything..." autocomplete="off">
          <button class="novox-chat-send" id="novoxChatSend" aria-label="Send message">
            <svg viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Toggle Button -->
    <div class="novox-chat-toggle" id="novoxChatToggle" aria-label="Toggle Chat">
      <div class="novox-flash-ring" id="novoxFlashRing"></div>
      <div class="novox-chat-toggle-glow" id="novoxToggleGlow"></div>
      <img src="assets/imgs/logo/novox_chat_logo.png" alt="Novox" id="novoxToggleIcon">
    </div>
  `;

  widgetContainer.innerHTML = chatWindowHTML;
  document.body.appendChild(widgetContainer);

  const toggleBtn = document.getElementById('novoxChatToggle');
  const toggleIcon = document.getElementById('novoxToggleIcon');
  const toggleGlow = document.getElementById('novoxToggleGlow');
  const chatWindow = document.getElementById('novoxChatWindow');
  const closeBtn = document.getElementById('novoxChatClose');
  const refreshBtn = document.getElementById('novoxChatRefresh');
  const inputEl = document.getElementById('novoxChatInput');
  const sendBtn = document.getElementById('novoxChatSend');
  const messagesEl = document.getElementById('novoxChatMessages');
  const emptyState = document.getElementById('novoxEmptyState');
  const greetingTitle = document.getElementById('novoxGreetingTitle');
  const teaser = document.getElementById('novoxChatTeaser');
  const flashRing = document.getElementById('novoxFlashRing');

  let isOpen = false;

  // Teaser logic
  setTimeout(() => {
    if (!isOpen) teaser.classList.add('show');
    setTimeout(() => teaser.classList.remove('show'), 6000);
  }, 2000);

  toggleBtn.addEventListener('mouseenter', () => {
    if (!isOpen) teaser.classList.add('show');
  });
  toggleBtn.addEventListener('mouseleave', () => {
    if (!isOpen) teaser.classList.remove('show');
  });

  // Typewriter effect
  const titleText = "Hi 👋 I'm Novox AI";
  let i = 0;
  function typeWriter() {
    if (i < titleText.length) {
      greetingTitle.innerHTML += titleText.charAt(i);
      i++;
      setTimeout(typeWriter, 40);
    }
  }

  // Toggle chat window
  let hasOpened = false;
  
  function openChat() {
    isOpen = true;
    chatWindow.classList.add('active');
    toggleBtn.classList.add('open-state');
    toggleIcon.outerHTML = '<svg id="novoxToggleIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
    toggleGlow.style.display = 'none';
    teaser.classList.remove('show');
    setTimeout(() => inputEl.focus(), 300);
    
    if (!hasOpened) {
      hasOpened = true;
      greetingTitle.innerHTML = "";
      i = 0;
      typeWriter();
    }
  }

  function closeChat() {
    isOpen = false;
    chatWindow.classList.remove('active');
    toggleBtn.classList.remove('open-state');
    const svgIcon = document.getElementById('novoxToggleIcon');
    if (svgIcon) {
      svgIcon.outerHTML = '<img src="assets/imgs/logo/novox_chat_logo.png" alt="Novox" id="novoxToggleIcon">';
    }
    toggleGlow.style.display = 'block';
  }

  toggleBtn.addEventListener('click', () => {
    if (isOpen) closeChat();
    else openChat();
  });

  closeBtn.addEventListener('click', closeChat);

  refreshBtn.addEventListener('click', () => {
    Array.from(messagesEl.children).forEach(child => {
      if (child.id !== 'novoxEmptyState') {
        child.remove();
      }
    });
    emptyState.style.display = 'flex';
  });

  document.querySelectorAll('.novox-card').forEach(card => {
    card.addEventListener('click', () => {
      const action = card.getAttribute('data-action');
      let text = "";
      if (action === "Services") text = "What services do you provide?";
      if (action === "About Us") text = "What is Novox Core?";
      if (action === "Contact") text = "How can I contact you?";
      sendMessage(text);
    });
  });

  const sendMessage = (customText = null, isRetry = false) => {
    const text = typeof customText === 'string' ? customText : inputEl.value.trim();
    if (!text) return;

    emptyState.style.display = 'none';
    
    if (!isRetry) {
      appendMessage(text, 'user');
    }
    
    inputEl.value = '';

    const typingId = showTypingIndicator();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000); // 90s timeout

    const API_BASE_URL = 'https://novoxcore-bot-backend.onrender.com';
    fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question: text }),
      signal: controller.signal
    })
    .then(async response => {
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      removeTypingIndicator(typingId);
      appendMessage(data.answer || data.response || data.message || "Sorry, I couldn't understand that.", 'bot');
    })
    .catch(error => {
      removeTypingIndicator(typingId);
      console.error('Chatbot Fetch Error:', error);
      appendErrorMessage("Couldn't get a response.", text);
    });
  };

  function appendErrorMessage(text, retryText) {
    const wrapper = document.createElement('div');
    wrapper.className = `novox-message-wrapper bot`;

    const avatar = document.createElement('div');
    avatar.className = `novox-avatar bot`;
    avatar.style.background = 'rgba(239, 68, 68, 0.2)';
    avatar.style.border = '1px solid rgba(239, 68, 68, 0.3)';
    avatar.style.display = 'flex';
    avatar.style.alignItems = 'center';
    avatar.style.justifyContent = 'center';
    avatar.innerHTML = `<span style="font-size:12px;">⚠️</span>`;

    const msgDiv = document.createElement('div');
    msgDiv.className = `novox-message`;
    msgDiv.style.border = '1px solid rgba(239, 68, 68, 0.2)';
    
    msgDiv.innerHTML = text;

    const retryBtn = document.createElement('button');
    retryBtn.innerHTML = '↻ Try Again';
    retryBtn.style.marginTop = '10px';
    retryBtn.style.padding = '6px 12px';
    retryBtn.style.background = 'rgba(255, 255, 255, 0.1)';
    retryBtn.style.color = '#fff';
    retryBtn.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    retryBtn.style.borderRadius = '6px';
    retryBtn.style.fontSize = '12px';
    retryBtn.style.cursor = 'pointer';
    
    retryBtn.onclick = () => {
       wrapper.remove();
       sendMessage(retryText, true);
    };

    msgDiv.appendChild(document.createElement('br'));
    msgDiv.appendChild(retryBtn);

    wrapper.appendChild(avatar);
    wrapper.appendChild(msgDiv);

    messagesEl.appendChild(wrapper);
    scrollToBottom();
  }

  sendBtn.addEventListener('click', sendMessage);
  inputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  function appendMessage(text, sender) {
    const wrapper = document.createElement('div');
    wrapper.className = `novox-message-wrapper ${sender}`;

    const avatar = document.createElement('div');
    avatar.className = `novox-avatar ${sender}`;
    if (sender === 'user') {
      avatar.textContent = '👤';
    } else {
      avatar.innerHTML = `<img src="assets/imgs/logo/novox_chat_logo.png" alt="Novox">`;
    }

    const msgDiv = document.createElement('div');
    msgDiv.className = `novox-message`;
    
    // Comprehensive markdown formatting for all questions
    let safeText = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    // Bold
    safeText = safeText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Bullet points
    safeText = safeText.replace(/(?:\n|^)\s*[\*\-]\s+(.*)/g, '<br>&bull; $1');
    
    // Italic
    safeText = safeText.replace(/\*([^\*\s][^\*]*[^\*\s]|[^\*\s])\*/g, '<em>$1</em>');
    safeText = safeText.replace(/\b_([^_]+)_\b/g, '<em>$1</em>');
    
    // Headers
    safeText = safeText.replace(/(?:\n|^)###+\s+(.*)/g, '<br><br><strong>$1</strong>');
    safeText = safeText.replace(/(?:\n|^)##\s+(.*)/g, '<br><br><strong>$1</strong>');
    safeText = safeText.replace(/(?:\n|^)#\s+(.*)/g, '<br><br><strong>$1</strong>');
    
    // Links
    safeText = safeText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color:#007BFF;text-decoration:underline;">$1</a>');
    
    // Newlines
    safeText = safeText.replace(/\n/g, '<br>');
    
    // Cleanup
    safeText = safeText.replace(/^(?:<br>\s*)+/, '');
    safeText = safeText.replace(/(?:<br>\s*){3,}/g, '<br><br>');
    
    msgDiv.innerHTML = safeText;

    if (sender === 'user') {
      wrapper.appendChild(msgDiv);
      wrapper.appendChild(avatar);
    } else {
      wrapper.appendChild(avatar);
      wrapper.appendChild(msgDiv);
    }

    messagesEl.appendChild(wrapper);
    scrollToBottom();
  }

  function showTypingIndicator() {
    const id = 'typing-' + Date.now();
    const wrapper = document.createElement('div');
    wrapper.className = 'novox-message-wrapper bot';
    wrapper.id = id;

    const avatar = document.createElement('div');
    avatar.className = 'novox-avatar bot';
    avatar.innerHTML = `<img src="assets/imgs/logo/novox_chat_logo.png" alt="Novox">`;

    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator-wrapper';
    indicator.style.display = 'flex';
    indicator.style.alignItems = 'center';

    const dots = document.createElement('div');
    dots.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    
    const textSpan = document.createElement('span');
    textSpan.className = 'typing-text';
    textSpan.style.marginLeft = '10px';
    textSpan.style.fontSize = '13px';
    textSpan.style.color = '#ccc';
    textSpan.textContent = 'Novox AI is thinking...';

    indicator.appendChild(dots);
    indicator.appendChild(textSpan);

    const timer1 = setTimeout(() => { textSpan.textContent = "Preparing response..."; }, 20000);
    const timer2 = setTimeout(() => { textSpan.textContent = "Almost there..."; }, 45000);
    
    wrapper.dataset.timer1 = timer1;
    wrapper.dataset.timer2 = timer2;

    wrapper.appendChild(avatar);
    wrapper.appendChild(indicator);
    
    messagesEl.appendChild(wrapper);
    scrollToBottom();
    return id;
  }

  function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) {
      clearTimeout(el.dataset.timer1);
      clearTimeout(el.dataset.timer2);
      el.remove();
    }
  }

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
});
