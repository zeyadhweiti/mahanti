/* ============================================
   MAHANTI APP - Frontend with Real Backend API
   ============================================ */

const API_URL = window.location.origin; // Same origin

// ========== API HELPERS ==========
async function apiGet(endpoint) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`);
    return await res.json();
  } catch (err) {
    console.error('API Error:', err);
    return { success: false, message: 'خطأ في الاتصال بالخادم' };
  }
}

async function apiPost(endpoint, data) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (err) {
    console.error('API Error:', err);
    return { success: false, message: 'خطأ في الاتصال بالخادم' };
  }
}

// ========== STATS (Homepage) ==========
async function loadStats() {
  const result = await apiGet('/api/stats');
  if (result.success) {
    const statWorkers = document.getElementById('statWorkers');
    const statJobs = document.getElementById('statJobs');
    const statCities = document.getElementById('statCities');
    if (statWorkers) statWorkers.textContent = result.data.workers.toLocaleString('ar-SA');
    if (statJobs) statJobs.textContent = result.data.jobs.toLocaleString('ar-SA');
    if (statCities) statCities.textContent = result.data.cities.toLocaleString('ar-SA');
  }
}

// ========== LOAD WORKERS FROM API ==========
async function loadWorkers() {
  const list = document.getElementById('workersList');
  if (!list) return;

  list.innerHTML = '<div style="text-align:center;padding:30px;color:var(--text-gray);"><div style="font-size:32px;margin-bottom:10px;">⏳</div>جاري تحميل البيانات...</div>';

  const result = await apiGet('/api/workers');
  if (result.success) {
    renderWorkers(result.data);
  } else {
    list.innerHTML = '<div style="text-align:center;padding:30px;color:var(--text-gray);"><div style="font-size:32px;margin-bottom:10px;">😕</div>حدث خطأ في تحميل البيانات</div>';
  }
}

function renderWorkers(workers) {
  const list = document.getElementById('workersList');
  if (!list) return;

  if (workers.length === 0) {
    list.innerHTML = `
      <div style="text-align:center;padding:40px 20px;color:var(--text-gray);">
        <div style="font-size:48px;margin-bottom:12px;">😕</div>
        <h3 style="color:var(--primary-green);margin-bottom:8px;">لا توجد نتائج</h3>
        <p>جرب البحث بكلمات مختلفة أو تصفية أقل</p>
      </div>`;
    return;
  }

  list.innerHTML = workers.map(w => `
    <div class="worker-card" data-job="${w.job}" data-city="${w.city}">
      <div class="worker-header">
        <div class="worker-name">${w.name}</div>
        <div class="worker-job">${w.job}</div>
      </div>
      <div class="worker-info">
        <span>📍 ${w.city} - ${w.area}</span><br>
        <span>⭐ ${w.exp}</span><br>
        <span>📝 ${w.desc}</span>
      </div>
      <div class="worker-actions">
        <a href="https://wa.me/966${w.phone.replace(/^0/, '')}" class="btn btn-whatsapp" target="_blank">📱 واتساب</a>
        <a href="tel:${w.phone}" class="btn btn-call">📞 اتصال</a>
      </div>
    </div>
  `).join('');
}

// ========== SEARCH & FILTER ==========
let currentJobFilter = 'all';

async function filterWorkers() {
  const searchTerm = document.getElementById('searchInput')?.value.trim() || '';
  const cityFilter = document.getElementById('cityFilter')?.value || '';

  const list = document.getElementById('workersList');
  if (!list) return;

  list.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-gray);">⏳ جاري البحث...</div>';

  let endpoint = '/api/workers/search?';
  const params = [];
  if (searchTerm) params.push(`q=${encodeURIComponent(searchTerm)}`);
  if (currentJobFilter !== 'all') params.push(`job=${encodeURIComponent(currentJobFilter)}`);
  if (cityFilter) params.push(`city=${encodeURIComponent(cityFilter)}`);

  const result = await apiGet(endpoint + params.join('&'));
  if (result.success) {
    renderWorkers(result.data);
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
  // Load stats on homepage
  loadStats();

  // Load workers on search page
  if (document.getElementById('workersList')) {
    loadWorkers();
  }

  // Check URL params for auto-filter
  const urlParams = new URLSearchParams(window.location.search);
  const jobParam = urlParams.get('job');

  if (jobParam && document.getElementById('searchInput')) {
    const tags = document.querySelectorAll('.filter-tag');
    tags.forEach(tag => {
      if (tag.textContent.trim() === jobParam.trim()) {
        tag.click();
      }
    });
    document.getElementById('searchInput').value = jobParam;
    filterWorkers();
  }
});

// ========== REGISTRATION FLOW ==========
let currentPhone = '';
let currentVerifyMethod = 'sms';

async function goToVerify() {
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

  currentPhone = phone;

  // Send OTP via API
  const result = await apiPost('/api/verify/send', { phone, method: currentVerifyMethod });

  if (!result.success) {
    alert('⚠️ ' + result.message);
    return;
  }

  // Show verification step
  document.getElementById('verifyPhoneNum').textContent = phone;
  document.getElementById('regStep1').style.display = 'none';
  document.getElementById('regStep2').style.display = 'block';
  document.getElementById('successMsg').classList.add('show');

  // Auto-fill OTP for demo (shows in console)
  if (result.demoCode) {
    console.log('🔐 Demo OTP:', result.demoCode);
    setTimeout(() => {
      const otpInputs = document.querySelectorAll('.otp-input');
      const code = result.demoCode.split('');
      otpInputs.forEach((input, i) => { if (code[i]) input.value = code[i]; });
    }, 1000);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectVerify(el, method) {
  document.querySelectorAll('.verify-method').forEach(m => m.classList.remove('selected'));
  el.classList.add('selected');
  currentVerifyMethod = method;
}

function moveOtp(input, index) {
  input.value = input.value.replace(/[^0-9]/g, '');
  if (input.value && index < 3) {
    const inputs = document.querySelectorAll('.otp-input');
    inputs[index + 1].focus();
  }
}

async function verifyOtp() {
  const otpInputs = document.querySelectorAll('.otp-input');
  const code = Array.from(otpInputs).map(i => i.value).join('');

  if (code.length !== 4) {
    alert('⚠️ يرجى إدخال رمز التحقق كاملاً');
    return;
  }

  // Verify OTP via API
  const verifyResult = await apiPost('/api/verify/check', { phone: currentPhone, code });

  if (!verifyResult.success) {
    alert('⚠️ ' + verifyResult.message);
    return;
  }

  // Register worker via API
  const workerData = {
    name: document.getElementById('regName').value.trim(),
    phone: currentPhone,
    job: document.getElementById('regJob').value,
    desc: document.getElementById('regDesc').value.trim(),
    city: document.getElementById('regCity').value,
    area: document.getElementById('regArea').value.trim(),
    exp: document.getElementById('regExp').value
  };

  const regResult = await apiPost('/api/workers', workerData);

  if (!regResult.success) {
    alert('⚠️ ' + regResult.message);
    return;
  }

  // Show success
  document.getElementById('regStep2').style.display = 'none';
  document.getElementById('regStep3').style.display = 'block';

  // Update stats
  loadStats();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function resendCode() {
  const result = await apiPost('/api/verify/send', { phone: currentPhone, method: currentVerifyMethod });
  if (result.success) {
    alert('🔄 تم إعادة إرسال رمز التحقق!');
    document.querySelectorAll('.otp-input').forEach(input => input.value = '');
    document.querySelectorAll('.otp-input')[0].focus();

    if (result.demoCode) {
      console.log('🔐 New Demo OTP:', result.demoCode);
    }
  } else {
    alert('⚠️ ' + result.message);
  }
}

// ========== UTILITY ==========
document.addEventListener('dblclick', function(event) {
  event.preventDefault();
}, { passive: false });

console.log('🛠️ مهنتي - Frontend connected to Backend!');
