/* ==========================================================================
   SECURE EXPRESS INDIA PVT LTD - LOGISTICS ENGINE & INTERACTIVE CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. NAVIGATION & MOBILE DRAWER CONTROLLER
     ------------------------------------------------------------------------ */
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Navbar Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    } else {
      navbar.style.boxShadow = 'var(--shadow-sm)';
    }
  });

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.querySelector('i').className = 'fas fa-bars';
      });
    });
  }

  // Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

      if (targetNav) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNav.classList.add('active');
        } else {
          targetNav.classList.remove('active');
        }
      }
    });
  });

  /* ------------------------------------------------------------------------
     2. HERO QUICK WIDGET TABS
     ------------------------------------------------------------------------ */
  const widgetTabs = document.querySelectorAll('.widget-tab');
  const widgetContents = document.querySelectorAll('.widget-content');

  widgetTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      widgetTabs.forEach(t => t.classList.remove('active'));
      widgetContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const activeContent = document.getElementById(targetTab);
      if (activeContent) activeContent.classList.add('active');
    });
  });

  /* ------------------------------------------------------------------------
     3. LIVE SHIPMENT TRACKING ENGINE
     ------------------------------------------------------------------------ */
  const trackingData = {
    'SE100982345': {
      awb: 'SE100982345',
      origin: 'Mumbai Hub (MH)',
      destination: 'New Delhi HQ (DL)',
      service: 'Express Air Freight',
      sender: 'TechCorp Logistics',
      receiver: 'Rajesh Sharma',
      status: 'In Transit',
      estDelivery: 'Tomorrow, 02:00 PM',
      stepIndex: 2, // 0: Booked, 1: Picked Up, 2: In Transit, 3: Out for Delivery, 4: Delivered
      progressPercent: '65%',
      history: [
        { time: 'Today, 10:30 AM', title: 'In Transit - Air Freight Departed', desc: 'Package departed from Mumbai Chhatrapati Shivaji Airport Hub.' },
        { time: 'Today, 06:15 AM', title: 'Arrived at Sorting Facility', desc: 'Package sorted and scanned at Western Logistics Center.' },
        { time: 'Yesterday, 04:45 PM', title: 'Shipment Picked Up', desc: 'Picked up by Express Rider #MH-402.' },
        { time: 'Yesterday, 02:00 PM', title: 'AWB Generated', desc: 'Shipment booking created online by sender.' }
      ]
    },
    'SE987654321': {
      awb: 'SE987654321',
      origin: 'Bengaluru (KA)',
      destination: 'Hyderabad (TG)',
      service: 'B2B Cargo Delivery',
      sender: 'Apex Enterprises',
      receiver: 'Suresh Kumar',
      status: 'Delivered',
      estDelivery: 'Delivered on Aug 10',
      stepIndex: 4,
      progressPercent: '100%',
      history: [
        { time: 'Aug 10, 03:15 PM', title: 'Package Delivered', desc: 'Signed & accepted by Suresh Kumar. OTP Verified.' },
        { time: 'Aug 10, 09:00 AM', title: 'Out for Delivery', desc: 'Assigned to Delivery Executive Ramesh (Ph: +91 98765 43210).' },
        { time: 'Aug 09, 11:20 PM', title: 'Arrived at Destination Hub', desc: 'Scanned at Hyderabad Regional Express Center.' },
        { time: 'Aug 08, 05:00 PM', title: 'Shipment Picked Up', desc: 'Bulk pickup completed from Electronics City, Bengaluru.' }
      ]
    }
  };

  const trackBtn = document.getElementById('trackBtn');
  const heroTrackBtn = document.getElementById('heroTrackBtn');
  const trackingInput = document.getElementById('trackingInput');
  const heroTrackingInput = document.getElementById('heroTrackingInput');
  const trackingResultBox = document.getElementById('trackingResultBox');

  // Trigger search from Hero or Track Section
  if (trackBtn) trackBtn.addEventListener('click', () => executeTracking(trackingInput.value));
  if (heroTrackBtn) heroTrackBtn.addEventListener('click', () => executeTracking(heroTrackingInput.value));

  // Pre-fill sample AWB buttons
  document.querySelectorAll('.sample-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const awb = tag.textContent.trim();
      if (trackingInput) trackingInput.value = awb;
      if (heroTrackingInput) heroTrackingInput.value = awb;
      executeTracking(awb);
    });
  });

  function executeTracking(awbQuery) {
    const awb = awbQuery.trim().toUpperCase();
    if (!awb) {
      showToast('Please enter a valid AWB or Tracking ID!', 'error');
      return;
    }

    // Scroll smoothly to Track Section
    const trackSection = document.getElementById('track');
    if (trackSection) {
      trackSection.scrollIntoView({ behavior: 'smooth' });
    }

    showToast(`Searching tracking records for ${awb}...`, 'info');

    setTimeout(() => {
      let data = trackingData[awb];

      // Dynamic Fallback Generator if custom AWB is searched
      if (!data) {
        data = {
          awb: awb,
          origin: 'Origin Logistics Hub',
          destination: 'Destination Express Center',
          service: 'Secure Domestic Express',
          sender: 'Verified Shipper',
          receiver: 'Valued Customer',
          status: 'In Transit',
          estDelivery: 'Within 24-48 Hours',
          stepIndex: 2,
          progressPercent: '60%',
          history: [
            { time: 'Just Now', title: 'In Transit', desc: 'Package scanned at automated sorting conveyor.' },
            { time: '3 Hours Ago', title: 'First-Mile Pickup Verified', desc: 'Courier agent collected package with barcode scan.' },
            { time: 'Today', title: 'Booking Confirmed', desc: 'AWB registered in Secure Express India network.' }
          ]
        };
      }

      renderTrackingUI(data);
    }, 400);
  }

  function renderTrackingUI(data) {
    if (!trackingResultBox) return;

    trackingResultBox.classList.add('active');

    // Update Header Info
    document.getElementById('resAwb').textContent = data.awb;
    document.getElementById('resRoute').textContent = `${data.origin} ➔ ${data.destination}`;
    document.getElementById('resService').textContent = data.service;
    document.getElementById('resEst').textContent = data.estDelivery;
    
    const statusPill = document.getElementById('resStatusPill');
    statusPill.textContent = data.status;
    statusPill.className = `status-pill ${data.status === 'Delivered' ? 'status-delivered' : 'status-in-transit'}`;

    // Update Visual Stepper Progress Line
    const activeLine = document.getElementById('progressLineActive');
    if (activeLine) activeLine.style.width = data.progressPercent;

    // Highlight Stepper Points
    const stepPoints = document.querySelectorAll('.step-point');
    stepPoints.forEach((point, idx) => {
      point.classList.remove('completed', 'current');
      if (idx < data.stepIndex) {
        point.classList.add('completed');
      } else if (idx === data.stepIndex) {
        point.classList.add('current');
      }
    });

    // Render History Timeline Items
    const historyList = document.getElementById('historyList');
    if (historyList) {
      historyList.innerHTML = data.history.map(item => `
        <div class="history-item">
          <div class="history-dot"></div>
          <div class="history-detail">
            <h5>${item.title}</h5>
            <p>${item.desc}</p>
            <span style="font-size:0.75rem; color: var(--text-muted);">${item.time}</span>
          </div>
        </div>
      `).join('');
    }

    showToast(`Tracking status loaded for ${data.awb}`, 'success');
  }

  /* ------------------------------------------------------------------------
     4. FREIGHT RATE CALCULATOR ENGINE
     ------------------------------------------------------------------------ */
  const calcBtn = document.getElementById('calcBtn');
  const heroCalcBtn = document.getElementById('heroCalcBtn');
  const weightInput = document.getElementById('calcWeight');
  const modeSelect = document.getElementById('calcMode');
  const originPin = document.getElementById('calcOrigin');
  const destPin = document.getElementById('calcDest');

  function calculateRate() {
    const weight = parseFloat(weightInput.value) || 1.0;
    const mode = modeSelect.value;
    
    let baseRatePerKg = 40;
    let baseMinFee = 150;

    switch (mode) {
      case 'air':
        baseRatePerKg = 90;
        baseMinFee = 350;
        break;
      case 'express':
        baseRatePerKg = 65;
        baseMinFee = 250;
        break;
      case 'surface':
        baseRatePerKg = 35;
        baseMinFee = 120;
        break;
      case 'ecommerce':
        baseRatePerKg = 45;
        baseMinFee = 140;
        break;
      case 'b2b':
        baseRatePerKg = 30;
        baseMinFee = 400;
        break;
    }

    let freightCharge = Math.max(baseMinFee, Math.round(weight * baseRatePerKg));
    let fuelSurcharge = Math.round(freightCharge * 0.12);
    let subtotal = freightCharge + fuelSurcharge;
    let gst = Math.round(subtotal * 0.18);
    let grandTotal = subtotal + gst;

    // Update Result Display
    document.getElementById('resBaseFreight').textContent = `₹${freightCharge}`;
    document.getElementById('resFuelSurcharge').textContent = `₹${fuelSurcharge}`;
    document.getElementById('resGst').textContent = `₹${gst} (18%)`;
    document.getElementById('resGrandTotal').textContent = `₹${grandTotal}`;
  }

  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      calculateRate();
      showToast('Estimated Freight Rate calculated!', 'success');
    });
  }

  if (heroCalcBtn) {
    heroCalcBtn.addEventListener('click', () => {
      const heroWeight = document.getElementById('heroWeight').value;
      const heroMode = document.getElementById('heroMode').value;
      if (weightInput) weightInput.value = heroWeight;
      if (modeSelect) modeSelect.value = heroMode;

      const calcSection = document.getElementById('calculator');
      if (calcSection) calcSection.scrollIntoView({ behavior: 'smooth' });

      calculateRate();
    });
  }

  // Live recalculate on weight change
  if (weightInput) weightInput.addEventListener('input', calculateRate);
  if (modeSelect) modeSelect.addEventListener('change', calculateRate);

  /* ------------------------------------------------------------------------
     5. FAQ ACCORDION CONTROLLER
     ------------------------------------------------------------------------ */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  /* ------------------------------------------------------------------------
     6. SERVICE MODAL POPUP & BOOKING
     ------------------------------------------------------------------------ */
  const modalOverlay = document.getElementById('modalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  const serviceDetails = {
    'express': {
      title: 'Express Delivery Services',
      desc: 'Our high-priority express delivery guarantees doorstep pickup and rapid transit for urgent documents, high-value packages, and time-critical parcels with guaranteed 24-hour delivery across major metros.'
    },
    'domestic': {
      title: 'Domestic Delivery Services',
      desc: 'Reliable pan-India standard parcel delivery covering 19,000+ pincodes. Features real-time GPS tracking, proof of delivery (POD), and seamless doorstep pickup.'
    },
    'surface': {
      title: 'Surface Cargo Delivery',
      desc: 'Cost-effective road logistics designed for bulk cargo, heavy commercial machinery, and multi-location freight distribution via our dedicated fleet of container trucks.'
    },
    'air': {
      title: 'Air Delivery Services',
      desc: 'Direct air cargo connections between major airport hubs across India for maximum speed. Includes expedited customs compliance and priority airport clearance.'
    },
    'b2b': {
      title: 'B2B Logistics & Supply Chain',
      desc: 'Tailored enterprise logistics solutions including scheduled warehouse deliveries, bulk inventory transfer, dedicated account managers, and custom billing cycles.'
    },
    'ecommerce': {
      title: 'E-commerce Delivery & COD',
      desc: 'Integrated e-commerce fulfillment with Cash on Delivery (COD) collection, automated NDR workflow, fast remittance cycles, and zero-hassle reverse logistics.'
    }
  };

  document.querySelectorAll('.open-service-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceKey = btn.getAttribute('data-service');
      const details = serviceDetails[serviceKey] || { title: 'Secure Express Service', desc: 'Comprehensive logistics solution across India.' };

      if (modalTitle && modalBody && modalOverlay) {
        modalTitle.textContent = details.title;
        modalBody.innerHTML = `
          <p style="font-size: 1rem; color: var(--text-muted); margin-bottom: 1.5rem;">${details.desc}</p>
          <div style="background: var(--bg-light); padding: 1rem; border-radius: var(--radius); margin-bottom: 1.5rem;">
            <h5 style="font-family: var(--font-heading); margin-bottom: 0.5rem; color: var(--navy-deep);">Service Highlights:</h5>
            <ul style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem;">
              <li><i class="fas fa-check-circle" style="color: var(--primary-cyan);"></i> Full Insurance Cover Available</li>
              <li><i class="fas fa-check-circle" style="color: var(--primary-cyan);"></i> Real-Time Barcode & GPS Tracking</li>
              <li><i class="fas fa-check-circle" style="color: var(--primary-cyan);"></i> OTP Verified Digital Signature Delivery</li>
            </ul>
          </div>
          <button class="btn btn-primary" style="width: 100%;" onclick="closeModalAndBook()">Book Shipment Now</button>
        `;
        modalOverlay.classList.add('active');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => modalOverlay.classList.remove('active'));
  }

  window.closeModalAndBook = function() {
    modalOverlay.classList.remove('active');
    const contactSec = document.getElementById('contact');
    if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
  };

  /* ------------------------------------------------------------------------
     7. CONTACT FORM & BOOKING SUBMISSION
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your pickup/inquiry request has been submitted.', 'success');
      contactForm.reset();
    });
  }

  /* ------------------------------------------------------------------------
     8. TOAST NOTIFICATION SYSTEM
     ------------------------------------------------------------------------ */
  function showToast(message, type = 'info') {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let iconClass = 'fa-info-circle';
    if (type === 'success') iconClass = 'fa-check-circle';
    if (type === 'error') iconClass = 'fa-exclamation-triangle';

    toast.innerHTML = `<i class="fas ${iconClass}"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

});
