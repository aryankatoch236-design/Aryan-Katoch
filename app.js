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
