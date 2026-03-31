/* =============================================================
   QPEDIA — SHARED FLOATING SEARCH OVERLAY — JS
   Include before </body> on every page.
   ============================================================= */
(function () {
  'use strict';

  /* ── Inject FAB + Overlay HTML ──────────────────────────────── */
  const template = `
    <!-- Floating Search Button -->
    <button class="qp-search-fab" id="qp-search-fab" aria-label="Open search">
      <span class="qp-search-fab-icon">🔍</span>
      <span class="qp-search-fab-label">Search Knowledge Hub</span>
    </button>

    <!-- Full-Screen Search Overlay -->
    <div class="qp-search-overlay" id="qp-search-overlay" role="dialog" aria-modal="true" aria-label="Global search">
      <div class="qp-overlay-inner">
        <p class="qp-overlay-label">Search across 500+ peer-reviewed entries</p>

        <div class="qp-overlay-search-wrap">
          <span class="qp-overlay-search-icon">🔍</span>
          <input
            type="text"
            id="qp-overlay-input"
            class="qp-overlay-input"
            placeholder="Ask anything about quantum technologies…"
            autocomplete="off"
            aria-label="Global search input"
          />
          <div class="qp-overlay-right">
            <span class="qp-overlay-ai-chip">AI</span>
            <button class="qp-overlay-close" id="qp-overlay-close" aria-label="Close search">✕</button>
          </div>
        </div>

        <p class="qp-overlay-hint">Press <kbd>Enter</kbd> to search &nbsp;·&nbsp; <kbd>Esc</kbd> to dismiss</p>

        <div class="qp-overlay-trending">
          <button class="qp-overlay-chip" data-query="Quantum Error Correction">Quantum Error Correction</button>
          <button class="qp-overlay-chip" data-query="India NQM Progress">India NQM</button>
          <button class="qp-overlay-chip" data-query="TRL 7 Quantum Hardware">TRL 7 Hardware</button>
          <button class="qp-overlay-chip" data-query="QKD Supply Chain">QKD Supply Chain</button>
          <button class="qp-overlay-chip" data-query="Photonic qubit overview">Photonic Qubits</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', template);

  /* ── DOM refs ────────────────────────────────────────────────── */
  const fab = document.getElementById('qp-search-fab');
  const overlay = document.getElementById('qp-search-overlay');
  const input = document.getElementById('qp-overlay-input');
  const closeBtn = document.getElementById('qp-overlay-close');
  const chips = overlay.querySelectorAll('.qp-overlay-chip');

  /* ── Open ────────────────────────────────────────────────────── */
  function openSearch() {
    overlay.classList.add('is-open');
    // slight delay so transition feels responsive, not instant
    setTimeout(function () { input.focus(); }, 80);
  }

  /* ── Close ───────────────────────────────────────────────────── */
  function closeSearch() {
    overlay.classList.remove('is-open');
    input.value = '';
  }

  /* ── Events ──────────────────────────────────────────────────── */
  fab.addEventListener('click', openSearch);
  closeBtn.addEventListener('click', closeSearch);

  // Click outside inner panel → close
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeSearch();
  });

  // Keyboard
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSearch();
    // Cmd/Ctrl + K → open (standard shortcut)
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      overlay.classList.contains('is-open') ? closeSearch() : openSearch();
    }
  });

  // Enter → navigate to search results
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && this.value.trim() !== '') {
      window.location.href = '02_search_results.html';
    }
  });

  // Trending chips → pre-fill and focus
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      input.value = this.dataset.query;
      input.focus();
    });
  });

})();
