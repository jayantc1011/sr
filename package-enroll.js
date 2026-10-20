(() => {
  const offers = {
    'comm-package': {
      name: 'Speak with Confidence',
      shortName: 'Speak with Confidence',
      kicker: 'SHALINI RATHOD · IMAGE CONSULTING & STYLING',
      headline: 'Curate your authentic visual identity.',
      description: 'A bespoke 1:1 styling partnership featuring 6 private video sessions covering Face Shape, Body Shape, Makeup, Formal Styling, Lifestyle Analysis, and an Open Session — alongside your personal Style Booklet.',
      duration: '7 sessions · 7 weeks',
      format: 'Private 1:1 Zoom sessions',
      price: '₹34,999',
      originalPrice: '',
      installments: 'or 2 installments of ₹18,500',
      investmentLabel: 'COMPLETE 1:1 PACKAGE (6 SESSIONS + BOOKLET)',
      deliverableOne: '6 Video Consultations',
      deliverableTwo: '28-Page Tailored Booklet',
      visualLabel: 'THE SPEAK WITH CONFIDENCE PROGRAM',
      visualSubtitle: 'Build a voice that feels like yours.',
      sessionBadge: '7 private sessions',
      sessions: '7 private sessions',
      length: '7 weeks',
    },
    'style-package': {
      name: 'Shalini’s Style Transformation',
      shortName: 'Style Transformation',
      kicker: 'PRIVATE IMAGE CONSULTING & STYLING',
      headline: 'Curate your authentic visual identity.',
      description: 'A bespoke 1:1 styling partnership featuring six private video sessions across face shape, body shape, makeup, formal styling, lifestyle analysis, and an open session—alongside your personal Style Booklet.',
      duration: '6 sessions · 6+ hours',
      format: 'Private 1:1 video consultations',
      price: '₹24,999',
      originalPrice: '₹38,000',
      installments: '',
      investmentLabel: 'COMPLETE 1:1 PACKAGE (6 SESSIONS + BOOKLET)',
      deliverableOne: '6 Video Consultations',
      deliverableTwo: '28-Page Tailored Booklet',
      visualLabel: 'SHALINI’S STYLE TRANSFORMATION',
      visualSubtitle: 'Make your style feel unmistakably you.',
      sessionBadge: '5 private sessions',
      sessions: '5 private sessions',
      length: '5 hours total',
    }
  };

  const params = new URLSearchParams(window.location.search);
  const offerKey = params.get('offer') === 'style-package' ? 'style-package' : 'comm-package';
  const offer = offers[offerKey];
  const contactHref = 'contact.html?type=consultation&offer=' + encodeURIComponent(offerKey) + '#academy-contact-form';
  const setText = (selector, value) => document.querySelectorAll(selector).forEach((element) => { element.textContent = value; });

  document.title = offer.name + ' | Shalini Rathod';
  document.querySelector('meta[name="description"]')?.setAttribute('content', offer.description);
  document.documentElement.dataset.packageOffer = offerKey;
  setText('[data-package-name]', offer.shortName);
  setText('[data-package-kicker]', offer.kicker);
  document.querySelector('[data-package-headline]').innerHTML = offer.headline;
  setText('[data-package-description]', offer.description);
  setText('[data-package-duration]', offer.duration);
  setText('[data-package-format]', offer.format);
  setText('[data-package-price]', offer.price);
  setText('[data-package-investment-label]', offer.investmentLabel);
  setText('[data-package-deliverable-one]', offer.deliverableOne);
  setText('[data-package-deliverable-two]', offer.deliverableTwo);
  const originalPrice = document.querySelector('[data-package-original-price]');
  if (originalPrice) { originalPrice.textContent = offer.originalPrice; originalPrice.hidden = !offer.originalPrice; }
  setText('[data-package-installments]', offer.installments);
  const installments = document.querySelector('[data-package-installments]');
  if (installments) installments.hidden = !offer.installments;
  setText('[data-package-visual-label]', offer.visualLabel);
  setText('[data-package-visual-subtitle]', offer.visualSubtitle);
  setText('[data-package-session-badge]', offer.sessionBadge);
  setText('[data-booking-price]', offer.price);
  setText('[data-booking-confirm-price]', offer.price);
  document.querySelectorAll('[data-package-contact]').forEach((link) => { link.href = contactHref; });

  const bookingForm = document.querySelector('[data-booking-form]');
  const bookingModeButtons = document.querySelectorAll('[data-booking-mode]');
  const bookingDateOptions = document.querySelector('[data-booking-dates]');
  const bookingTimeOptions = document.querySelector('[data-booking-times]');
  const bookingDateInput = document.querySelector('[data-booking-date]');
  const bookingTimeInput = document.querySelector('[data-booking-time]');
  const bookingTimeLabel = document.querySelector('[data-booking-time-label]');
  const bookingStatus = document.querySelector('[data-booking-status]');
  let bookingMode = 'package';
  const updateBookingMode = (mode) => {
    bookingMode = mode;
    bookingModeButtons.forEach((button) => {
      const active = button.dataset.bookingMode === mode;
      button.classList.toggle('is-selected', active);
      button.setAttribute('aria-selected', String(active));
    });
    setText('[data-booking-confirm-price]', mode === 'package' ? offer.price : 'FREE');
    const submitText = mode === 'package' ? 'CONFIRM PACKAGE (' + offer.price + ')' : 'CONFIRM FREE DISCOVERY';
    const submitButton = document.querySelector('.package-booking-submit');
    if (submitButton) submitButton.innerHTML = submitText + ' <span aria-hidden="true">→</span>';
    if (bookingStatus) bookingStatus.textContent = '';
  };
  bookingModeButtons.forEach((button) => button.addEventListener('click', () => updateBookingMode(button.dataset.bookingMode)));

  const dateFormat = new Intl.DateTimeFormat('en-IN', { weekday: 'long', month: 'short', day: 'numeric' });
  const shortDateFormat = new Intl.DateTimeFormat('en-IN', { month: 'short', day: 'numeric' });
  const dateKey = (date) => [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
  const dateButtons = [];
  if (bookingDateOptions) {
    const today = new Date();
    dateButtons.push(...Array.from({ length: 4 }, (_, index) => {
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + index + 1);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'package-booking-option';
      button.dataset.value = dateKey(date);
      button.textContent = index === 0 ? 'Tomorrow, ' + shortDateFormat.format(date) : dateFormat.format(date);
      button.setAttribute('aria-pressed', String(index === 0));
      button.addEventListener('click', () => {
        dateButtons.forEach((item) => { item.classList.toggle('is-selected', item === button); item.setAttribute('aria-pressed', String(item === button)); });
        if (bookingDateInput) bookingDateInput.value = button.dataset.value;
        if (bookingTimeLabel) bookingTimeLabel.textContent = 'Time Slot (' + button.textContent + '):';
      });
      if (index === 0) button.classList.add('is-selected');
      return button;
    }));
    bookingDateOptions.replaceChildren(...dateButtons);
    if (bookingDateInput) bookingDateInput.value = dateButtons[0]?.dataset.value || '';
    if (bookingTimeLabel && dateButtons[0]) bookingTimeLabel.textContent = 'Time Slot (' + dateButtons[0].textContent + '):';
  }

  const availableTimes = ['11:00 AM IST', '03:00 PM IST', '05:30 PM IST', '08:00 PM IST'];
  if (bookingTimeOptions) {
    const timeButtons = availableTimes.map((time, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'package-booking-option package-booking-time-option' + (index === 0 ? ' is-selected' : '');
      button.dataset.value = time;
      button.textContent = time;
      button.setAttribute('aria-pressed', String(index === 0));
      button.addEventListener('click', () => {
        timeButtons.forEach((item) => { item.classList.toggle('is-selected', item === button); item.setAttribute('aria-pressed', String(item === button)); });
        if (bookingTimeInput) bookingTimeInput.value = time;
      });
      return button;
    });
    bookingTimeOptions.replaceChildren(...timeButtons);
    if (bookingTimeInput) bookingTimeInput.value = availableTimes[0];
  }

  bookingForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!bookingForm.reportValidity()) return;
    const bookingType = bookingMode === 'package' ? 'package' : 'free discovery call';
    if (bookingStatus) bookingStatus.textContent = 'Your ' + bookingType + ' request is ready. The team will follow up to confirm availability.';
  });
  const heroImage = document.querySelector('[data-package-cover]');
  if (heroImage) {
    heroImage.src = 'assets/hero-seated.webp';
    heroImage.alt = 'Shalini Rathod, image consultant';
  }

  const galleryTrack = document.querySelector('[data-gallery-track]');
  const demoKicker = document.querySelector('[data-demo-kicker]');
  const demoTitle = document.querySelector('[data-demo-title]');
  const dotsRoot = document.querySelector('[data-gallery-dots]');
  const demos = [
    {
      kicker: 'DEMO SLIDE 01 · IDENTITY MATRIX', title: 'Style Archetype & Lifestyle Blueprint',
      images: [
        ['assets/about/shalini-close.webp', 'Shalini Rathod in a personal styling portrait'],
        ['assets/about/shalini-seated.webp', 'Shalini Rathod seated in a black outfit'],
        ['assets/about/shalini-reading.webp', 'Shalini Rathod reviewing a style booklet']
      ]
    },
    {
      kicker: 'DEMO SLIDE 02 · SILHOUETTE MATRIX', title: 'Body & Face Proportion Architecture',
      images: [
        ['assets/services/power-dressing-cover.webp', 'A stylist helping a client choose an outfit'],
        ['assets/services/styling-consultation.webp', 'A personal wardrobe consultation'],
        ['assets/about/shalini-seated.webp', 'Shalini Rathod seated in a black outfit']
      ]
    },
    {
      kicker: 'DEMO SLIDE 03 · CHROMATIC SPECTRUM', title: '12-Tone Palette & Color Harmony',
      images: [
        ['assets/about/shalini-reading.webp', 'Shalini Rathod reviewing a style booklet'],
        ['assets/about/shalini-close.webp', 'Shalini Rathod in a personal styling portrait'],
        ['assets/services/course-bundle.webp', 'Wardrobe pieces arranged for styling']
      ]
    },
    {
      kicker: 'DEMO SLIDE 04 · READY-TO-WEAR', title: 'Curated Occasion Lookbook',
      images: [
        ['assets/services/dining-etiquette-cover.webp', 'A guided occasion consultation'],
        ['assets/services/power-dressing-cover.webp', 'A stylist helping a client choose an outfit'],
        ['assets/about/shalini-seated.webp', 'Shalini Rathod seated in a black outfit']
      ]
    },
    {
      kicker: 'DEMO SLIDE 05 · FINISHING TOUCHES', title: 'Makeup, Accessories & Wishlist',
      images: [
        ['assets/about/shalini-reading.webp', 'Shalini Rathod reviewing a style booklet'],
        ['assets/about/shalini-close.webp', 'Shalini Rathod in a personal styling portrait'],
        ['assets/services/styling-consultation.webp', 'A personal wardrobe consultation']
      ]
    }
  ];
  let currentSlide = 0;
  const visibleImageCount = () => window.matchMedia('(max-width: 650px)').matches ? 1 : window.matchMedia('(max-width: 900px)').matches ? 2 : 3;
  const renderGallery = () => {
    const demo = demos[currentSlide];
    const count = Math.min(visibleImageCount(), demo.images.length);
    if (galleryTrack) {
      galleryTrack.replaceChildren(...Array.from({ length: count }, (_, slot) => {
        const image = document.createElement('img');
        const [src, alt] = demo.images[slot];
        image.src = src;
        image.alt = alt;
        image.loading = 'lazy';
        image.decoding = 'async';
        return image;
      }));
    }
    if (demoKicker) demoKicker.textContent = demo.kicker;
    if (demoTitle) demoTitle.textContent = demo.title;
    dotsRoot?.querySelectorAll('button').forEach((button, index) => {
      const active = index === currentSlide;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });
  };
  const showDemo = (index) => {
    currentSlide = (index + demos.length) % demos.length;
    renderGallery();
  };
  if (dotsRoot) {
    dotsRoot.replaceChildren(...Array.from({ length: demos.length }, (_, index) => {
      const button = document.createElement('button');
      button.className = 'package-gallery-dot';
      button.type = 'button';
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-label', 'Show demo ' + (index + 1));
      button.setAttribute('aria-controls', 'booklet-demo-panel');
      button.setAttribute('aria-selected', String(index === 0));
      button.tabIndex = index === 0 ? 0 : -1;
      button.textContent = 'Demo 0' + (index + 1);
      button.addEventListener('click', () => showDemo(index));
      return button;
    }));
  }
  window.addEventListener('resize', renderGallery, { passive: true });
  renderGallery();

})();

// Keep the FAQ accordion exclusive: opening one answer closes any other open answer.
document.querySelectorAll('.package-faq-item').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('.package-faq-item').forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});
