(() => {
  const offers = {
    'comm-package': {
      name: 'Speak with Confidence',
      shortName: 'Speak with Confidence',
      bookletTitle: 'Personalised Communication Progress Report',
      kicker: 'SHALINI RATHOD · IMAGE CONSULTING & STYLING',
      headline: 'A More Refined Way to Communicate',
      description: 'Private coaching tailored to your needs, whether you want to strengthen your delivery, refine your tone, overcome speaking habits, or feel more at ease in professional settings.',
      duration: '7 sessions · 7 weeks',
      format: 'Private 1:1 Zoom sessions',
      price: '₹34,999',
      originalPrice: '',
      installments: 'or 2 installments of ₹18,500',
      investmentLabel: '7-SESSION COMMUNICATION PACKAGE',
      deliverableOne: '7 private 60-minute 1:1 Zoom sessions',
      deliverableTwo: 'Personalized Executive Speaker Playbook',
      visualLabel: 'THE SPEAK WITH CONFIDENCE PROGRAM',
      visualSubtitle: 'Build a voice that feels like yours.',
      sessionBadge: '7 private sessions',
      sessions: '7 private sessions',
      length: '7 weeks',
      sessionDetails: [
        { title: 'Non-Verbal Communication & Physical Presence', solves: 'Refines the non-verbal cues that shape your presence and credibility.', bullets: ['3-point body language audit', 'Eye contact & facial congruence', 'Video-based presence analysis'], duration: '60 mins · 1:1 Video' },
        { title: 'Vocal Dynamics & Tonal Control', solves: 'Helps you sound composed, expressive, and assured.', bullets: ['5 vocal delivery variables', 'Strategic pauses & emphasis', '3-tone vocal practice'], duration: '60 mins · 1:1 Video' },
        { title: 'Verbal Precision & Articulation', solves: 'Helps you express ideas with clarity and precision.', bullets: ['3-part message structuring', 'Filler words & verbal clutter', 'Articulation, diction & sentence economy'], duration: '60 mins · 1:1 Video' },
        { title: 'Conversational Intelligence & Social Fluency', solves: 'Makes conversations more natural, engaging, and considered.', bullets: ['3-step active listening', 'Conversational turn-taking techniques', 'Rapport building & social calibration'], duration: '60 mins · 1:1 Video' },
        { title: 'Assertiveness & Verbal Authority', solves: 'Helps you express boundaries and opinions with conviction.', bullets: ['DESC framework for difficult conversations', 'Hedging & unnecessary apologies', 'Assertive response scenario practice'], duration: '60 mins · 1:1 Video' },
        { title: 'Executive Communication & Speaking Impact', solves: 'Strengthens your impact in high-stakes professional conversations.', bullets: ['PREP framework for concise answers', 'Rule of Three messaging', 'Impromptu speaking & response drills'], duration: '60 mins · 1:1 Video' },
      ],
    },
    'style-package': {
      name: 'Shalini’s Style Transformation',
      shortName: 'Style Transformation',
      bookletTitle: '📝 Detailed Tailored Style recommendation Booklet',
      kicker: 'PRIVATE IMAGE CONSULTING & STYLING',
      headline: "Let's Curate an Image That's Unmistakably Yours.",
      description: 'Discover what brings out your best through personalised sessions with Shalini, thoughtfully tailored to refine your image and cultivate a style that’s distinctly yours.',
      duration: '6 sessions · 6+ hours',
      format: 'Private 1:1 video consultations',
      price: '₹70,000',
      originalPrice: '',
      installments: '',
      investmentLabel: 'COMPLETE 1:1 PACKAGE (6 SESSIONS + BOOKLET)',
      deliverableOne: '6 Video Consultations',
      deliverableTwo: '28-Page Tailored Booklet',
      visualLabel: 'SHALINI’S STYLE TRANSFORMATION',
      visualSubtitle: 'Make your style feel unmistakably you.',
      sessionBadge: '5 private sessions',
      sessions: '5 private sessions',
      length: '5 hours total',
      sessionDetails: [
        { title: 'Face Shape Assessment 1:1 Session', solves: 'Decodes your facial geometry to find necklines, eyewear, and earring proportions that flatter your jawline.', bullets: ['Facial geometry & bone structure mapping', 'Flattering necklines, collars & eyewear frames', 'Earring scale & hairstyle proportion guide'], duration: '45 mins · 1:1 Video' },
        { title: 'Open session for Styling (Anything of your choice)', solves: 'Tackles your most pressing wardrobe problem — vetting dilemma pieces, trip packing, or live closet troubleshooting.', bullets: ['100% custom agenda tailored to your immediate need', 'Live outfit remixing with clothes you already own', 'Quick verdicts on fit, alterations & pairing'], duration: '60 mins · 1:1 Video' },
        { title: 'Makeup & Accessories Styling', solves: 'Stops undertone mismatch in lip and blush shades, and teaches effortless jewelry and accessory pairing.', bullets: ['Undertone & skin contrast identification', 'Signature everyday & evening makeup shades', 'Jewelry metal selection & focal point balance'], duration: '60 mins · 1:1 Video' },
        { title: 'Curated styling for formal occasions', solves: 'Eliminates last-minute wardrobe stress before keynotes, galas, weddings, and high-profile presentations.', bullets: ['2–3 complete head-to-toe formal looks', 'Fabric drape & camera-ready lighting checks', 'Footwear, bag & outerwear pairing'], duration: '60 mins · 1:1 Video' },
        { title: 'Lifestyle & Image Analysis 1:1 session', solves: 'Aligns how you present yourself with your leadership goals, tailored to your real daily schedule.', bullets: ['3-Word Signature Style Archetype definition', 'Wardrobe-to-lifestyle allocation audit', 'Repeatable daily outfit formulas'], duration: '60 mins · 1:1 Video' },
        { title: 'Body Shape Analysis 1:1 Session', solves: 'Ends the frustration of ill-fitting cuts by decoding vertical and horizontal proportions for effortless tailoring.', bullets: ['Torso-to-leg ratio & bone structure analysis', 'Optimal jacket lengths, waist rises & hemlines', 'Fabric weight & silhouette balancing formulas'], duration: '60 mins · 1:1 Video' },
      ],
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
  setText('#package-booklet-title', offer.bookletTitle);
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
  document.querySelectorAll('.package-session-card').forEach((card, index) => {
    const session = offer.sessionDetails[index];
    if (!session) return;
    const heading = card.querySelector('h3');
    const time = card.querySelector('.package-session-time');
    const solves = card.querySelector('p');
    const list = card.querySelector('ul');
    if (heading) heading.textContent = session.title;
    if (time) time.textContent = '◷  ' + session.duration;
    if (solves) {
      const label = document.createElement('strong');
      label.textContent = 'Solves:';
      solves.replaceChildren(label, document.createTextNode(' ' + session.solves));
    }
    if (list) list.replaceChildren(...session.bullets.map((bullet) => {
      const item = document.createElement('li');
      item.textContent = bullet;
      return item;
    }));
  });
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
  document.querySelectorAll('[data-discovery-booking]').forEach((link) => link.addEventListener('click', () => updateBookingMode('discovery')));

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
  const editorialPhotoLink = document.querySelector('[data-view-editorial-photo]');
  const packageGallery = document.querySelector('[data-package-gallery]');
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
  let editorialPhotoFocused = false;
  const visibleImageCount = () => window.matchMedia('(max-width: 650px)').matches ? 1 : window.matchMedia('(max-width: 900px)').matches ? 2 : 3;
  const renderGallery = () => {
    const demo = demos[currentSlide];
    const galleryImages = editorialPhotoFocused
      ? [['assets/hero-seated.webp', 'Shalini Rathod in a landscape editorial portrait']]
      : demo.images;
    const count = Math.min(visibleImageCount(), galleryImages.length);
    if (galleryTrack) {
      galleryTrack.classList.toggle('is-editorial-focused', editorialPhotoFocused);
      packageGallery?.classList.toggle('is-editorial-focused', editorialPhotoFocused);
      galleryTrack.replaceChildren(...Array.from({ length: count }, (_, slot) => {
        const image = document.createElement('img');
        const [src, alt] = galleryImages[slot];
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
    editorialPhotoFocused = false;
    currentSlide = (index + demos.length) % demos.length;
    renderGallery();
  };
  editorialPhotoLink?.addEventListener('click', (event) => {
    event.preventDefault();
    editorialPhotoFocused = !editorialPhotoFocused;
    if (editorialPhotoFocused) currentSlide = 0;
    editorialPhotoLink.textContent = editorialPhotoFocused ? 'Back to Demo Slides' : 'View Editorial Photo';
    renderGallery();
    if (editorialPhotoFocused) galleryTrack?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
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
