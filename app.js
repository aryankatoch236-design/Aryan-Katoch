(function () {
  'use strict';

  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Footer year
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Enquiry form: send by email through FormSubmit, with a WhatsApp fallback
  var form = document.getElementById('lead-form');
  var status = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var submit = form.querySelector('button[type="submit"]');
    var name = form.elements['Name'].value.trim();
    var biz = form.elements['Business'].value.trim();
    var phone = form.elements['Phone'].value.trim();
    var original = submit.textContent;

    submit.disabled = true;
    submit.textContent = 'Sending...';
    status.className = 'status';
    status.textContent = '';

    fetch('https://formsubmit.co/ajax/aryankatoch236@gmail.com', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then(function () {
        status.textContent = 'Thanks, ' + name + '. We have your details and will reply within a day.';
        form.reset();
      })
      .catch(function () {
        var msg = 'Hi Aryan, I am ' + name + ' from ' + biz + '. I would like a free marketing audit. My number: ' + phone;
        status.className = 'status err';
        status.innerHTML = 'The form could not be sent. Please <a href="https://wa.me/918894402974?text=' +
          encodeURIComponent(msg) + '">send the same details on WhatsApp</a> or email aryankatoch236@gmail.com.';
      })
      .finally(function () {
        submit.disabled = false;
        submit.textContent = original;
      });
  });
})();

// Reveal sections as they scroll into view (also catches anything skipped by a fast scroll or anchor jump)
(function () {
  var pending = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  function show(el, delay) {
    el.style.transitionDelay = delay + 'ms';
    el.classList.add('in');
    setTimeout(function () { el.classList.add('settled'); el.style.transitionDelay = ''; }, 1200);
  }
  var ticking = false;
  function check() {
    ticking = false;
    var limit = window.innerHeight * 0.94, batch = 0;
    pending = pending.filter(function (el) {
      if (el.getBoundingClientRect().top < limit) { show(el, Math.min(batch++, 4) * 90); return false; }
      return true;
    });
    if (!pending.length) window.removeEventListener('scroll', onScroll);
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(check); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  check();
})();

// Copy email button
(function () {
  document.querySelectorAll('.copy[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var txt = b.getAttribute('data-copy');
      var done = function () { b.textContent = 'Copied'; setTimeout(function () { b.textContent = 'Copy'; }, 1800); };
      if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, function () {});
    });
  });
})();

// Gentle 3D tilt on cards (mouse devices only, skipped for reduced motion)
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll('.row, .people article, .pillar').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      if (!el.classList.contains('settled') && el.classList.contains('reveal')) return;
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = 'perspective(900px) rotateY(' + (x * 7).toFixed(2) + 'deg) rotateX(' + (-y * 7).toFixed(2) + 'deg) translateY(-4px)';
    });
    el.addEventListener('pointerleave', function () { el.style.transform = ''; });
  });
})();
