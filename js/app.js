/* ============================================
   MAHANTI APP - JavaScript
   ============================================ */

// ========== SEARCH & FILTER ==========
let currentJobFilter = 'all';

function filterWorkers() {
  const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const cityFilter = document.getElementById('cityFilter')?.value || '';
  const cards = document.querySelectorAll('.worker-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const job = card.getAttribute('data-job');
    const city = card.getAttribute('data-city');
    const text = card.textContent.toLowerCase();

    const matchesSearch = text.includes(searchTerm);
    const matchesJob = currentJobFilter === 'all' || job === currentJobFilter;
    const matchesCity = !cityFilter || city === cityFilter;

    const isVisible = matchesSearch && matchesJob && matchesCity;
    card.style.display = isVisible ? 'block' : 'none';
    if (isVisible) visibleCount++;
  });

  // Show/hide no results message
  const noResults = document.getElementById('noResults');
  if (noResults) {
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  }
}

function filterByJob(job, el) {
  currentJobFilter = job;
  document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
  filterWorkers();
}

// ========== URL PARAMS (Auto-filter from homepage) ==========
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const jobParam = urlParams.get('job');

  if (jobParam && document.getElementById('searchInput')) {
    // Find and click the matching filter tag
    const tags = document.querySelectorAll('.filter-tag');
    tags.forEach(tag => {
      if (tag.textContent.trim() === jobParam.trim()) {
        tag.click();
      }
    });

    // Also fill the search input
    document.getElementById('searchInput').value = jobParam;
    filterWorkers();
  }
});

// ========== REGISTRATION FLOW ==========
function goToVerify() {
  const name = document.getElementById('regName').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const job = document.getElementById('regJob').value;
  const city = document.getElementById('regCity').value;
  const area = document.getElementById('regArea').value.trim();

  // Validation
  if (!name) { alert('⚠️ يرجى إدخال الاسم الكامل'); document.getElementById('regName').focus(); return; }
  if (!phone) { alert('⚠️ يرجى إدخال رقم الجوال'); document.getElementById('regPhone').focus(); return; }
  if (!/^05\d{8}$/.test(phone)) { alert('⚠️ رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام'); document.getElementById('regPhone').focus(); return; }
  if (!job) { alert('⚠️ يرجى اختيار المهنة'); document.getElementById('regJob').focus(); return; }
  if (!city) { alert('⚠️ يرجى اختيار المدينة'); document.getElementById('regCity').focus(); return; }
  if (!area) { alert('⚠️ يرجى إدخال الحي / المنطقة'); document.getElementById('regArea').focus(); return; }

  // Show verification step
  document.getElementById('verifyPhoneNum').textContent = phone;
  document.getElementById('regStep1').style.display = 'none';
  document.getElementById('regStep2').style.display = 'block';
  document.getElementById('successMsg').classList.add('show');

  // Auto-fill OTP for demo (remove in production)
  setTimeout(() => {
    const otpInputs = document.querySelectorAll('.otp-input');
    if (otpInputs.length > 0) {
      otpInputs[0].value = '1';
      otpInputs[1].value = '2';
      otpInputs[2].value = '3';
      otpInputs[3].value = '4';
    }
  }, 1500);

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectVerify(el, method) {
  document.querySelectorAll('.verify-method').forEach(m => m.classList.remove('selected'));
  el.classList.add('selected');
}

function moveOtp(input, index) {
  // Only allow numbers
  input.value = input.value.replace(/[^0-9]/g, '');

  if (input.value && index < 3) {
    const inputs = document.querySelectorAll('.otp-input');
    inputs[index + 1].focus();
  }

  // Auto-submit when all filled
  const allInputs = document.querySelectorAll('.otp-input');
  const allFilled = Array.from(allInputs).every(i => i.value.length === 1);
  if (allFilled) {
    setTimeout(verifyOtp, 300);
  }
}

function verifyOtp() {
  const otpInputs = document.querySelectorAll('.otp-input');
  const otp = Array.from(otpInputs).map(i => i.value).join('');

  if (otp.length !== 4) {
    alert('⚠️ يرجى إدخال رمز التحقق كاملاً');
    return;
  }

  // In production: verify OTP with backend
  // For demo: any 4 digits work

  document.getElementById('regStep2').style.display = 'none';
  document.getElementById('regStep3').style.display = 'block';

  // Update stats on homepage
  const statWorkers = document.getElementById('statWorkers');
  if (statWorkers) {
    statWorkers.textContent = '1,248';
  }

  // Save to localStorage (demo only)
  saveRegistration();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resendCode() {
  alert('🔄 تم إعادة إرسال رمز التحقق!');

  // Reset OTP inputs
  document.querySelectorAll('.otp-input').forEach(input => input.value = '');
  document.querySelectorAll('.otp-input')[0].focus();
}

// ========== LOCAL STORAGE (Demo Data) ==========
function saveRegistration() {
  const worker = {
    name: document.getElementById('regName').value,
    phone: document.getElementById('regPhone').value,
    job: document.getElementById('regJob').value,
    desc: document.getElementById('regDesc').value,
    city: document.getElementById('regCity').value,
    area: document.getElementById('regArea').value,
    exp: document.getElementById('regExp').value,
    date: new Date().toISOString()
  };

  let workers = JSON.parse(localStorage.getItem('mahanti_workers') || '[]');
  workers.push(worker);
  localStorage.setItem('mahanti_workers', JSON.stringify(workers));
}

// ========== UTILITY ==========
// Prevent zoom on double-tap for mobile
document.addEventListener('dblclick', function(event) {
  event.preventDefault();
}, { passive: false });

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

console.log('🛠️ مهنتي - تم تحميل التطبيق بنجاح!');
