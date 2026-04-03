/* Qpedia shared JS — mobile nav hamburger toggle */
document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.querySelector('.qp-nav-hamburger');
  var nav = document.querySelector('.qp-nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', function () {
    var open = nav.classList.toggle('mobile-open');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    hamburger.innerHTML = open ? '&#10005;' : '&#9776;';
  });

  // Close menu when a nav link is clicked
  nav.querySelectorAll('.qp-nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('mobile-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.innerHTML = '&#9776;';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target)) {
      nav.classList.remove('mobile-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.innerHTML = '&#9776;';
    }
  });
});
