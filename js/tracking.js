/* ==========================================================================
   SECURE EXPRESS INDIA PVT LTD - TRACKING ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const trackingData = {
    'SE100982345': {
      awb: 'SE100982345',
      origin: 'Mumbai Hub (MH)',
      destination: 'New Delhi HQ (DL)',
      service: 'Express Air Cargo',
      status: 'In Transit',
      estDelivery: 'Tomorrow, 02:00 PM',
      stepIndex: 2,
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
      service: 'B2B Freight Delivery',
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
  const trackingInput = document.getElementById('trackingInput');
  const trackingResultBox = document.getElementById('trackingResultBox');

  if (trackBtn && trackingInput) {
    trackBtn.addEventListener('click', () => executeTracking(trackingInput.value));
  }

  document.querySelectorAll('.sample-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const awb = tag.textContent.trim();
      if (trackingInput) trackingInput.value = awb;
      executeTracking(awb);
    });
  });

  function executeTracking(awbQuery) {
    const awb = awbQuery.trim().toUpperCase();
    if (!awb) {
      showToast('Please enter a valid AWB / Tracking ID!', 'error');
      return;
    }

    showToast(`Fetching live tracking for ${awb}...`, 'info');

    setTimeout(() => {
      let data = trackingData[awb];
      if (!data) {
        data = {
          awb: awb,
          origin: 'Origin Logistics Hub',
          destination: 'Destination Hub',
          service: 'Secure Domestic Express',
          status: 'In Transit',
          estDelivery: 'Within 24-48 Hours',
          stepIndex: 2,
          progressPercent: '60%',
          history: [
            { time: 'Just Now', title: 'In Transit', desc: 'Package scanned at automated sorting hub.' },
            { time: '3 Hours Ago', title: 'First-Mile Pickup Verified', desc: 'Courier agent collected package.' },
            { time: 'Today', title: 'Booking Confirmed', desc: 'AWB registered in network.' }
          ]
        };
      }
      renderTrackingUI(data);
    }, 400);
  }

  function renderTrackingUI(data) {
    if (!trackingResultBox) return;

    trackingResultBox.classList.add('active');

    const resAwb = document.getElementById('resAwb');
    const resRoute = document.getElementById('resRoute');
    const resService = document.getElementById('resService');
    const resEst = document.getElementById('resEst');
    const statusPill = document.getElementById('resStatusPill');

    if (resAwb) resAwb.textContent = data.awb;
    if (resRoute) resRoute.textContent = `${data.origin} ➔ ${data.destination}`;
    if (resService) resService.textContent = data.service;
    if (resEst) resEst.textContent = data.estDelivery;

    if (statusPill) {
      statusPill.textContent = data.status;
      statusPill.className = `status-pill ${data.status === 'Delivered' ? 'status-delivered' : 'status-in-transit'}`;
    }

    const activeLine = document.getElementById('progressLineActive');
    if (activeLine) activeLine.style.width = data.progressPercent;

    const stepPoints = document.querySelectorAll('.step-point');
    stepPoints.forEach((point, idx) => {
      point.classList.remove('completed', 'current');
      if (idx < data.stepIndex) {
        point.classList.add('completed');
      } else if (idx === data.stepIndex) {
        point.classList.add('current');
      }
    });

    const historyList = document.getElementById('historyList');
    if (historyList) {
      historyList.innerHTML = data.history.map(item => `
        <div class="history-item" style="display:flex; gap:1rem; padding-bottom:1rem; border-bottom:1px stroke #E2E8F0;">
          <div class="history-dot" style="width:12px; height:12px; border-radius:50%; background:var(--primary-blue); margin-top:4px;"></div>
          <div class="history-detail">
            <h5 style="font-size:0.95rem; font-weight:700;">${item.title}</h5>
            <p style="font-size:0.85rem; color:var(--text-muted);">${item.desc}</p>
            <span style="font-size:0.75rem; color:var(--text-muted);">${item.time}</span>
          </div>
        </div>
      `).join('');
    }

    showToast(`Live status retrieved for ${data.awb}`, 'success');
  }

});
