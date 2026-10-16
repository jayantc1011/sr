(() => {
  'use strict';
  const data = window.SHALINI_COURSES || {};
  const params = new URLSearchParams(location.search);
  const slug = Object.prototype.hasOwnProperty.call(data, params.get('course')) ? params.get('course') : 'speakathon';
  const course = data[slug];
  const section = document.getElementById('learn-certificate');
  if (!course || !section) return;

  const lessons = (course.modules || []).flatMap(module => module.lessons || []);
  const count = document.getElementById('certificate-progress-count');
  const locked = document.getElementById('learn-certificate-locked');
  const form = document.getElementById('learn-certificate-form');
  const nameInput = document.getElementById('certificate-name');
  const certificate = document.getElementById('completion-certificate');
  const recipient = document.getElementById('certificate-recipient');
  const date = document.getElementById('certificate-date');
  const printButton = document.getElementById('print-certificate');
  const nameKey = 'shalini-certificate-name:' + slug;
  let isUnlocked = false;

  try { nameInput.value = localStorage.getItem(nameKey) || ''; } catch (_) {}

  const setProgress = (completed, total) => {
    const safeTotal = Math.max(1, Number(total) || lessons.length);
    const safeCompleted = Math.max(0, Math.min(safeTotal, Number(completed) || 0));
    count.textContent = safeCompleted + ' of ' + safeTotal;
    isUnlocked = safeCompleted === safeTotal;
    locked.hidden = isUnlocked;
    form.hidden = !isUnlocked;
    document.getElementById('learn-certificate-message').textContent = isUnlocked
      ? 'You completed every challenge. Add your name to prepare your certificate.'
      : 'Complete all ' + safeTotal + ' daily challenges to unlock your personalised certificate.';
  };

  window.addEventListener('academy:courseprogress', event => {
    if (event.detail?.slug === slug) setProgress(event.detail.completed, event.detail.total);
  });

  // The player emits progress during startup before this script loads; hydrate from its saved state.
  try {
    const saved = JSON.parse(localStorage.getItem('shalini-study-v4:' + slug) || '{}');
    const completed = new Set((saved.done || []).filter(index => Number.isInteger(index) && index >= 0 && index < lessons.length && lessons[index]?.videoAvailable !== false));
    setProgress(completed.size, lessons.length);
  } catch (_) { setProgress(0, lessons.length); }

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!isUnlocked || !nameInput.reportValidity()) return;
    const name = nameInput.value.trim().replace(/\s+/g, ' ');
    if (!name) { nameInput.focus(); return; }
    recipient.textContent = name;
    date.textContent = new Intl.DateTimeFormat('en-IN', {day:'numeric', month:'long', year:'numeric'}).format(new Date());
    certificate.hidden = false;
    printButton.hidden = false;
    try { localStorage.setItem(nameKey, name); } catch (_) {}
    certificate.scrollIntoView({behavior:'smooth', block:'center'});
  });

  printButton.addEventListener('click', () => window.print());
})();
