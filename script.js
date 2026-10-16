// Arrow labels use a vector icon to stay sharp and vertically centered in all browsers.
function setCtaArrowLabel(target, label) {
  if (!target) return;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'cta-arrow-icon');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M4 12h16m-7-7 7 7-7 7');
  svg.append(path);
  target.replaceChildren(document.createTextNode(label), svg);
}

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const mobileLinks = mobileMenu ? Array.from(mobileMenu.querySelectorAll('.mobile-menu-links a, .mobile-actions a')) : [];
const mobileNavLinks = mobileMenu ? Array.from(mobileMenu.querySelectorAll('.mobile-menu-links a')) : [];
const mobileMenuBackdrop = mobileMenu ? mobileMenu.querySelector('.mobile-menu-backdrop') : null;

function setMenu(open) {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  mobileMenu.hidden = !open;
  document.body.classList.toggle('mobile-nav-open', open);
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  if (mobileMenuBackdrop) {
    mobileMenuBackdrop.addEventListener('click', () => setMenu(false));
  }

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (link.closest('.mobile-menu-links')) {
        mobileNavLinks.forEach((item) => item.classList.toggle('active', item === link));
      }
      setMenu(false);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuToggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1080) setMenu(false);
  });
}

// Keep the active underline behavior feeling like the reference navigation.
const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
desktopLinks.forEach((link) => {
  link.addEventListener('click', () => {
    desktopLinks.forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
  });
});


// Never leave broken-image icons visible. Any image with data-fallback will
// automatically swap to the local fallback asset if its source cannot load.
document.querySelectorAll('img[data-fallback]').forEach((image) => {
  image.addEventListener('error', () => {
    const fallback = image.dataset.fallback;
    if (fallback && image.getAttribute('src') !== fallback) {
      image.src = fallback;
    }
  }, { once: true });
});

// Guest appearances carousel: arrows, dots, keyboard-friendly native scrolling.
const appearanceCarousel = document.querySelector('.appearance-carousel');
const appearancePrev = document.querySelector('.carousel-prev');
const appearanceNext = document.querySelector('.carousel-next');
const appearanceDots = Array.from(document.querySelectorAll('.carousel-dot'));

if (appearanceCarousel && appearancePrev && appearanceNext && appearanceDots.length) {
  const maxScroll = () => Math.max(0, appearanceCarousel.scrollWidth - appearanceCarousel.clientWidth);

  const setDot = (index) => {
    const safeIndex = Math.max(0, Math.min(index, appearanceDots.length - 1));
    appearanceDots.forEach((dot, i) => dot.classList.toggle('active', i === safeIndex));
  };

  const updateCarouselState = () => {
    const maximum = maxScroll();
    const progress = maximum > 0 ? appearanceCarousel.scrollLeft / maximum : 0;
    const dotIndex = Math.round(progress * (appearanceDots.length - 1));
    setDot(dotIndex);
    appearancePrev.disabled = appearanceCarousel.scrollLeft <= 2;
    appearanceNext.disabled = appearanceCarousel.scrollLeft >= maximum - 2;
  };

  const scrollByCard = (direction) => {
    const card = appearanceCarousel.querySelector('.appearance-card');
    if (!card) return;
    const gap = parseFloat(getComputedStyle(appearanceCarousel).gap) || 0;
    appearanceCarousel.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: 'smooth'
    });
  };

  appearancePrev.addEventListener('click', () => scrollByCard(-1));
  appearanceNext.addEventListener('click', () => scrollByCard(1));

  appearanceDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const target = maxScroll() * (index / (appearanceDots.length - 1));
      appearanceCarousel.scrollTo({ left: target, behavior: 'smooth' });
      setDot(index);
    });
  });

  appearanceCarousel.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateCarouselState);
  }, { passive: true });

  window.addEventListener('resize', updateCarouselState);
  updateCarouselState();
}

// Flagship service cards carousel: keep the desktop three-card layout while
// making the fourth card reachable with the same arrows and position dots.
const servicesCarousel = document.querySelector('#flagship-services');
const servicesControls = document.querySelector('.services-carousel-controls');
const servicesPrev = document.querySelector('.services-carousel-prev');
const servicesNext = document.querySelector('.services-carousel-next');
const servicesDotsRoot = document.querySelector('.services-carousel-dots');

if (servicesCarousel && servicesControls && servicesPrev && servicesNext && servicesDotsRoot) {
  const cards = () => Array.from(servicesCarousel.querySelectorAll('.service-card'));
  const maxScroll = () => Math.max(0, servicesCarousel.scrollWidth - servicesCarousel.clientWidth);
  const scrollStep = () => {
    const card = cards()[0];
    if (!card) return servicesCarousel.clientWidth;
    const gap = parseFloat(getComputedStyle(servicesCarousel).gap) || 0;
    return card.getBoundingClientRect().width + gap;
  };
  const stopCount = () => Math.round(maxScroll() / Math.max(1, scrollStep())) + 1;
  const setActiveDot = (index) => {
    Array.from(servicesDotsRoot.children).forEach((dot, i) => {
      dot.setAttribute('aria-current', String(i === index));
    });
  };
  const updateServicesCarousel = () => {
    const maximum = maxScroll();
    const dots = Array.from(servicesDotsRoot.children);
    const active = maximum > 0 && dots.length > 1
      ? Math.round((servicesCarousel.scrollLeft / maximum) * (dots.length - 1))
      : 0;
    setActiveDot(active);
    servicesPrev.disabled = servicesCarousel.scrollLeft <= 10;
    servicesNext.disabled = servicesCarousel.scrollLeft >= maximum - 10;
  };
  const buildServicesDots = () => {
    const count = stopCount();
    servicesDotsRoot.replaceChildren();
    for (let index = 0; index < count; index += 1) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'services-carousel-dot';
      dot.setAttribute('aria-label', `Show service card group ${index + 1} of ${count}`);
      dot.setAttribute('aria-current', String(index === 0));
      dot.addEventListener('click', () => {
        const maximum = maxScroll();
        servicesCarousel.scrollTo({
          left: count > 1 ? maximum * (index / (count - 1)) : 0,
          behavior: 'smooth'
        });
        setActiveDot(index);
      });
      servicesDotsRoot.appendChild(dot);
    }
    servicesControls.hidden = count <= 1;
    servicesDotsRoot.hidden = count <= 1;
    updateServicesCarousel();
  };
  const scrollServices = (direction) => {
    servicesCarousel.scrollBy({ left: direction * scrollStep(), behavior: 'smooth' });
  };

  servicesPrev.addEventListener('click', () => scrollServices(-1));
  servicesNext.addEventListener('click', () => scrollServices(1));
  servicesCarousel.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateServicesCarousel);
  }, { passive: true });
  window.addEventListener('resize', buildServicesDots);
  buildServicesDots();
}


// Recognition marquee: pause at the exact current position while any card is hovered.
// Resume from the same point when the pointer leaves. Keyboard focus pauses it too.
const recognitionTrack = document.querySelector('.recognition-track');
const recognitionCards = document.querySelectorAll('.recognition-card');

if (recognitionTrack && recognitionCards.length) {
  const pauseRecognition = () => recognitionTrack.classList.add('is-paused');
  const resumeRecognition = () => recognitionTrack.classList.remove('is-paused');

  recognitionCards.forEach((card) => {
    card.addEventListener('mouseenter', pauseRecognition);
    card.addEventListener('mouseleave', resumeRecognition);
    card.addEventListener('focusin', pauseRecognition);
    card.addEventListener('focusout', resumeRecognition);
  });
}

// Email-only inquiries: static website, no hidden submission or API.
const inquiryForm = document.querySelector('#inquiry-form');
const inquiryStatus = document.querySelector('#inquiry-status');
function createInquiryDraft(form, status, subject, details) {
  const email = 'shalinirathodofficial@gmail.com';
  const body = Object.entries(details).map(([label,value])=>`${label}: ${String(value || '').trim()}`).join('\n');
  const draft = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  if (!status) return;
  status.replaceChildren();
  const lead = document.createElement('span');
  lead.textContent = 'Your request has NOT been sent. Open the email draft below and press Send in your mail app. ';
  const link = document.createElement('a');link.href=draft;setCtaArrowLabel(link, 'Open email draft');link.className='frontend-email-action';
  const copy = document.createElement('button');copy.type='button';copy.className='frontend-copy-action';copy.textContent='Copy message';
  copy.addEventListener('click',async()=>{const content=`To: ${email}\nSubject: ${subject}\n\n${body}`;try{await navigator.clipboard.writeText(content);copy.textContent='Copied ✓';}catch{window.prompt('Copy your message:',content);}});
  status.append(lead,link,document.createTextNode('  '),copy);
}
if(inquiryForm) inquiryForm.addEventListener('submit',event=>{
  event.preventDefault();if(!inquiryForm.checkValidity()){inquiryForm.reportValidity();return;}
  const fields=Object.fromEntries(new FormData(inquiryForm).entries());
  createInquiryDraft(inquiryForm,inquiryStatus,'Website inquiry — Shalini Rathod',fields);
});

// Services page catalog: 30/60-minute consultation switching, search, and filters.
const durationButtons = Array.from(document.querySelectorAll('.calls-duration-toggle [data-duration]'));
const callCards = Array.from(document.querySelectorAll('.calls-grid .call-card'));
const homeCallDurationButtons = Array.from(document.querySelectorAll('.home-page .service-toggle [data-duration]'));

homeCallDurationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.service-card');
    const duration = button.dataset.duration;
    card?.querySelectorAll('.service-toggle [data-duration]').forEach((option) => {
      const active = option === button;
      option.classList.toggle('active', active);
      option.setAttribute('aria-pressed', String(active));
    });
    const price = card?.querySelector('.service-price');
    const subtitle = card?.querySelector('.service-subtitle');
    const ctaLabel = card?.querySelector('[data-home-booking-label]');
    if (price) price.innerHTML = duration === '30'
      ? (card.dataset.offer30 || price.dataset.price30 || price.innerHTML)
      : (card.dataset.offer60 || price.dataset.price60 || price.innerHTML);
    if (subtitle) subtitle.textContent = duration === '30'
      ? (card.dataset.subtitle30 || 'Laser Diagnostic Call')
      : (card.dataset.subtitle60 || (button.closest('.service-toggle')?.children[1]?.textContent.includes('Makeover') ? 'Signature Image Makeover' : 'Comprehensive Deep Dive'));
    if (ctaLabel) ctaLabel.textContent = `Book ${duration} Mins Call`;
  });
});

if (durationButtons.length && callCards.length) {
  const setDuration = (duration) => {
    durationButtons.forEach((button) => {
      const active = button.dataset.duration === duration;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    callCards.forEach((card) => {
      card.querySelectorAll('[data-duration-label]').forEach((label) => {
        label.textContent = `${duration}min`;
      });

      card.querySelectorAll('[data-duration-list]').forEach((list) => {
        list.hidden = list.dataset.durationList !== duration;
      });

      card.querySelectorAll('[data-duration-ideal]').forEach((ideal) => {
        ideal.hidden = ideal.dataset.durationIdeal !== duration;
      });

      const price = card.querySelector('.call-price');
      if (price) {
        price.textContent = duration === '60' ? price.dataset.price60 : price.dataset.price30;
      }
    });
  };

  durationButtons.forEach((button) => {
    button.addEventListener('click', () => setDuration(button.dataset.duration));
  });

  setDuration('30');
}

const servicesFilterTabs = Array.from(document.querySelectorAll('.services-filter-tab'));
const servicesSearchInput = document.querySelector('#services-search-input');
const servicesSearchEmpty = document.querySelector('#services-search-empty');
const callsSection = document.querySelector('[data-service-section="calls"]');
const packagesSection = document.querySelector('[data-service-section="packages"]');
const coursesSection = document.querySelector('[data-service-section="courses"]');
const packageCards = Array.from(document.querySelectorAll('.packages-grid .package-card'));
const courseCards = Array.from(document.querySelectorAll('.learning-grid .learning-card'));

if (servicesFilterTabs.length && (callsSection || packagesSection || coursesSection)) {
  let activeServiceFilter = 'all';

  const applyServiceFiltering = () => {
    const query = (servicesSearchInput?.value || '').trim().toLowerCase();
    let visibleTotal = 0;

    let visibleCalls = 0;
    callCards.forEach((card) => {
      const categoryMatch = activeServiceFilter === 'all' || activeServiceFilter === 'calls';
      const haystack = `${card.dataset.search || ''} ${card.textContent || ''}`.toLowerCase();
      const queryMatch = !query || haystack.includes(query);
      const show = categoryMatch && queryMatch;
      card.hidden = !show;
      if (show) {
        visibleCalls += 1;
        visibleTotal += 1;
      }
    });
    if (callsSection) callsSection.hidden = visibleCalls === 0;

    let visiblePackages = 0;
    packageCards.forEach((card) => {
      const categoryMatch = activeServiceFilter === 'all' || activeServiceFilter === 'packages';
      const haystack = `${card.dataset.search || ''} ${card.textContent || ''}`.toLowerCase();
      const queryMatch = !query || haystack.includes(query);
      const show = categoryMatch && queryMatch;
      card.hidden = !show;
      if (show) {
        visiblePackages += 1;
        visibleTotal += 1;
      }
    });
    if (packagesSection) packagesSection.hidden = visiblePackages === 0;

    let visibleCourses = 0;
    courseCards.forEach((card) => {
      const categoryMatch = activeServiceFilter === 'all' || activeServiceFilter === 'courses';
      const haystack = `${card.dataset.search || ''} ${card.textContent || ''}`.toLowerCase();
      const queryMatch = !query || haystack.includes(query);
      const show = categoryMatch && queryMatch;
      card.hidden = !show;
      if (show) {
        visibleCourses += 1;
        visibleTotal += 1;
      }
    });
    if (coursesSection) coursesSection.hidden = visibleCourses === 0;

    if (servicesSearchEmpty) servicesSearchEmpty.hidden = visibleTotal !== 0;
  };

  servicesFilterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      activeServiceFilter = tab.dataset.serviceFilter || 'all';
      servicesFilterTabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
      });
      applyServiceFiltering();
    });
  });

  servicesSearchInput?.addEventListener('input', applyServiceFiltering);
  applyServiceFiltering();
}

// Services FAQ accordion: keep one answer open at a time, matching the reference interaction.
const serviceFaqItems = Array.from(document.querySelectorAll('.services-faq-item'));

if (serviceFaqItems.length) {
  const setFaqItem = (item, open) => {
    const button = item.querySelector('.services-faq-question');
    const answer = item.querySelector('.services-faq-answer');
    const chevronPath = item.querySelector('.services-faq-chevron path');
    if (!button || !answer) return;

    item.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    answer.hidden = !open;
    if (chevronPath) {
      chevronPath.setAttribute('d', open ? 'm5.5 12 4.5-4.5 4.5 4.5' : 'm5.5 8 4.5 4.5 4.5-4.5');
    }
  };

  serviceFaqItems.forEach((item) => {
    const button = item.querySelector('.services-faq-question');
    if (!button) return;

    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      serviceFaqItems.forEach((otherItem) => setFaqItem(otherItem, false));
      if (!isOpen) setFaqItem(item, true);
    });
  });
}

// Services booking modal: multi-step consultation / package / course reservation flow.
const bookingModal = document.querySelector('#booking-modal');

if (bookingModal) {
  const bookingDialog = bookingModal.querySelector('.booking-dialog');
  const bookingBackdrop = bookingModal.querySelector('.booking-modal-backdrop');
  const bookingClose = bookingModal.querySelector('.booking-close');
  const bookingTriggers = Array.from(document.querySelectorAll('.booking-trigger'));
  const bookingSteps = Array.from(bookingModal.querySelectorAll('[data-booking-step]'));
  const bookingStepCount = bookingModal.querySelector('#booking-step-count');
  const offeringSelect = bookingModal.querySelector('#booking-offering');
  const durationWrap = bookingModal.querySelector('#booking-duration-wrap');
  const durationOptions = Array.from(bookingModal.querySelectorAll('[data-booking-duration]'));
  const scheduleBox = bookingModal.querySelector('#booking-schedule-box');
  const scheduleDateLabel = bookingModal.querySelector('#booking-date-label');
  const bookingDate = bookingModal.querySelector('#booking-date');
  const bookingTime = bookingModal.querySelector('#booking-time');
  const timeSlotStarts = Array.from(bookingTime?.options || []).map((option) => option.value);
  const bookingTotal = bookingModal.querySelector('#booking-total');
  const bookingContinue = bookingModal.querySelector('#booking-continue');
  const bookingBack = bookingModal.querySelector('#booking-back');
  const bookingForm = bookingModal.querySelector('.booking-step-two');
  const bookingName = bookingModal.querySelector('#booking-name');
  const bookingEmail = bookingModal.querySelector('#booking-email');
  const bookingPhone = bookingModal.querySelector('#booking-phone');
  const bookingChallenge = bookingModal.querySelector('#booking-challenge');
  const summaryTitle = bookingModal.querySelector('#booking-summary-title');
  const summaryDate = bookingModal.querySelector('#booking-summary-date');
  const summaryPrice = bookingModal.querySelector('#booking-summary-price');
  const confirmLabel = bookingModal.querySelector('#booking-confirm-label');
  const confirmationName = bookingModal.querySelector('#booking-confirmation-name');
  const confirmationSummary = bookingModal.querySelector('#booking-confirmation-summary');
  const sendRequest = bookingModal.querySelector('#booking-send-request');
  const bookingDone = bookingModal.querySelector('#booking-done');

  const offerings = {
    discovery: {
      label: '15-Min Discovery Call',
      fullLabel: '15-Min Discovery Call (Free · Direct with Shalini)',
      type: 'discovery',
      price: 0,
      duration: 15,
      needsSchedule: true
    },
    'comm-call': {
      label: '1:1 Call: Communication & Confidence',
      fullLabel: '1:1 Communication & Confidence',
      type: 'call',
      prices: { '30': 3750, '60': 7999 },
      needsSchedule: true
    },
    'style-call': {
      label: '1:1 Call: Image Styling & Confidence',
      fullLabel: '1:1 Image Styling & Confidence',
      type: 'call',
      prices: { '30': 3750, '60': 7999 },
      needsSchedule: true
    },
    'comm-package': {
      label: 'Communication Skills & Confidence Makeover',
      fullLabel: 'Communication Skills & Confidence Makeover (7 Sessions)',
      type: 'package',
      price: 34999,
      duration: '7 Sessions',
      needsSchedule: true
    },
    'style-package': {
      label: 'Image & Styling Makeover',
      fullLabel: 'Image & Styling Makeover (7 Sessions)',
      type: 'package',
      price: 38999,
      duration: '7 Sessions',
      needsSchedule: true
    },
    speakathon: {
      label: '21-Day Speakathon Challenge',
      fullLabel: '21-Day Speakathon Challenge',
      type: 'course',
      price: 5999,
      duration: 'Lifetime Access',
      needsSchedule: false
    },
    'styling-course': {
      label: 'Power Dressing / Styling',
      fullLabel: 'Power Dressing / Styling',
      type: 'course',
      price: 3499,
      duration: 'Lifetime Access',
      needsSchedule: false
    },
    'dining-etiquette': {
      label: 'Dining Etiquette',
      fullLabel: 'Dining Etiquette Self-Paced Course',
      type: 'course',
      price: 3499,
      duration: 'Lifetime Access',
      needsSchedule: false
    },
    'communication-training': {label: 'Professional Communication Training', fullLabel: '5-Session Professional Communication Training', type: 'package', price: 49999, duration: '5 Sessions', needsSchedule: true},
    'complete-makeover': {label: 'Complete Image Transformation', fullLabel: '5-Session Complete Image Transformation', type: 'package', price: 70000, duration: '5 Sessions', needsSchedule: true},
    'power-bundle': {
      label: 'The Power Bundle',
      fullLabel: 'The Power Bundle',
      type: 'course',
      price: 4999,
      duration: 'Lifetime Access',
      needsSchedule: false
    }
  };

  let selectedDuration = '60';
  let lastBookingTrigger = null;

  const formatMoney = (amount) => amount === 0
    ? 'Free'
    : `₹${Number(amount).toLocaleString('en-IN')}`;

  const getOffering = () => offerings[offeringSelect?.value] || offerings['comm-call'];

  const getPrice = () => {
    const offering = getOffering();
    if (offering.type === 'call') return offering.prices[selectedDuration];
    return offering.price;
  };

  const setBookingStep = (step) => {
    bookingSteps.forEach((panel) => {
      panel.hidden = panel.dataset.bookingStep !== String(step);
    });
    if (bookingStepCount) bookingStepCount.textContent = `STEP ${step} OF 3`;
    if (bookingDialog) bookingDialog.scrollTop = 0;
  };

  const setDuration = (duration) => {
    selectedDuration = String(duration);
    durationOptions.forEach((button) => {
      const active = button.dataset.bookingDuration === selectedDuration;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    updateTimeSlots();
    updateBookingUI();
  };

  const toMinutes = (time) => {
    const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!match) return null;
    let hours = Number(match[1]) % 12;
    if (match[3].toUpperCase() === 'PM') hours += 12;
    return hours * 60 + Number(match[2]);
  };
  const formatClock = (minutes) => {
    const hours24 = Math.floor(minutes / 60) % 24;
    const hours12 = hours24 % 12 || 12;
    const suffix = hours24 >= 12 ? 'PM' : 'AM';
    return `${String(hours12).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')} ${suffix}`;
  };
  const updateTimeSlots = () => {
    if (!bookingTime || !timeSlotStarts.length) return;
    const currentStart = bookingTime.value.split(' - ')[0];
    const duration = getOffering().type === 'call' ? Number(selectedDuration) : 60;
    const fragment = document.createDocumentFragment();
    timeSlotStarts.forEach((slot) => {
      const [start, rest = ''] = slot.split(' - ');
      const startMinutes = toMinutes(start);
      const originalEnd = rest.match(/^(\d{1,2}:\d{2}\s*(?:AM|PM))/i)?.[1];
      const end = startMinutes === null ? originalEnd : formatClock(startMinutes + duration);
      const suffix = rest.slice(originalEnd?.length || 0);
      const option = document.createElement('option');
      option.value = `${start} - ${end}${suffix}`;
      option.textContent = option.value;
      fragment.append(option);
    });
    bookingTime.replaceChildren(fragment);
    const matchingOption = Array.from(bookingTime.options).find((option) => option.value.startsWith(`${currentStart} - `));
    if (matchingOption) matchingOption.selected = true;
  };

  const updateBookingUI = () => {
    const offering = getOffering();
    const price = getPrice();

    if (durationWrap) durationWrap.hidden = offering.type !== 'call';
    if (scheduleBox) scheduleBox.hidden = !offering.needsSchedule;
    if (bookingDate) bookingDate.required = Boolean(offering.needsSchedule);
    if (bookingTime) bookingTime.required = Boolean(offering.needsSchedule);

    if (scheduleDateLabel) {
      scheduleDateLabel.textContent = offering.type === 'package'
        ? 'SELECT PREFERRED START DATE & TIME:'
        : 'SELECT PREFERRED DATE & TIME:';
    }

    if (bookingTotal) bookingTotal.textContent = formatMoney(price);

    const durationText = offering.type === 'call'
      ? `${selectedDuration}min`
      : offering.duration || '';
    const summaryLabel = durationText ? `${offering.label} (${durationText})` : offering.label;

    if (summaryTitle) summaryTitle.textContent = summaryLabel;
    if (summaryPrice) summaryPrice.textContent = formatMoney(price);

    if (confirmLabel) {
      confirmLabel.textContent = offering.type === 'course'
        ? `Continue Enrollment (${formatMoney(price)})`
        : `Confirm & Reserve Slot (${formatMoney(price)})`;
    }
  };

  const setDefaultDate = () => {
    if (!bookingDate) return;
    const today = new Date();
    const min = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const preferred = new Date(min);
    preferred.setDate(preferred.getDate() + 2);
    const toIso = (date) => {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    };
    bookingDate.min = toIso(min);
    if (!bookingDate.value || bookingDate.value < bookingDate.min) {
      bookingDate.value = toIso(preferred);
    }
  };

  const openBooking = (offerKey = 'comm-call') => {
    const safeOffer = offerings[offerKey] ? offerKey : 'comm-call';
    if (offeringSelect) offeringSelect.value = safeOffer;

    if (safeOffer === 'comm-call' || safeOffer === 'style-call') {
      if (lastBookingTrigger?.classList.contains('call-book-btn') || lastBookingTrigger?.closest('.service-card')) {
        const homeDuration = lastBookingTrigger.closest('.service-card')?.querySelector('.service-toggle [data-duration].active');
        const activeCallDuration = homeDuration || lastBookingTrigger.closest('.call-card')?.querySelector('.calls-duration-toggle [data-duration].active') || document.querySelector('.calls-duration-toggle [data-duration].active');
        selectedDuration = activeCallDuration?.dataset.duration || '60';
      } else {
        // Generic "Book a Session" buttons follow the reference and start on the 60-minute deep dive.
        selectedDuration = '60';
      }
    } else {
      selectedDuration = '60';
    }

    durationOptions.forEach((button) => {
      const active = button.dataset.bookingDuration === selectedDuration;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    setDefaultDate();
    updateTimeSlots();
    updateBookingUI();
    setBookingStep(1);
    bookingModal.hidden = false;
    bookingModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('booking-open');
    window.requestAnimationFrame(() => bookingClose?.focus());
  };

  const closeBooking = () => {
    bookingModal.hidden = true;
    bookingModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('booking-open');
    setBookingStep(1);
    lastBookingTrigger?.focus?.();
  };

  const getReadableDateTime = () => {
    const offering = getOffering();
    if (!offering.needsSchedule) return 'Lifetime access · Start after enrollment';
    const date = bookingDate?.value || '';
    const time = bookingTime?.value || '';
    const shortTime = time.split(' - ')[0] || time;
    return date ? `${date} at ${shortTime}` : shortTime;
  };

  bookingTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      lastBookingTrigger = trigger;
      if (menuToggle?.getAttribute('aria-expanded') === 'true') setMenu(false);
      openBooking(trigger.dataset.bookingOffer || 'comm-call');
    });
  });

  durationOptions.forEach((button) => {
    button.addEventListener('click', () => setDuration(button.dataset.bookingDuration || '60'));
  });

  offeringSelect?.addEventListener('change', () => {
    updateTimeSlots();
    updateBookingUI();
  });

  bookingContinue?.addEventListener('click', () => {
    const offering = getOffering();
    if (offering.needsSchedule && bookingDate && !bookingDate.value) {
      bookingDate.focus();
      bookingDate.showPicker?.();
      return;
    }
    updateBookingUI();
    if (offering.type === 'course') {
      const courseSlug = {speakathon:'speakathon', 'styling-course':'power-dressing', 'dining-etiquette':'dining-etiquette', 'power-bundle':'power-bundle'}[offeringSelect.value];
      if (courseSlug) { window.location.href = `lms-course.html?course=${encodeURIComponent(courseSlug)}`; return; }
    }
    if (summaryDate) summaryDate.textContent = getReadableDateTime();
    setBookingStep(2);
    bookingName?.focus();
  });

  bookingBack?.addEventListener('click', () => {
    setBookingStep(1);
    offeringSelect?.focus();
  });

  bookingForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!bookingForm.checkValidity()) { bookingForm.reportValidity(); return; }
    const offering = getOffering();
    const name=bookingName.value.trim();
    const email=bookingEmail.value.trim();
    const detail={Name:name,Email:email,Phone:bookingPhone.value.trim(),Service:offering.fullLabel,
      Duration: offering.type==='call'?selectedDuration+' minutes':String(offering.duration||''),
      'Preferred date':bookingDate?.value||'To arrange','Preferred time':bookingTime?.value||'To arrange',
      Notes:bookingChallenge?.value||'None provided'};
    const body=Object.entries(detail).map(([key,value])=>key+': '+value).join('\n');
    const subject='Booking inquiry — '+offering.fullLabel;
    const emailContent=`To: shalinirathodofficial@gmail.com\nSubject: ${subject}\n\n${body}`;
    const mailto=`mailto:shalinirathodofficial@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if(confirmationName) confirmationName.textContent=name;
    if(confirmationSummary) confirmationSummary.textContent=`${offering.fullLabel} · ${getReadableDateTime()} · DRAFT ONLY (not yet submitted)`;
    const kicker=bookingModal.querySelector('.booking-confirmation-kicker');
    if(kicker) kicker.textContent='YOUR EMAIL DRAFT IS READY';
    const finalMsg=bookingModal.querySelector('.booking-step-three > p:not(.booking-confirmation-kicker)');
    if(finalMsg) finalMsg.textContent='No booking has been made. Click the email button below, then press Send in your email application. Time availability will be confirmed separately.';
    if(sendRequest){sendRequest.hidden=false;sendRequest.href=mailto;setCtaArrowLabel(sendRequest, 'Open Email App to Send');}
    const copyBtn=bookingModal.querySelector('#booking-copy-request');
    if(copyBtn){copyBtn.onclick=async()=>{try{await navigator.clipboard.writeText(emailContent);copyBtn.textContent='Message Copied ✓';}catch{window.prompt('Copy this request:',emailContent);}};copyBtn.textContent='Copy Request';}
    if(confirmLabel) confirmLabel.textContent='Prepare Booking Email';
    setBookingStep(3);
  });

  bookingBackdrop?.addEventListener('click', closeBooking);
  bookingClose?.addEventListener('click', closeBooking);
  bookingDone?.addEventListener('click', closeBooking);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !bookingModal.hidden) closeBooking();
  });

  // Keep tab focus inside the open modal.
  bookingModal.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab' || bookingModal.hidden) return;
    const focusable = Array.from(bookingDialog.querySelectorAll(
      'button:not([disabled]):not([hidden]), a[href]:not([hidden]), input:not([disabled]):not([hidden]), select:not([disabled]):not([hidden]), textarea:not([disabled]):not([hidden])'
    )).filter((el) => el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  setDefaultDate();
  updateBookingUI();
  const requestedOffer = new URLSearchParams(location.search).get('book');
  if (requestedOffer && offerings[requestedOffer]) {
    lastBookingTrigger = document.querySelector('.services-book-btn');
    openBooking(requestedOffer);
  }
}


// Shared presentation slider for both package cards.
(() => {
  document.querySelectorAll('[data-curated-canva-carousel]').forEach((root) => {
    const base = root.dataset.assets;
    const title = root.dataset.slideTitle || 'Presentation';
    const pages = root.dataset.slidePages.split(',').map(Number);
    const slides = pages.map((page) => ({
      page,
      src: `${base}slide-${String(page).padStart(2, '0')}.jpg`,
    }));
    Promise.all(slides.map((slide) => new Promise((resolve, reject) => {
      const preloader = new Image();
      preloader.onload = () => resolve(slide);
      preloader.onerror = () => reject(new Error('Missing image: ' + slide.src));
      preloader.src = slide.src;
    }))).then(() => {
    const display = root.querySelector('.curated-canva-carousel__image');
    const dots = root.querySelector('.curated-canva-carousel__dots');
    const prev = root.querySelector('.curated-canva-carousel__arrow--prev');
    const next = root.querySelector('.curated-canva-carousel__arrow--next');
    const more = root.querySelector('.curated-canva-carousel__more');
    const fullscreen = root.querySelector('.curated-canva-carousel__fullscreen');
    let active = 0;
    let touchStartX = null;
    let controlsTimer;
    function revealTouchControls() {
      root.classList.add('is-controls-visible');
      clearTimeout(controlsTimer);
      controlsTimer = setTimeout(() => root.classList.remove('is-controls-visible'), 2500);
    }
    slides.forEach((slide, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'curated-canva-carousel__dot';
      dot.setAttribute('aria-label', `Show slide ${index + 1} of ${slides.length}`);
      dot.addEventListener('click', () => {
        select(index);
        dots.hidden = true;
        more.setAttribute('aria-expanded', 'false');
      });
      dots.appendChild(dot);
    });
    function select(index) {
      active = (index + slides.length) % slides.length;
      display.src = slides[active].src;
      display.alt = `${title} — slide ${slides[active].page} of ${slides.length}`;
      Array.from(dots.children).forEach((dot, i) => {
        dot.setAttribute('aria-current', String(i === active));
      });
    }
    prev.addEventListener('click', () => select(active - 1));
    next.addEventListener('click', () => select(active + 1));
    more.addEventListener('click', () => {
      dots.hidden = !dots.hidden;
      more.setAttribute('aria-expanded', String(!dots.hidden));
    });
    fullscreen.addEventListener('click', async () => {
      const picture = root.querySelector('.curated-canva-carousel__picture');
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else await picture.requestFullscreen();
      } catch (_) {
        // Fullscreen is optional when the browser does not allow it.
      }
    });
    document.addEventListener('fullscreenchange', () => {
      const isFullscreen = root.contains(document.fullscreenElement);
      root.classList.toggle('is-fullscreen', isFullscreen);
      const label = isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen';
      fullscreen.setAttribute('aria-label', label);
      fullscreen.title = label;
    });
    root.tabIndex = 0;
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); select(active - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); select(active + 1); }
    });
    root.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0]?.screenX ?? null;
      revealTouchControls();
    }, { passive: true });
    root.addEventListener('touchend', (e) => {
      if (touchStartX == null) return;
      const delta = (e.changedTouches[0]?.screenX ?? touchStartX) - touchStartX;
      touchStartX = null;
      if (Math.abs(delta) >= 35) select(active + (delta < 0 ? 1 : -1));
    }, { passive: true });
    select(0);
    }).catch(() => {
      // Keep each card's cover visible if a slide asset cannot be loaded.
    });
  });
})();

/* ===== Frontend-only academy: static pages, inline data, mailto, and learning preview ===== */
(() => {
  const menuButton=document.querySelector('[data-academy-menu]');
  const academyNav=document.querySelector('.academy-mobile-nav');
  if(menuButton && academyNav){
    const close=()=>{academyNav.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.textContent='☰';};
    menuButton.addEventListener('click',()=>{const show=academyNav.hidden;academyNav.hidden=!show;menuButton.setAttribute('aria-expanded',String(show));menuButton.textContent=show?'×':'☰';});
    academyNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!academyNav.hidden){close();menuButton.focus();}});
  }
  const params=new URLSearchParams(location.search);
  const catalog=window.SHALINI_COURSES || {};
  const money=value=>'₹'+Number(value).toLocaleString('en-IN');
  const issue=(form,message)=>{const el=form?.querySelector('.academy-form-status');if(el)el.textContent=message;};

  const contact=document.getElementById('academy-contact-form');
  if(contact){
    const type=params.get('type'),sel=contact.querySelector('#academy-contact-type');
    if(sel && type)sel.value=type==='corporate'?'Corporate Workshop':type==='courses'?'Courses':type==='consultation'?'Personal Mentorship':'General';
    if(params.get('course')){
      const message=contact.querySelector('textarea[name="message"]');
      if(message&&!message.value)message.value='I would like to know more about '+(catalog[params.get('course')]?.title||params.get('course'))+'.';
    }
    contact.addEventListener('submit',event=>{
      event.preventDefault();if(!contact.reportValidity())return;
      const payload=Object.fromEntries(new FormData(contact).entries());
      createInquiryDraft(contact,contact.querySelector('.academy-form-status'),'Contact inquiry — Shalini Rathod',payload);
    });
  }

  // This is a display-only profile, not an authenticated account.
  const authForm=document.getElementById('academy-auth-form');
  if(authForm){
    const tabs=[...document.querySelectorAll('[data-auth-tab]')];
    let mode=params.get('mode')==='signup'?'signup':'login';
    const switchTo=next=>{
      mode=next;
      tabs.forEach(t=>t.classList.toggle('is-active',t.dataset.authTab===mode));
      const title=authForm.querySelector('.academy-signup-field');
      if(title){title.hidden=mode!=='signup';title.querySelector('input').required=mode==='signup';}
      const button=authForm.querySelector('[type="submit"]');
      if(button)setCtaArrowLabel(button, mode==='signup'?'Create Demo Profile':'Open LMS Preview');
      issue(authForm,'');
    };
    tabs.forEach(tab=>tab.addEventListener('click',()=>switchTo(tab.dataset.authTab)));
    switchTo(mode);
    authForm.addEventListener('submit',event=>{
      event.preventDefault();if(!authForm.reportValidity())return;
      const name=authForm.querySelector('[name="name"]')?.value?.trim();
      // Only the optional first name is carried into the preview URL. No emails or passwords are stored.
      const next=new URLSearchParams();if(params.get('course'))next.set('course',params.get('course'));if(name)next.set('name',name.split(/\s+/)[0]);location.href='lms-learn.html'+(next.size?'?'+next.toString():'');
    });
  }

  // Course catalog is bundled as a JS constant, so file:// viewing works without fetch.
  const courseRoot=document.querySelector('#academy-course-title');
  if(courseRoot){
    const slug=params.get('course')||'speakathon';
    // Preserve older links but open the dedicated Hostinger-inspired Speakathon page.
    if(slug==='speakathon'){location.replace('lms-course.html');return;}
    const record=catalog[slug];
    const button=document.getElementById('academy-course-enroll');
    const status=document.getElementById('academy-course-status');
    if(!record){courseRoot.textContent='Course not found';if(button)button.disabled=true;}
    else{
      document.title=record.title+' | Shalini Rathod Academy';
      courseRoot.textContent=record.title;
      document.getElementById('academy-course-description').textContent=record.description;
      document.getElementById('academy-course-price').textContent=money(record.price);
      document.getElementById('academy-course-pills').replaceChildren(...record.tags.map(tag=>{const el=document.createElement('span');el.textContent=tag;return el;}));
      document.getElementById('academy-course-inclusions').replaceChildren(...record.includes.map(item=>{const li=document.createElement('li');li.textContent=item;return li;}));
      document.getElementById('academy-curriculum').replaceChildren(...record.modules.map((group,index)=>{
        const details=document.createElement('details');details.open=index===0;
        const summary=document.createElement('summary');summary.textContent=group.title;
        const count=document.createElement('span');count.textContent=group.lessons.length+' lessons';summary.append(count);details.append(summary);
        group.lessons.forEach(lesson=>{
          const row=document.createElement('div');row.className='academy-lesson-row';
          const label=document.createElement('strong');label.textContent=lesson.title;
          const detail=document.createElement('span');detail.textContent=lesson.summary?'Practice outline':'Materials pending';
          row.append(label,detail);details.append(row);
        });return details;
      }));
      if(button){setCtaArrowLabel(button, 'Ask About Enrollment');button.addEventListener('click',()=>location.href='contact.html?type=courses&course='+encodeURIComponent(slug));}
      if(status){status.replaceChildren();const msg=document.createElement('span');msg.textContent='Frontend preview only — online payments and course enrollment are not active. ';
        const link=document.createElement('a');link.href='lms-learn.html?course='+encodeURIComponent(slug);setCtaArrowLabel(link, 'Preview lesson dashboard');status.append(msg,link);}
      const note=document.getElementById('academy-course-payment-note');if(note)note.textContent='Prices are indicative. Contact the Academy for enrollment; no payment is collected on this demo website.';
    }
  }

  const packageTitle=document.getElementById('academy-package-title');
  if(packageTitle){
    const isStyle=params.get('offer')==='style-package';
    packageTitle.textContent=isStyle?'Image & Styling Makeover':'Communication Skills & Confidence Makeover';
    document.getElementById('academy-package-description').textContent=isStyle?
      'A personalized 7-session styling journey with color guidance, body proportion assessment, wardrobe refinement and practical style planning.':
      'A bespoke seven-session communication transformation to sharpen your voice, presence and speaking confidence.';
    document.getElementById('academy-package-price').textContent=money(isStyle?38999:34999);
    const items=isStyle?['7 private one-on-one styling sessions','Virtual wardrobe audit','Personal color palette guidance','Custom Style Bible and outfit formulas','Personal recommendations and follow-up']:
      ['7 private 60-minute Zoom sessions','Between-session WhatsApp voice feedback','Video speech analysis and drills','Personalized speaker playbook','Voice and articulation assessment','Live corrections and practice exercises'];
    document.getElementById('academy-package-inclusions').replaceChildren(...items.map(item=>{const li=document.createElement('li');li.textContent=item;return li;}));
    document.getElementById('academy-package-book').href='services.html?book='+(isStyle?'style-package':'comm-package')+'#packages';
  }

  const dash=document.getElementById('academy-dashboard-courses');
  if(dash){
    const greeting=document.getElementById('academy-dashboard-greeting');
    if(greeting)greeting.textContent=params.get('name')?'Welcome, '+params.get('name')+'.':'Explore your learning space.';
    // Per-browser preview tracking is optional and never used as real enrollment proof.
    const memory={get(k){try{return JSON.parse(localStorage.getItem(k)||'[]');}catch{return[];}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch{}}};
    const slugs=Object.keys(catalog);
    const selected=params.get('course');if(selected&&slugs.includes(selected)){slugs.splice(slugs.indexOf(selected),1);slugs.unshift(selected);}
    dash.replaceChildren(...slugs.map(slug=>{
      const course=catalog[slug],lessons=course.modules.flatMap(group=>group.lessons),key='shalini-preview-'+slug;
      const done=memory.get(key);
      const card=document.createElement('article');card.className='academy-panel';
      const title=document.createElement('h3');title.textContent=course.title;
      const text=document.createElement('p');text.textContent=`${done.length} of ${lessons.length} practice outlines marked reviewed`;
      const track=document.createElement('div');track.className='academy-progress-track';const fill=document.createElement('span');track.append(fill);
      const update=()=>{text.textContent=`${done.length} of ${lessons.length} practice outlines marked reviewed`;fill.style.width=(100*done.length/Math.max(1,lessons.length))+'%';};update();
      const note=document.createElement('p');note.className='academy-small';note.textContent='LMS DEMO · Outline previews only, not purchased course access. Progress is stored in this browser when allowed.';
      card.append(title,text,track,note);
      for(const lesson of lessons){
        const row=document.createElement('div');row.className='academy-lesson-row';
        const left=document.createElement('span');left.textContent=lesson.title+(lesson.summary?' — '+lesson.summary:'');
        const btn=document.createElement('button');btn.type='button';btn.textContent=done.includes(lesson.id)?'✓ Reviewed':'Mark Reviewed';
        btn.addEventListener('click',()=>{const index=done.indexOf(lesson.id);if(index===-1)done.push(lesson.id);else done.splice(index,1);memory.set(key,done);btn.textContent=done.includes(lesson.id)?'✓ Reviewed':'Mark Reviewed';update();});
        row.append(left,btn);card.append(row);
      }return card;
    }));
    const logout=document.getElementById('academy-logout');if(logout){setCtaArrowLabel(logout, 'Back to Courses');logout.onclick=()=>location.href='lms.html';}
    const pwd=document.getElementById('academy-password-form');if(pwd){pwd.replaceWith(Object.assign(document.createElement('p'),{className:'academy-small',textContent:'Account registration and password management are not available in this frontend-only preview. No personal credentials are stored.'}));}
  }
})();


/* Shared screenshot-matched navigation on all frontend pages. */
(function(){
  const toggle=document.querySelector('[data-sr-toggle]');
  const menu=document.getElementById('sr-mobile-menu');
  if(!toggle || !menu)return;
  const close=()=>{menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');};
  toggle.addEventListener('click',()=>{
    const opening=menu.hidden;
    menu.hidden=!opening;
    toggle.setAttribute('aria-expanded',String(opening));
    toggle.setAttribute('aria-label',opening?'Close navigation':'Open navigation');
  });
  menu.addEventListener('click',e=>{if(e.target.closest('a'))close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){close();toggle.focus();}});
  document.addEventListener('click',e=>{if(!menu.hidden&&!e.target.closest('.sr-header'))close();});
  window.addEventListener('resize',()=>{if(window.innerWidth>1380&&!menu.hidden)close();},{passive:true});
})();


/* 21-Day Speakathon: frontend-only, progressive enhancement. No video/payments simulated. */
(function(){
  const root=document.querySelector('.speakathon-page');
  if(!root)return;
  const modal=document.getElementById('sp-preview-dialog');
  const data={
    camera:{title:'Speak Confidently in Front of the Camera',description:'Learn a simple exercise that helps you stop overthinking before speaking.',steps:['Choose one idea you want to share in a single sentence.','Take a short breath and speak to your camera naturally.','Play it back once and notice one thing you did well.','Try again, focusing on one clear improvement.']},
    smile:{title:'The Easiest Way to Look More Confident Without Saying a Word',description:'Practice using a genuine smile to make your first impression warmer and more approachable.',steps:['Relax your shoulders and your facial muscles.','Think of something that naturally makes you smile.','Look toward the camera and notice the difference in your expression.','Repeat the exercise before your next introduction.']}
  };
  let lastTrigger=null;
  root.querySelectorAll('[data-sp-preview]').forEach(btn=>btn.addEventListener('click',()=>{
    const item=data[btn.dataset.spPreview];if(!item||!modal)return;
    lastTrigger=btn;
    document.getElementById('sp-dialog-title').textContent=item.title;
    document.getElementById('sp-dialog-description').textContent=item.description;
    const target=document.getElementById('sp-dialog-steps');target.replaceChildren();
    item.steps.forEach(s=>{const li=document.createElement('li');li.textContent=s;target.append(li)});
    if(typeof modal.showModal==='function')modal.showModal();else modal.setAttribute('open','');
  }));
  const close=()=>{if(!modal)return;if(typeof modal.close==='function')modal.close();else modal.removeAttribute('open');lastTrigger?.focus();};
  modal?.querySelectorAll('[data-sp-close]').forEach(btn=>btn.addEventListener('click',close));
  modal?.addEventListener('click',event=>{if(event.target===modal)close();});
  const expand=document.getElementById('sp-expand-all');
  const weeks=[...root.querySelectorAll('.sp-week')];
  const sync=()=>{if(!expand)return;const all=weeks.every(w=>w.open);expand.setAttribute('aria-expanded',String(all));expand.innerHTML=(all?'Collapse all weeks':'Expand all weeks')+' <span aria-hidden="true">'+(all?'−':'＋')+'</span>';};
  expand?.addEventListener('click',()=>{const next=!weeks.every(w=>w.open);weeks.forEach(w=>w.open=next);sync();});
  weeks.forEach(w=>w.addEventListener('toggle',sync));sync();
})();
