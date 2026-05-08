/* ============================================
   PasteBoard — script.js
   ============================================ */

(function () {
  'use strict';

  /* ---- State ---- */
  let currentDataURL = '';
  let currentMime = '';
  let currentFileName = '';
  const sessionImages = [];

  /* ---- DOM refs ---- */
  const dropZone       = document.getElementById('dropZone');
  const fileInput      = document.getElementById('fileInput');
  const uploadBtn      = document.getElementById('uploadBtn');
  const uploadSection  = document.getElementById('uploadSection');
  const resultSection  = document.getElementById('resultSection');
  const previewImg     = document.getElementById('previewImg');
  const previewStats   = document.getElementById('previewStats');
  const fileInfo       = document.getElementById('fileInfo');
  const imageDims      = document.getElementById('imageDimensions');
  const resetBtn       = document.getElementById('resetBtn');
  const downloadBtn    = document.getElementById('downloadBtn');
  const copyUrlBtn     = document.getElementById('copyUrlBtn');
  const historySection = document.getElementById('historySection');
  const historyGrid    = document.getElementById('historyGrid');
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');
  const toast          = document.getElementById('toast');
  const toastMsg       = document.getElementById('toastMsg');

  /* ---- Code blocks ---- */
  const codeBlocks = {
    html:     document.getElementById('code-html'),
    markdown: document.getElementById('code-markdown'),
    css:      document.getElementById('code-css'),
    base64:   document.getElementById('code-base64'),
    url:      document.getElementById('code-url'),
  };

  /* ========================================
     UPLOAD HANDLERS
  ======================================== */

  uploadBtn.addEventListener('click', () => fileInput.click());
  dropZone.addEventListener('click', (e) => {
    if (e.target === uploadBtn) return;
    fileInput.click();
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files[0]) processFile(fileInput.files[0]);
    fileInput.value = '';
  });

  /* Drag & Drop */
  let dragCounter = 0;

  document.addEventListener('dragenter', (e) => {
    e.preventDefault();
    dragCounter++;
    if (e.dataTransfer.types.includes('Files')) {
      dropZone.classList.add('drag-over');
    }
  });

  document.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dragCounter--;
    if (dragCounter <= 0) {
      dragCounter = 0;
      dropZone.classList.remove('drag-over');
    }
  });

  document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  });

  document.addEventListener('drop', (e) => {
    e.preventDefault();
    dragCounter = 0;
    dropZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    } else if (file) {
      showToast('⚠ Please drop an image file.', 'warn');
    }
  });

  /* Clipboard paste */
  document.addEventListener('paste', (e) => {
    const items = Array.from(e.clipboardData?.items || []);
    const imageItem = items.find(i => i.type.startsWith('image/'));
    if (imageItem) {
      const file = imageItem.getAsFile();
      if (file) processFile(file);
    }
  });

  /* Reset */
  resetBtn.addEventListener('click', () => {
    resultSection.style.display = 'none';
    uploadSection.style.display = '';
    currentDataURL = '';
    currentMime = '';
    currentFileName = '';
  });

  /* Download */
  downloadBtn.addEventListener('click', () => {
    if (!currentDataURL) return;
    const a = document.createElement('a');
    a.href = currentDataURL;
    a.download = currentFileName || 'image';
    a.click();
  });

  /* Copy full Data URL */
  copyUrlBtn.addEventListener('click', () => {
    copyToClipboard(currentDataURL, copyUrlBtn);
  });

  /* Clear history */
  clearHistoryBtn.addEventListener('click', () => {
    sessionImages.length = 0;
    historyGrid.innerHTML = '';
    historySection.style.display = 'none';
  });

  /* ========================================
     PROCESS FILE
  ======================================== */

  function processFile(file) {
    if (!file.type.startsWith('image/')) {
      showToast('⚠ File is not an image.', 'warn');
      return;
    }

    const MAX_SIZE_MB = 20;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      showToast(`⚠ File exceeds ${MAX_SIZE_MB}MB limit.`, 'warn');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataURL = e.target.result;
      currentDataURL = dataURL;
      currentMime = file.type;
      currentFileName = file.name;

      // Decode image to get dimensions
      const img = new Image();
      img.onload = () => {
        render(img, dataURL, file);
      };
      img.src = dataURL;
    };
    reader.readAsDataURL(file);
  }

  /* ========================================
     RENDER RESULTS
  ======================================== */

  function render(img, dataURL, file) {
    const base64 = dataURL.split(',')[1];
    const mime = file.type;
    const name = file.name;
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    const rawKB = (file.size / 1024).toFixed(1);
    const b64KB = (base64.length * 0.75 / 1024).toFixed(1);
    const rawMB = (file.size / 1048576).toFixed(2);

    /* Preview */
    previewImg.src = dataURL;
    imageDims.textContent = `${w} × ${h}px`;

    /* File info */
    fileInfo.innerHTML = `
      <strong>${escHtml(name)}</strong>
      &nbsp;·&nbsp; ${mime}
      &nbsp;·&nbsp; ${w}×${h}
      &nbsp;·&nbsp; ${rawKB} KB
    `;

    /* Stats */
    const sizeClass = parseFloat(rawMB) > 1 ? 'warn' : 'ok';
    previewStats.innerHTML = `
      <div class="stat-row">
        <span class="stat-label">Type</span>
        <span class="stat-value">${mime}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Dimensions</span>
        <span class="stat-value">${w} × ${h} px</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">File size</span>
        <span class="stat-value ${sizeClass}">${rawKB} KB</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Base64 size</span>
        <span class="stat-value ${parseFloat(b64KB) > 1000 ? 'warn' : ''}">${b64KB} KB</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Aspect ratio</span>
        <span class="stat-value">${gcd(w, h) ? `${w/gcd(w,h)}:${h/gcd(w,h)}` : '—'}</span>
      </div>
    `;

    /* Embed codes */
    codeBlocks.html.textContent     = `<img src="${dataURL}" alt="${escAttr(name)}" width="${w}" height="${h}" />`;
    codeBlocks.markdown.textContent = `![${escMd(name)}](${dataURL})`;
    codeBlocks.css.textContent      = `.element {\n  background-image: url("${dataURL}");\n  background-size: cover;\n  background-position: center;\n  width: ${w}px;\n  height: ${h}px;\n}`;
    codeBlocks.base64.textContent   = base64;
    codeBlocks.url.textContent      = dataURL;

    /* Show result */
    uploadSection.style.display = 'none';
    resultSection.style.display = '';

    /* Add to history */
    addToHistory(dataURL, name, w, h);

    /* Switch to first tab */
    activateTab('html');
  }

  /* ========================================
     TABS
  ======================================== */

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activateTab(btn.dataset.tab);
    });
  });

  function activateTab(id) {
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === id);
    });
    document.querySelectorAll('.tab-panel').forEach(p => {
      p.classList.toggle('active', p.id === `tab-${id}`);
    });
  }

  /* ========================================
     COPY BUTTONS
  ======================================== */

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.dataset.target;
      const el = document.getElementById(targetId);
      if (el) copyToClipboard(el.textContent, btn);
    });
  });

  function copyToClipboard(text, btn) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      if (btn) {
        const original = btn.innerHTML;
        btn.innerHTML = `<svg viewBox="0 0 20 20" fill="none" width="14" height="14"><path d="M4 10l4 4 8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Copied!`;
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = original;
          btn.classList.remove('copied');
        }, 1800);
      }
      showToast('Copied to clipboard!');
    }).catch(() => {
      /* Fallback */
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('Copied to clipboard!');
    });
  }

  /* ========================================
     HISTORY
  ======================================== */

  function addToHistory(dataURL, name, w, h) {
    // Avoid duplicates
    if (sessionImages.find(i => i.url === dataURL)) return;

    sessionImages.push({ url: dataURL, name, w, h });
    if (sessionImages.length > 12) sessionImages.shift();

    renderHistory();
  }

  function renderHistory() {
    if (sessionImages.length < 2) {
      historySection.style.display = 'none';
      return;
    }

    historySection.style.display = '';
    historyGrid.innerHTML = '';

    sessionImages.slice().reverse().forEach((item) => {
      const div = document.createElement('div');
      div.className = 'history-thumb';
      div.innerHTML = `
        <img src="${item.url}" alt="${escHtml(item.name)}" loading="lazy" />
        <div class="history-thumb-overlay">${item.w}×${item.h}<br>${escHtml(item.name.slice(0, 14))}</div>
      `;
      div.addEventListener('click', () => {
        currentDataURL = item.url;
        currentMime = 'image/' + (item.url.split(';')[0].split('/')[1] || 'png');
        currentFileName = item.name;

        const img = new Image();
        img.onload = () => {
          const fakeFile = new File([], item.name, { type: currentMime });
          Object.defineProperty(fakeFile, 'size', { value: Math.round(item.url.length * 0.75) });
          render(img, item.url, { name: item.name, type: currentMime, size: Math.round(item.url.length * 0.75) });
        };
        img.src = item.url;
      });
      historyGrid.appendChild(div);
    });
  }

  /* ========================================
     TOAST
  ======================================== */

  let toastTimer;

  function showToast(msg, type) {
    toastMsg.textContent = msg;
    toast.style.borderColor = type === 'warn' ? 'rgba(255,170,0,0.4)' : 'rgba(57,255,122,0.3)';
    toast.style.color = type === 'warn' ? '#ffaa00' : 'var(--accent3)';
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
  }

  /* ========================================
     UTILS
  ======================================== */

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escAttr(str) {
    return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function escMd(str) {
    return String(str).replace(/[[\]()!]/g, '\\$&');
  }

  function gcd(a, b) {
    while (b) { [a, b] = [b, a % b]; }
    return a;
  }

  /* ========================================
     KEYBOARD SHORTCUT HINT
  ======================================== */

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
      // handled by paste event
    }
    // Esc = reset if result is showing
    if (e.key === 'Escape' && resultSection.style.display !== 'none') {
      resetBtn.click();
    }
  });

})();
