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
      reportSlide: {
        sequence: '01 / 05',
        title: 'Radar Diagnostic & Capability Asymmetry',
        author: 'Upendra Bhowmik · Senior Software Engineer',
        name: 'Upendra Bhowmik',
        score: 'Score: 2.55 / 5.0 (B− · Developing)',
        metrics: [
          ['Top Capability:', 'Conversational Trust (3.8)'],
          ['Primary Vulnerability:', 'Assertiveness & Boundaries (1.8)'],
          ['Verbal Clarity:', 'Bottom-up rambling (2.2)']
        ],
        summary: 'Upendra’s executive influence is throttled not by lack of engineering depth, but by boundary anxiety and bottom-up over-explanation under questioning.',
        chart: 'assets/canva/communication/radar-diagnostic-slide-01.svg?v=20261022-chart-only',
        chartAlt: 'Radar chart comparing Upendra’s communication skills with the staff benchmark.'
      }
    },    {
      kicker: 'DEMO SLIDE 02 · SIX-DIMENSIONAL SCORECARD', title: 'Six-Dimensional Scorecard Breakdown',
      scorecard: {
        sequence: '02 / 05',
        title: 'Six-Dimensional Scorecard Breakdown',
        author: 'Upendra Bhowmik · Senior Software Engineer',
        heading: 'Six-Dimensional Scorecard',
        subtitle: 'Diagnostic ratings across 18 behavioral sub-criteria (Scale: 1.0 – 5.0)',
        dimensions: [
          {name:'Vocal Presence', facets:'Pace, Tone, Modulation', summary:'Warm in casual chats; accelerates rapidly to 175+ WPM under questioning with flat pitch delivery.', score:'2.5', target:'4.2', gap:'−1.7'},
          {name:'Verbal Clarity', facets:'Articulation, Structure, Conciseness', summary:'High internal grasp, low verbal economy. Details low-level mechanics before stating the decision.', score:'2.2', target:'4.5', gap:'−2.3', open:true, prescription:'Apply PREP structure: Point first, one rationale, one metric, restate point.', criteria:[
            ['Articulation','2.6','Focuses on implementation traces over business impact.','The "Expert’s Curse": Assuming listeners need full mechanics.'],
            ['Top-Down Framing','2.0','Narrates chronological debugging steps rather than outcomes.','Defensive justification before the bottom line.'],
            ['Conciseness','2.0','Frequent hedging: "basically", "kind of", "does that make sense".','Qualifying statements to soften perceived accountability.']
          ]},
          {name:'Non-Verbal Presence', facets:'Posture, Gestures, Eye Contact', summary:'Defensive retraction during debate; camera gaze drifts to side monitors during virtual calls.', score:'2.7', target:'4.1', gap:'−1.4'},
          {name:'Conversational Skills', facets:'Listening, Response Quality, Rapport', summary:'Core interpersonal asset. Highly respected for empathy, active listening, and collegial humility.', score:'3.8', target:'4.3', gap:'−0.5'},
          {name:'Assertiveness', facets:'Boundaries, Confidence, Directness', summary:'Primary bottleneck. Equates boundaries with hostility; absorbs scope creep and under-negotiates.', score:'1.8', target:'4.4', gap:'−2.6', open:true, prescription:'Shift from "No" to the Trade-Off Pivot: "I can prioritize X if we defer Y."', criteria:[
            ['Boundary Setting','1.5','Accepts late scope and off-hours requests without pushback.','Believing refusal destroys working relationships.'],
            ['Self-Advocacy','2.0','Concedes immediately at the first pushback during appraisals.','Expecting technical work to advocate for itself.'],
            ['Direct Feedback','1.8','Softens warnings to the point that other teams ignore them.','Diluting feedback to avoid temporary awkwardness.']
          ]},
          {name:'Speaking Impact', facets:'Structure, Composure, Audience Awareness', summary:'Struggles to synthesize technical depth into executive stakes; loses stakeholder attention.', score:'2.3', target:'4.5', gap:'−2.2'}
        ]
      }
    },
    {
      kicker: 'DEMO SLIDE 03 · SPEECH ANATOMY', title: 'Speech Anatomy & Stakeholder Matrix',
      speechAnalysis: {
        sequence:'03 / 05',
        title:'Speech Anatomy & Stakeholder Matrix',
        author:'Upendra Bhowmik · Senior Software Engineer',
        charts:[
          {title:'Speech Allocation',subtitle:'Verbal airtime in technical syncs',src:'assets/canva/communication/speech-allocation-donut.svg?v=20261022-charts',centerValue:'52%',centerLabel:'Technical',legend:[['Technical Mechanics','52%','#2563eb'],['Hedging & Apologies','18%','#e27b00'],['Fillers & Hesitation','16%','#94a3b8'],['Executive Decision','14%','#059669']]},
          {title:'Response Under Scope Pushback',subtitle:'Behavioral pattern when deadlines are accelerated',src:'assets/canva/communication/scope-pushback-donut.svg?v=20261022-charts',centerValue:'60%',centerLabel:'Silent Yes',legend:[['Silent Compliance','60%','#e91e4c'],['Hesitant Deflection','24%','#f04b0b'],['Constructive Assertion','16%','#059669']]}
        ],
        matrixTitle:'Exposure Matrix: Confidence by Forum Scale',
        matrixSubtitle:'Behavioral stability as group size and professional stakes increase',
        rows:[
          ['1-on-1 Pair Programming','1 person',88,85,65,"Mild hesitation when correcting a senior's code."],
          ['Daily Standup','5–8 peers',74,70,48,'Chronological Jira recounting over summary.'],
          ['Sprint Demo','15–25 people',52,48,32,'Monotone delivery; rushes past key business wins.'],
          ['Principal Architecture Review','6–10 seniors',40,38,24,'Uptalking conclusions under technical scrutiny.'],
          ['VP / Executive Townhall','50+ leaders',28,26,18,'Avoids voicing systemic risks in public.'],
          ['Compensation Negotiation','1–2 leaders',18,22,14,'Immediate capitulation at the first counter.']
        ]
      }
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
    const images = [...galleryTrack.children];
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
  const createReportSlide = (report) => {
    const article = document.createElement('article');
    article.className = 'package-report-slide';
    article.setAttribute('aria-label', report.title);

    const header = document.createElement('header');
    header.className = 'package-report-slide-header';
    const sequence = document.createElement('span');
    sequence.className = 'package-report-slide-sequence';
    sequence.textContent = report.sequence;
    const title = document.createElement('h4');
    title.textContent = report.title;
    const author = document.createElement('p');
    author.className = 'package-report-slide-author';
    author.textContent = report.author;
    header.append(sequence, title, author);

    const body = document.createElement('div');
    body.className = 'package-report-slide-body';
    const copy = document.createElement('div');
    copy.className = 'package-report-slide-copy';
    const name = document.createElement('h5');
    name.textContent = report.name;
    const score = document.createElement('p');
    score.className = 'package-report-slide-score';
    score.textContent = report.score;
    const metrics = document.createElement('dl');
    metrics.className = 'package-report-slide-metrics';
    report.metrics.forEach(([label, value]) => {
      const row = document.createElement('div');
      const term = document.createElement('dt');
      const detail = document.createElement('dd');
      term.textContent = label;
      detail.textContent = value;
      row.append(term, detail);
      metrics.append(row);
    });
    const summary = document.createElement('p');
    summary.className = 'package-report-slide-summary';
    summary.textContent = report.summary;
    copy.append(name, score, metrics, summary);

    const chart = document.createElement('img');
    chart.src = report.chart;
    chart.alt = report.chartAlt;
    chart.loading = 'lazy';
    chart.decoding = 'async';
    chart.className = 'package-report-slide-chart';
    body.append(copy, chart);
    article.append(header, body);
    return article;
  };

  const createScorecardSlide = (scorecard) => {
    const article = document.createElement('article');
    article.className = 'package-scorecard-slide';
    article.setAttribute('aria-label', scorecard.title);
    const header = document.createElement('header');
    header.className = 'package-report-slide-header';
    const sequence = document.createElement('span');
    sequence.className = 'package-report-slide-sequence';
    sequence.textContent = scorecard.sequence;
    const title = document.createElement('h4');
    title.textContent = scorecard.title;
    const author = document.createElement('p');
    author.className = 'package-report-slide-author';
    author.textContent = scorecard.author;
    header.append(sequence, title, author);
    const intro = document.createElement('div');
    intro.className = 'package-scorecard-intro';
    const heading = document.createElement('h5');
    heading.textContent = scorecard.heading;
    const subtitle = document.createElement('p');
    subtitle.textContent = scorecard.subtitle;
    intro.append(heading, subtitle);
    const controls = document.createElement('div');
    controls.className = 'package-scorecard-controls';
    const expand = document.createElement('button');
    expand.type = 'button';
    expand.textContent = 'Expand All';
    const slash = document.createElement('span');
    slash.textContent = '/';
    const collapse = document.createElement('button');
    collapse.type = 'button';
    collapse.textContent = 'Collapse All';
    controls.append(expand, slash, collapse);
    intro.append(controls);
    const list = document.createElement('div');
    list.className = 'package-scorecard-list';
    const items = [];
    scorecard.dimensions.forEach((dimension, index) => {
      const section = document.createElement('section');
      section.className = 'package-scorecard-dimension';
      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'package-scorecard-trigger';
      trigger.setAttribute('aria-expanded', String(Boolean(dimension.open)));
      const number = document.createElement('span');
      number.className = 'package-scorecard-number';
      number.textContent = String(index + 1).padStart(2, '0');
      const text = document.createElement('span');
      text.className = 'package-scorecard-label';
      const name = document.createElement('strong');
      name.textContent = dimension.name;
      const facets = document.createElement('span');
      facets.textContent = ` (${dimension.facets})`;
      const summary = document.createElement('span');
      summary.className = 'package-scorecard-summary';
      summary.textContent = dimension.summary;
      text.append(name, facets, summary);
      const rating = document.createElement('span');
      rating.className = 'package-scorecard-rating';
      const stars = document.createElement('span');
      stars.className = 'package-scorecard-stars';
      const val = Number(dimension.score);
      stars.textContent = '★★★★★';
      stars.style.setProperty('--score-fill', `${Math.max(0, Math.min(100, (val / 5) * 100))}%`);
      const score = document.createElement('strong');
      score.textContent = `${dimension.score}/5`;
      const target = document.createElement('span');
      target.className = 'package-scorecard-target';
      target.textContent = `Target: ${dimension.target} (${dimension.gap})`;
      rating.append(stars, score, target);
      const symbol = document.createElement('span');
      symbol.className = 'package-scorecard-symbol';
      symbol.textContent = dimension.open ? '−' : '+';
      trigger.append(number, text, rating, symbol);
      const detail = document.createElement('div');
      detail.className = 'package-scorecard-detail';
      detail.hidden = !dimension.open;
      if (dimension.criteria) {
        const table = document.createElement('div');
        table.className = 'package-scorecard-table';
        ['Sub-Criterion', 'Score', 'Diagnostic Observation', 'Core Habit Trap'].forEach((label) => {
          const cell = document.createElement('span');
          cell.className = 'package-scorecard-th';
          cell.textContent = label;
          table.append(cell);
        });
        dimension.criteria.forEach(([criterion, ratingValue, observation, trap]) => {
          const nameCell = document.createElement('strong');
          nameCell.textContent = criterion;
          const scoreCell = document.createElement('span');
          scoreCell.className = 'package-scorecard-subscore';
          const starsCell = document.createElement('span');
          starsCell.className = 'package-scorecard-stars';
          starsCell.textContent = '★★★★★';
          starsCell.style.setProperty('--score-fill', `${(Number(ratingValue) / 5) * 100}%`);
          const value = document.createElement('strong');
          value.textContent = `${ratingValue}/5`;
          scoreCell.append(starsCell, value);
          const observationCell = document.createElement('span');
          observationCell.textContent = observation;
          const trapCell = document.createElement('span');
          trapCell.textContent = trap;
          table.append(nameCell, scoreCell, observationCell, trapCell);
        });
        detail.append(table);
        const prescription = document.createElement('p');
        prescription.className = 'package-scorecard-prescription';
        const label = document.createElement('strong');
        label.textContent = 'Prescription: ';
        prescription.append(label, document.createTextNode(dimension.prescription));
        detail.append(prescription);
      }
      trigger.addEventListener('click', () => {
        const open = trigger.getAttribute('aria-expanded') !== 'true';
        trigger.setAttribute('aria-expanded', String(open));
        detail.hidden = !open;
        symbol.textContent = open ? '−' : '+';
      });
      section.append(trigger, detail);
      list.append(section);
      items.push({trigger, detail, symbol});
    });
    expand.addEventListener('click', () => items.forEach((item) => {
      item.trigger.setAttribute('aria-expanded', 'true'); item.detail.hidden = false; item.symbol.textContent = '−';
    }));
    collapse.addEventListener('click', () => items.forEach((item) => {
      item.trigger.setAttribute('aria-expanded', 'false'); item.detail.hidden = true; item.symbol.textContent = '+';
    }));
    article.append(header, intro, list);
    return article;
  };

  const createSpeechAnalysisSlide = (analysis) => {
    const article = document.createElement('article');
    article.className = 'package-speech-analysis-slide';
    article.setAttribute('aria-label', analysis.title);
    const header = document.createElement('header');
    header.className = 'package-report-slide-header';
    const sequence = document.createElement('span');
    sequence.className = 'package-report-slide-sequence';
    sequence.textContent = analysis.sequence;
    const title = document.createElement('h4');
    title.textContent = analysis.title;
    const author = document.createElement('p');
    author.className = 'package-report-slide-author';
    author.textContent = analysis.author;
    header.append(sequence, title, author);

    const charts = document.createElement('div');
    charts.className = 'package-speech-chart-grid';
    analysis.charts.forEach((chartData) => {
      const panel = document.createElement('section');
      panel.className = 'package-speech-chart-panel';
      const heading = document.createElement('h5');
      heading.textContent = chartData.title;
      const subtitle = document.createElement('p');
      subtitle.textContent = chartData.subtitle;
      const content = document.createElement('div');
      content.className = 'package-speech-chart-content';
      const figure = document.createElement('figure');
      figure.className = 'package-speech-donut';
      const image = document.createElement('img');
      image.src = chartData.src;
      image.alt = '';
      image.loading = 'lazy';
      image.decoding = 'async';
      const center = document.createElement('figcaption');
      center.className = 'package-speech-donut-center';
      const value = document.createElement('strong');
      value.textContent = chartData.centerValue;
      const label = document.createElement('span');
      label.textContent = chartData.centerLabel;
      center.append(value, label);
      figure.append(image, center);
      const legend = document.createElement('ul');
      legend.className = 'package-speech-chart-legend';
      chartData.legend.forEach(([labelText, percent, color]) => {
        const item = document.createElement('li');
        const key = document.createElement('span');
        key.className = 'package-speech-legend-key';
        key.style.setProperty('--legend-color', color);
        const text = document.createElement('span');
        text.textContent = labelText;
        const amount = document.createElement('strong');
        amount.textContent = percent;
        item.append(key, text, amount);
        legend.append(item);
      });
      content.append(figure, legend);
      panel.append(heading, subtitle, content);
      charts.append(panel);
    });

    const matrix = document.createElement('section');
    matrix.className = 'package-exposure-matrix';
    const matrixHeader = document.createElement('header');
    matrixHeader.className = 'package-exposure-matrix-header';
    const heading = document.createElement('div');
    const matrixTitle = document.createElement('h5');
    matrixTitle.textContent = analysis.matrixTitle;
    const matrixSubtitle = document.createElement('p');
    matrixSubtitle.textContent = analysis.matrixSubtitle;
    heading.append(matrixTitle, matrixSubtitle);
    const scale = document.createElement('span');
    scale.textContent = 'Scale: 0–100%';
    matrixHeader.append(heading, scale);
    const table = document.createElement('div');
    table.className = 'package-exposure-table';
    table.setAttribute('role','table');
    table.setAttribute('aria-label',analysis.matrixTitle);
    const columns = ['Context','Audience','Confidence','Vocal Composure','Boundary Firmness','Observed Tendency'];
    columns.forEach((col) => {
      const cell = document.createElement('div');
      cell.className = 'package-exposure-cell package-exposure-heading';
      cell.setAttribute('role','columnheader');
      cell.textContent = col;
      table.append(cell);
    });
    analysis.rows.forEach(([context,audience,confidence,vocal,boundary,tendency]) => {
      const contextCell = document.createElement('strong');
      contextCell.className='package-exposure-cell';
      contextCell.setAttribute('role','cell');
      contextCell.textContent=context;
      const audienceCell = document.createElement('span');
      audienceCell.className='package-exposure-cell package-exposure-audience';
      audienceCell.setAttribute('role','cell');
      audienceCell.textContent=audience;
      table.append(contextCell,audienceCell);
      [[confidence,'confidence'],[vocal,'vocal'],[boundary,'boundary']].forEach(([score,type]) => {
        const cell=document.createElement('div');
        cell.className='package-exposure-cell package-exposure-meter-cell';
        cell.setAttribute('role','cell');
        const value=document.createElement('strong');
        value.textContent=`${score}%`;
        const track=document.createElement('span');
        track.className=`package-exposure-meter package-exposure-meter-${type}`;
        const fill=document.createElement('span');
        fill.style.width=`${score}%`;
        if(type==='confidence') fill.classList.add(score>=70?'is-high':score>=40?'is-mid':'is-low');
        else if(score<30) fill.classList.add('is-low');
        track.append(fill);
        cell.append(value,track);
        table.append(cell);
      });
      const tendencyCell=document.createElement('span');
      tendencyCell.className='package-exposure-cell package-exposure-tendency';
      tendencyCell.setAttribute('role','cell');
      tendencyCell.textContent=tendency;
      table.append(tendencyCell);
    });
    matrix.append(matrixHeader,table);
    article.append(header,charts,matrix);
    return article;
  };

  const renderGallery = () => {
    const demo = demos[currentSlide];
    const galleryImages = editorialPhotoFocused
      ? [['assets/hero-seated.webp', 'Shalini Rathod in a landscape editorial portrait']]
      : demo.images || [];
    if (galleryTrack) {
      packageGallery?.classList.toggle('is-editorial-focused', editorialPhotoFocused);
      packageGallery?.classList.toggle('is-slide-preview', Boolean(demo.reportSlide || demo.scorecard || demo.speechAnalysis) && !editorialPhotoFocused);
      if (!editorialPhotoFocused && (demo.reportSlide || demo.scorecard || demo.speechAnalysis)) {
        galleryTrack.replaceChildren(demo.speechAnalysis ? createSpeechAnalysisSlide(demo.speechAnalysis) : demo.scorecard ? createScorecardSlide(demo.scorecard) : createReportSlide(demo.reportSlide));
      } else {
        galleryTrack.replaceChildren(...galleryImages.map(([src, alt]) => {
          const image = document.createElement('img');
          image.src = src;
          image.alt = alt;
          image.loading = 'lazy';
          image.decoding = 'async';
          return image;
        }));
      }
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
