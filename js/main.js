/* ── MOBILE MENU ── */

const hamburgerBtn = document.getElementById('hamburgerBtn');
const overlay = document.getElementById('mobileOverlay');

function openMenu() {
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  hamburgerBtn.setAttribute('aria-expanded', 'true');
  hamburgerBtn.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  hamburgerBtn.classList.remove('is-open');
  document.body.style.overflow = '';
}

// Toggle open/close on hamburger click
hamburgerBtn.addEventListener('click', function () {
  overlay.classList.contains('open') ? closeMenu() : openMenu();
});

// Close when tapping the dark backdrop
overlay.addEventListener('click', function (e) {
  if (e.target === overlay) closeMenu();
});

// Close on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeMenu();
});

// Auto-close when resizing back to desktop width
window.addEventListener('resize', function () {
  if (window.innerWidth >= 768) closeMenu();
});

/* ── CAROUSEL ── */

(function () {
  const carousel = document.querySelector('.carousel');
  const track = document.querySelector('.track');

  if (!carousel || !track) return;

  // Clone once — JS owns the duplicate, not the HTML
  const clone = track.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  carousel.appendChild(clone);

  // Position both tracks side by side via transform
  const SPEED = 50; // pixels per second — only value to change
  let offset = 0;
  let lastTime = null;

  function tick(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const delta = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    const trackWidth = track.offsetWidth;

    offset += SPEED * delta;
    if (offset >= trackWidth) offset -= trackWidth;

    // Both tracks shift left by the same amount —
    // flex layout keeps them side by side naturally
    track.style.transform = `translateX(-${offset}px)`;
    clone.style.transform = `translateX(-${offset}px)`;

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
