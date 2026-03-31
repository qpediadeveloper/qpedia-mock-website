/* ============================================================
   QPEDIA SHARED TOUR — shared-tour.js
   Drop-in guided step highlight for prototype pages.
   Usage: add class="qp-step-1" (or any digit) to one element.
   ============================================================ */

(function () {
  'use strict';

  function init() {
    // Find the one element whose class includes qp-step-N
    var stepEl = document.querySelector('[class*="qp-step-"]');
    if (!stepEl) return;

    // Extract the step number from the class list
    var stepNum = '1';
    var classes = stepEl.className.split(/\s+/);
    for (var i = 0; i < classes.length; i++) {
      var m = classes[i].match(/^qp-step-(\d+)$/);
      if (m) { stepNum = m[1]; break; }
    }

    // Build the overlay
    var overlay = document.createElement('div');
    overlay.className = 'qp-tour-overlay';
    overlay.innerHTML =
      '<div class="qp-tour-corner qp-tour-tl"></div>' +
      '<div class="qp-tour-corner qp-tour-tr"></div>' +
      '<div class="qp-tour-corner qp-tour-bl"></div>' +
      '<div class="qp-tour-corner qp-tour-br"></div>' +
      '<div class="qp-tour-badge">' + stepNum + '</div>';
    document.body.appendChild(overlay);

    // Position overlay flush over the target element + small padding
    var PAD = 5;
    function reposition() {
      var r = stepEl.getBoundingClientRect();
      overlay.style.top = (r.top - PAD) + 'px';
      overlay.style.left = (r.left - PAD) + 'px';
      overlay.style.width = (r.width + PAD * 2) + 'px';
      overlay.style.height = (r.height + PAD * 2) + 'px';
    }

    reposition();
    window.addEventListener('scroll', reposition, { passive: true });
    window.addEventListener('resize', reposition, { passive: true });

    // Scroll to element if it is outside the visible area
    var r = stepEl.getBoundingClientRect();
    if (r.top < 0 || r.bottom > window.innerHeight) {
      stepEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Fade in after a short delay so the page renders first
    setTimeout(function () {
      overlay.classList.add('qp-tour-visible');
    }, 450);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
