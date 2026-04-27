/* ============ NIXUS d.o.o. — static site interactivity ============ */

document.addEventListener('DOMContentLoaded', function () {
  /* ---- Mobile hamburger menu ---- */
  var hamburger = document.querySelector('.nx-hamburger');
  var mobileMenu = document.querySelector('.nx-mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  /* ---- FAQ accordion ---- */
  var faqItems = document.querySelectorAll('.nx-faq-item');
  faqItems.forEach(function (item) {
    var trigger = item.querySelector('.nx-faq-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      faqItems.forEach(function (other) { other.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
      trigger.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');
    });
  });

  /* ---- Contact tabs ---- */
  var tabBtns = document.querySelectorAll('.nx-tab-btn');
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tab = btn.getAttribute('data-tab');
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var intro = document.getElementById('nx-form-intro');
      var problemLabel = document.getElementById('nx-problem-label');
      var problemArea = document.getElementById('nx-problem-area');
      if (intro && problemLabel && problemArea) {
        if (tab === 'problem') {
          intro.textContent = 'Imate problem s računalom, mrežom ili nekim drugim IT uređajem? Opišite nam ga.';
          problemLabel.firstChild.nodeValue = 'Opis problema ';
          problemArea.placeholder = 'Opišite vaš IT problem...';
        } else {
          intro.textContent = 'Trebate ponudu za novu opremu, komponente ili periferiju? Opišite što trebate.';
          problemLabel.firstChild.nodeValue = 'Opis opreme ';
          problemArea.placeholder = 'Što vam treba? Budžet? Namjena?';
        }
      }
    });
  });

  /* ---- Slozi PC purpose toggle ---- */
  var purposeBtns = document.querySelectorAll('.nx-purpose-btn');
  purposeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () { btn.classList.toggle('active'); });
  });

  /* ---- Mailto form handlers (Kontakt + Slozi PC) ---- */
  var contactForm = document.getElementById('nx-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var activeTab = document.querySelector('.nx-tab-btn.active');
      var tab = activeTab ? activeTab.getAttribute('data-tab') : 'problem';
      var name = (document.getElementById('nx-c-name') || {}).value || '';
      var email = (document.getElementById('nx-c-email') || {}).value || '';
      var problem = (document.getElementById('nx-problem-area') || {}).value || '';
      var subject = tab === 'problem' ? 'IT problem - upit s web stranice' : 'Ponuda za opremu - upit s web stranice';
      var body =
        'Ime: ' + name + '\n' +
        'Email: ' + email + '\n\n' +
        (tab === 'problem' ? 'Opis problema:\n' : 'Opis opreme:\n') + problem;
      window.location.href = 'mailto:info@nixus.hr?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      var formCard = contactForm.closest('.nx-form-card');
      if (formCard) {
        formCard.innerHTML =
          '<div class="nx-success">' +
          '<div class="nx-success-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></div>' +
          '<h3>Email klijent otvoren</h3>' +
          '<p>Provjerite svoj email program i pošaljite poruku. Javit ćemo se u najkraćem roku.</p>' +
          '</div>';
      }
    });
  }

  var sloziForm = document.getElementById('nx-slozi-form');
  if (sloziForm) {
    sloziForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (document.getElementById('nx-s-name') || {}).value || '';
      var email = (document.getElementById('nx-s-email') || {}).value || '';
      var budget = (document.getElementById('nx-s-budget') || {}).value || '';
      var notes = (document.getElementById('nx-s-notes') || {}).value || '';
      var purposes = [];
      document.querySelectorAll('.nx-purpose-btn.active').forEach(function (b) {
        purposes.push(b.getAttribute('data-label'));
      });
      var body =
        'Ime i prezime: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Budžet: ' + budget + '\n' +
        'Namjena: ' + (purposes.join(', ') || '—') + '\n\n' +
        'Dodatne želje:\n' + notes;
      window.location.href = 'mailto:info@nixus.hr?subject=' + encodeURIComponent('Složi PC - personalizirana ponuda') + '&body=' + encodeURIComponent(body);
      var card = sloziForm.closest('.nx-slozi-card');
      if (card) {
        card.innerHTML =
          '<div class="nx-success lg">' +
          '<div class="nx-success-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg></div>' +
          '<h2>Email klijent otvoren!</h2>' +
          '<p>Provjerite svoj email program i pošaljite poruku. Javit ćemo vam se s personaliziranom ponudom.</p>' +
          '</div>';
      }
    });
  }

  /* ---- Cookie consent banner ---- */
  initCookieConsent();

  /* ---- Set current year in footer ---- */
  var yearEl = document.getElementById('nx-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ============ Cookie consent (simple, GA-ready) ============ */
function initCookieConsent() {
  var STORAGE_KEY = 'nixus-consent-v1';
  var banner = document.getElementById('nx-cookie-banner');
  if (!banner) return;

  var saved = null;
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch (e) {}

  if (!saved) banner.style.display = 'flex';

  document.querySelectorAll('[data-cookie-action]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var action = btn.getAttribute('data-cookie-action');
      var consent = action === 'accept' ? { analytics: true, marketing: true } : { analytics: false, marketing: false };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
      banner.style.display = 'none';
    });
  });

  document.querySelectorAll('[data-cookie-open]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      banner.style.display = 'flex';
    });
  });
}
