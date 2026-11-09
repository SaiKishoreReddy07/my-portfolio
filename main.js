// Menu, active section, and scroll animations. No libraries.
(function () {
  var nav = document.querySelector('.nav');
  var button = nav.querySelector('.menu-btn');
  var links = nav.querySelectorAll('.menu a');

  // Phone menu
  function setMenu(open) {
    nav.classList.toggle('open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  button.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  links.forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('click', function (e) { if (!nav.contains(e.target)) setMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); button.focus(); }
  });

  // Projects row: arrow buttons scroll one card at a time
  var row = document.getElementById('projects-row');
  var arrows = document.querySelector('.scroll-btns');
  if (row && arrows) {
    var prev = arrows.querySelector('[data-scroll="prev"]');
    var next = arrows.querySelector('[data-scroll="next"]');
    var smooth = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    var step = function () {
      var card = row.querySelector('li');
      return card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(row).columnGap || 0) : row.clientWidth;
    };
    var updateArrows = function () {
      var max = row.scrollWidth - row.clientWidth;
      arrows.hidden = max <= 2;
      prev.disabled = row.scrollLeft <= 2;
      next.disabled = row.scrollLeft >= max - 2;
    };
    prev.addEventListener('click', function () { row.scrollBy({ left: -step(), behavior: smooth }); });
    next.addEventListener('click', function () { row.scrollBy({ left: step(), behavior: smooth }); });
    row.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    updateArrows();
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  if (!('IntersectionObserver' in window)) return;

  // Mark the menu link for the section in view
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (a) {
        if (a.getAttribute('href') === '#' + entry.target.id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  links.forEach(function (a) {
    var section = document.querySelector(a.getAttribute('href'));
    if (section) spy.observe(section);
  });

  // Show the name in the bar once the header has scrolled away
  new IntersectionObserver(function (entries) {
    nav.classList.toggle('scrolled', !entries[0].isIntersecting);
  }, { rootMargin: '-64px 0px 0px 0px' }).observe(document.getElementById('about'));

  if (!document.documentElement.classList.contains('motion')) return;

  // Fade items in as they scroll into view
  var items = document.querySelectorAll(
    '.hero h1, .job-title, .intro, .hero .social, .headshot-wrap, .section h2, .job, .skills-grid > li, .projects-row > li, .certs-grid > li'
  );
  var reveal = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('in'); reveal.unobserve(entry.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
  items.forEach(function (el) {
    var index = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.setProperty('--delay', Math.min(index, 4) * 80 + 'ms');
    el.classList.add('reveal');
    reveal.observe(el);
  });

  // Fill the experience timeline as you scroll through it
  var timeline = document.querySelector('.timeline');
  var pending = false;
  function fill() {
    pending = false;
    var r = timeline.getBoundingClientRect();
    var p = (window.innerHeight * 0.65 - r.top) / r.height;
    timeline.style.setProperty('--progress', Math.max(0, Math.min(1, p)).toFixed(3));
  }
  function onScroll() { if (!pending) { pending = true; requestAnimationFrame(fill); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  fill();
})();
