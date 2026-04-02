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

/* ── EMAIL COPY TO CLIPBOARD ── */

(function () {
  const EMAIL = 'ericolebusiness@gmail.com';

  function showTooltip(x, y) {
    const tip = document.createElement('div');
    tip.className = 'copy-tooltip';
    tip.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#22c55e" viewBox="0 0 16 16">
        <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.046z"/>
      </svg>
      Copied!
    `;
    tip.style.left = `${x}px`;
    tip.style.top = `${y}px`;
    document.body.appendChild(tip);

    // Trigger fade-up animation next frame
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        tip.classList.add('copy-tooltip--show');
      });
    });

    setTimeout(function () {
      tip.classList.add('copy-tooltip--hide');
      tip.addEventListener('transitionend', function () {
        tip.remove();
      });
    }, 1200);
  }

  document.querySelectorAll('.email-copy').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      navigator.clipboard.writeText(EMAIL).then(function () {
        showTooltip(e.clientX, e.clientY);
      });
    });
  });
})();

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
