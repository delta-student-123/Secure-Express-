/* ==========================================================================
   SECURE EXPRESS INDIA PVT LTD - FREIGHT RATE CALCULATOR ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const calcBtn = document.getElementById('calcBtn');
  const weightInput = document.getElementById('calcWeight');
  const modeSelect = document.getElementById('calcMode');

  function calculateRate() {
    const weight = parseFloat(weightInput ? weightInput.value : 1.0) || 1.0;
    const mode = modeSelect ? modeSelect.value : 'express';

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

    const resBaseFreight = document.getElementById('resBaseFreight');
    const resFuelSurcharge = document.getElementById('resFuelSurcharge');
    const resGst = document.getElementById('resGst');
    const resGrandTotal = document.getElementById('resGrandTotal');

    if (resBaseFreight) resBaseFreight.textContent = `₹${freightCharge}`;
    if (resFuelSurcharge) resFuelSurcharge.textContent = `₹${fuelSurcharge}`;
    if (resGst) resGst.textContent = `₹${gst} (18%)`;
    if (resGrandTotal) resGrandTotal.textContent = `₹${grandTotal}`;
  }

  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      calculateRate();
      showToast('Freight Rate estimated successfully!', 'success');
    });
  }

  if (weightInput) weightInput.addEventListener('input', calculateRate);
  if (modeSelect) modeSelect.addEventListener('change', calculateRate);

});
