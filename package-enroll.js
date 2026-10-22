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
      price: '₹70,000',
      priceUSD: 2200,
      originalPrice: '',
      installments: '',
      investmentLabel: '7-SESSION COMMUNICATION PACKAGE',
      deliverableOne: '7 private 60-minute 1:1 Zoom sessions',
      deliverableTwo: 'Personalized Executive Speaker Playbook',
      visualLabel: 'THE SPEAK WITH CONFIDENCE PROGRAM',
      visualSubtitle: 'Build a voice that feels like yours.',
      sessionBadge: '7 private sessions',
      sessions: '7 private sessions',
      length: '7 weeks',
      sessionDetails: [
        { title: 'Non-Verbal Communication & Physical Presence', bullets: ['3-point body language audit', 'Eye contact & facial congruence', 'Video-based presence analysis'], duration: '60 mins · 1:1 Video' },
        { title: 'Vocal Dynamics & Tonal Control', bullets: ['5 vocal delivery variables', 'Strategic pauses & emphasis', '3-tone vocal practice'], duration: '60 mins · 1:1 Video' },
        { title: 'Verbal Precision & Articulation', bullets: ['3-part message structuring', 'Filler words & verbal clutter', 'Articulation, diction & sentence economy'], duration: '60 mins · 1:1 Video' },
        { title: 'Conversational Intelligence & Social Fluency', bullets: ['3-step active listening', 'Conversational turn-taking techniques', 'Rapport building & social calibration'], duration: '60 mins · 1:1 Video' },
        { title: 'Assertiveness & Verbal Authority', bullets: ['DESC framework for difficult conversations', 'Hedging & unnecessary apologies', 'Assertive response scenario practice'], duration: '60 mins · 1:1 Video' },
        { title: 'Executive Communication & Speaking Impact', bullets: ['PREP framework for concise answers', 'Rule of Three messaging', 'Impromptu speaking & response drills'], duration: '60 mins · 1:1 Video' },
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
      priceUSD: 2200,
      originalPrice: '',
      installments: '',
      investmentLabel: 'COMPLETE 1:1 PACKAGE (6 SESSIONS + BOOKLET)',
      deliverableOne: '6 Video Consultations',
      deliverableTwo: '28-Page Tailored Booklet',
      visualLabel: 'SHALINI’S STYLE TRANSFORMATION',
      visualSubtitle: 'Make your style feel unmistakably you.',
      sessionBadge: '6 private sessions',
      sessions: '6 private sessions',
      length: '6 hours total',
      sessionDetails: [
        { title: 'Face Shape Assessment', bullets: ['Facial shape, proportions & bone structure mapping', 'Flattering necklines, collars & eyewear frames', 'Hairstyle, hair length & parting recommendations'], duration: '60 mins · 1:1 Video' },
        { title: 'Body Shape Analysis', bullets: ['Vertical proportions, torso-to-leg ratio & body structure analysis', 'Optimal waistlines, jacket lengths & hemlines', 'Fabric weight, silhouette balance & garment fit recommendations'], duration: '60 mins · 1:1 Video' },
        { title: 'Lifestyle & Image Analysis', bullets: ['Wardrobe-to-lifestyle allocation audit', 'Repeatable daily outfit formulas', 'Occasion-specific dressing & wardrobe versatility', 'Wardrobe gaps, essentials & strategic investment priorities'], duration: '60 mins · 1:1 Video' },
        { title: 'Makeup & Accessories Styling', bullets: ['Undertone & skin contrast identification', 'Signature everyday & evening makeup shades', 'Jewelry metal selection & focal point balance'], duration: '60 mins · 1:1 Video' },
        { title: 'Curated Styling for Formal Occasions', bullets: ['Dress-code interpretation & occasion-specific style direction', 'Formalwear proportioning, structure & fit refinement', 'Strategic use of statement pieces, textures & finishing details'], duration: '60 mins · 1:1 Video' },
        { title: 'Opening Session for Styling (Anything of your choice)', bullets: ['100% custom agenda tailored to your immediate need', 'Live outfit remixing with clothes you already own', 'Quick verdicts on fit, alterations & pairing'], duration: '60 mins · 1:1 Video' },
      ],
    }
  };

  const params = new URLSearchParams(window.location.search);
  const offerKey = params.get('offer') === 'style-package' ? 'style-package' : 'comm-package';
  const offer = offers[offerKey];
  const contactHref = 'contact.html?type=consultation&offer=' + encodeURIComponent(offerKey) + '#academy-contact-form';
  const setText = (selector, value) => document.querySelectorAll(selector).forEach((element) => { element.textContent = value; });
  setText('[data-package-discovery-prompt]', offerKey === 'comm-package' ? 'Unsure where to begin refining the way you express yourself?' : 'Not sure which area of your personal style needs attention first?');
  const formatPrice = (currency) => {
    if (currency === 'USD') {
      return '$' + offer.priceUSD.toLocaleString('en-US');
    }
    return offer.price;
  };
  let selectedCurrency = 'INR';
  const checkoutDialog = document.querySelector('#package-checkout-dialog');
  const checkoutPayment = checkoutDialog?.querySelector('[data-package-checkout-screen="payment"]');
  const checkoutSuccess = checkoutDialog?.querySelector('[data-package-checkout-screen="success"]');
  const checkoutPay = checkoutDialog?.querySelector('[data-package-checkout-pay]');
  const updateCheckoutOrder = () => {
    const displayPrice = formatPrice(selectedCurrency);
    document.querySelectorAll('[data-package-checkout-name], [data-package-checkout-success-name]').forEach((element) => { element.textContent = offer.shortName; });
    document.querySelectorAll('[data-package-checkout-amount], [data-package-checkout-success-amount]').forEach((element) => { element.textContent = displayPrice; });
    if (checkoutPay) checkoutPay.textContent = 'Pay ' + displayPrice + ' · Demo';
  };
  const updateCurrency = (currency) => {
    selectedCurrency = currency;
    document.querySelectorAll('[data-currency]').forEach((button) => {
      const active = button.dataset.currency === currency;
      button.setAttribute('aria-pressed', String(active));
    });
    const displayPrice = formatPrice(currency);
    setText('[data-package-price]', displayPrice);
    setText('[data-booking-price]', displayPrice);
    setText('[data-booking-confirm-price]', displayPrice);
    setText('[data-package-installments]', currency === 'INR' ? offer.installments : '');
    const installmentLabel = document.querySelector('[data-package-installments]');
    if (installmentLabel) installmentLabel.hidden = currency === 'USD' || !offer.installments;
    updateCheckoutOrder();
  };
  updateCurrency(selectedCurrency);

  document.querySelectorAll('[data-currency]').forEach((button) => {
    button.addEventListener('click', () => updateCurrency(button.dataset.currency));
  });

  document.title = offer.name + ' | Shalini Rathod';
  document.querySelector('meta[name="description"]')?.setAttribute('content', offer.description);
  document.documentElement.dataset.packageOffer = offerKey;
  setText('[data-package-name]', offer.shortName);
  setText('#package-booklet-title', offer.bookletTitle);
  setText('[data-package-kicker]', offer.kicker);
  document.querySelector('[data-package-headline]').innerHTML = offer.headline;
  const mobileCover = document.querySelector('[data-package-cover-mobile]');
  const desktopCover = document.querySelector('[data-package-cover]');
  if (mobileCover && desktopCover) {
    mobileCover.src = desktopCover.currentSrc || desktopCover.src;
    mobileCover.alt = '';
  }
  setText('[data-package-description]', offer.description);
  setText('[data-package-duration]', offer.duration);
  setText('[data-package-format]', offer.format);
  setText('[data-package-price]', formatPrice(selectedCurrency));
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
    const list = card.querySelector('ul');
    if (heading) heading.textContent = session.title;
    if (time) time.textContent = '◷  ' + session.duration;
    if (list) list.replaceChildren(...session.bullets.map((bullet) => {
      const item = document.createElement('li');
      item.textContent = bullet;
      return item;
    }));
  });
  setText('[data-booking-price]', formatPrice(selectedCurrency));
  setText('[data-booking-confirm-price]', formatPrice(selectedCurrency));
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
    const bookingPrice = formatPrice(selectedCurrency);
    setText('[data-booking-confirm-price]', mode === 'package' ? bookingPrice : 'FREE');
    const submitText = mode === 'package' ? 'CONFIRM PACKAGE (' + bookingPrice + ')' : 'CONFIRM FREE DISCOVERY';
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
    if (bookingMode === 'package' && checkoutDialog && checkoutPayment && checkoutSuccess) {
      updateCheckoutOrder();
      checkoutPayment.hidden = false;
      checkoutSuccess.hidden = true;
      checkoutDialog.setAttribute('aria-labelledby', 'package-checkout-title');
      checkoutDialog.showModal();
      return;
    }
    const bookingType = bookingMode === 'package' ? 'package' : 'free discovery call';
    if (bookingStatus) bookingStatus.textContent = 'Your ' + bookingType + ' request is ready. The team will follow up to confirm availability.';
  });
  checkoutDialog?.querySelectorAll('[data-package-checkout-close]').forEach((button) => button.addEventListener('click', () => checkoutDialog.close()));
  checkoutDialog?.addEventListener('click', (event) => { if (event.target === checkoutDialog) checkoutDialog.close(); });
  checkoutDialog?.addEventListener('close', () => {
    if (checkoutPayment) checkoutPayment.hidden = false;
    if (checkoutSuccess) checkoutSuccess.hidden = true;
    checkoutDialog.setAttribute('aria-labelledby', 'package-checkout-title');
  });
  checkoutPay?.addEventListener('click', () => {
    if (!checkoutPayment || !checkoutSuccess) return;
    checkoutPayment.hidden = true;
    checkoutSuccess.hidden = false;
    checkoutDialog.setAttribute('aria-labelledby', 'package-checkout-success-title');
    checkoutDialog.querySelector('#package-checkout-success-title')?.focus();
  });
  const heroImage = document.querySelector('[data-package-cover]');
  if (heroImage) {
    heroImage.src = 'assets/hero-seated.webp';
    heroImage.alt = 'Shalini Rathod, image consultant';
  }

  const galleryTrack = document.querySelector('[data-gallery-track]');
  const galleryViewport = document.querySelector('[data-gallery-viewport]');
  const demoKicker = document.querySelector('[data-demo-kicker]');
  const demoTitle = document.querySelector('[data-demo-title]');
  const dotsRoot = document.querySelector('[data-gallery-dots]');
  const editorialPhotoLink = document.querySelector('[data-view-editorial-photo]');
  const packageGallery = document.querySelector('[data-package-gallery]');
  const previousImageButton = document.querySelector('[data-gallery-prev]');
  const nextImageButton = document.querySelector('[data-gallery-next]');
  const demos = [
    {
      kicker: 'DEMO SLIDE 01 · RADAR DIAGNOSTIC', title: 'Radar Diagnostic & Capability Asymmetry',
      slide: true,
      images: [
        ['assets/canva/communication/communication-slide-01.svg', 'Radar diagnostic and capability asymmetry report for Upendra Bhowmik']
      ]
    },    {
      kicker: 'DEMO SLIDE 02 · SILHOUETTE MATRIX', title: 'Body & Face Proportion Architecture',
      images: [
        ['assets/services/power-dressing-cover.webp', 'A stylist helping a client choose an outfit'],
        ['assets/services/styling-consultation.webp', 'A personal wardrobe consultation'],
        ['assets/about/shalini-seated.webp', 'Shalini Rathod seated in a black outfit'],
        ['assets/services/course-bundle.webp', 'Wardrobe essentials for a personalized style plan']
      ]
    },
    {
      kicker: 'DEMO SLIDE 03 · CHROMATIC SPECTRUM', title: '12-Tone Palette & Color Harmony',
      images: [
        ['assets/about/shalini-reading.webp', 'Shalini Rathod reviewing a style booklet'],
        ['assets/about/shalini-close.webp', 'Shalini Rathod in a personal styling portrait'],
        ['assets/services/course-bundle.webp', 'Wardrobe pieces arranged for styling'],
        ['assets/services/styling-consultation.webp', 'A stylist discussing wardrobe choices with a client']
      ]
    },
    {
      kicker: 'DEMO SLIDE 04 · READY-TO-WEAR', title: 'Curated Occasion Lookbook',
      images: [
        ['assets/services/dining-etiquette-cover.webp', 'A guided occasion consultation'],
        ['assets/services/power-dressing-cover.webp', 'A stylist helping a client choose an outfit'],
        ['assets/about/shalini-seated.webp', 'Shalini Rathod seated in a black outfit'],
        ['assets/about/shalini-reading.webp', 'Shalini Rathod reviewing a style booklet']
      ]
    },
    {
      kicker: 'DEMO SLIDE 05 · FINISHING TOUCHES', title: 'Makeup, Accessories & Wishlist',
      images: [
        ['assets/about/shalini-reading.webp', 'Shalini Rathod reviewing a style booklet'],
        ['assets/about/shalini-close.webp', 'Shalini Rathod in a personal styling portrait'],
        ['assets/services/styling-consultation.webp', 'A personal wardrobe consultation'],
        ['assets/hero-seated.webp', 'Shalini Rathod seated during a style consultation']
      ]
    }
  ];
  let currentSlide = 0;
  let currentImageIndex = 0;
  let editorialPhotoFocused = false;
  const visibleImageCount = () => editorialPhotoFocused ? 1 : window.matchMedia('(max-width: 650px)').matches ? 1 : window.matchMedia('(max-width: 900px)').matches ? 2 : 3;
  const updateGalleryLayout = () => {
    if (!galleryTrack || !galleryViewport) return;
    const images = [...galleryTrack.querySelectorAll('img')];
    const visibleCount = Math.min(visibleImageCount(), images.length || 1);
    const gap = parseFloat(getComputedStyle(galleryTrack).columnGap) || 0;
    const imageWidth = Math.max(0, (galleryViewport.clientWidth - gap * (visibleCount - 1)) / visibleCount);
    images.forEach((image) => {
      image.style.flexBasis = editorialPhotoFocused ? 'min(100%, 980px)' : imageWidth + 'px';
      image.style.width = editorialPhotoFocused ? 'min(100%, 980px)' : imageWidth + 'px';
    });
    const maxIndex = Math.max(0, images.length - visibleCount);
    currentImageIndex = Math.min(currentImageIndex, maxIndex);
    const step = imageWidth + gap;
    galleryTrack.style.transform = editorialPhotoFocused ? 'translate3d(0, 0, 0)' : `translate3d(${-currentImageIndex * step}px, 0, 0)`;
    if (previousImageButton) previousImageButton.disabled = editorialPhotoFocused || currentImageIndex <= 0;
    if (nextImageButton) nextImageButton.disabled = editorialPhotoFocused || currentImageIndex >= maxIndex;
  };
  const renderGallery = () => {
    const demo = demos[currentSlide];
    const galleryImages = editorialPhotoFocused
      ? [['assets/hero-seated.webp', 'Shalini Rathod in a landscape editorial portrait']]
      : demo.images;
    if (galleryTrack) {
      packageGallery?.classList.toggle('is-editorial-focused', editorialPhotoFocused);
      packageGallery?.classList.toggle('is-slide-preview', Boolean(demo.slide) && !editorialPhotoFocused);
      galleryTrack.replaceChildren(...Array.from({ length: galleryImages.length }, (_, slot) => {
        const image = document.createElement('img');
        const [src, alt] = galleryImages[slot];
        image.src = src;
        image.alt = alt;
        image.loading = 'lazy';
        image.decoding = 'async';
        return image;
      }));
    }
    updateGalleryLayout();
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
    currentImageIndex = 0;
    currentSlide = (index + demos.length) % demos.length;
    renderGallery();
  };
  editorialPhotoLink?.addEventListener('click', (event) => {
    event.preventDefault();
    editorialPhotoFocused = !editorialPhotoFocused;
    currentImageIndex = 0;
    if (editorialPhotoFocused) currentSlide = 0;
    editorialPhotoLink.textContent = editorialPhotoFocused ? 'Back to Demo Slides' : 'View Editorial Photo';
    renderGallery();
    if (editorialPhotoFocused) galleryTrack?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  previousImageButton?.addEventListener('click', () => {
    currentImageIndex = Math.max(0, currentImageIndex - 1);
    updateGalleryLayout();
  });
  nextImageButton?.addEventListener('click', () => {
    const maxIndex = Math.max(0, (galleryTrack?.children.length || 0) - visibleImageCount());
    currentImageIndex = Math.min(maxIndex, currentImageIndex + 1);
    updateGalleryLayout();
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
  window.addEventListener('resize', updateGalleryLayout, { passive: true });
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
