/* ============================================
   MAHANTI V2 - Global Trades Directory
   ============================================ */

const API_URL = window.location.origin;
let currentLang = localStorage.getItem('mahanti_lang') || 'ar';
let currentCountryFilter = '';
let currentJobFilter = 'all';
let currentVerifyMethod = 'whatsapp';
let currentPhone = '';
let countriesData = {};
let translations = {};

// ========== LANGUAGE ==========
function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('mahanti_lang', lang);
  location.reload();
}

// ========== API ==========
async function apiGet(endpoint) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`);
    return await res.json();
  } catch (err) {
    console.error('API Error:', err);
    return { success: false };
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
    return { success: false };
  }
}

// ========== TRANSLATIONS ==========
async function loadTranslations() {
  const result = await apiGet('/api/translations/' + currentLang);
  if (result.success) {
    translations = result.data;
    applyTranslations();
  }
}

function applyTranslations() {
  document.documentElement.lang = currentLang;
  document.body.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = key.split('.').reduce((o, p) => o && o[p], translations);
    if (val) el.textContent = val;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    const val = key.split('.').reduce((o, p) => o && o[p], translations);
    if (val) el.placeholder = val;
  });
}

function t(key) {
  return key.split('.').reduce((o, p) => o && o[p], translations) || key;
}

// ========== COUNTRIES ==========
async function loadCountries() {
  const result = await apiGet('/api/countries');
  if (result.success) {
    countriesData = result.data;
    renderCountries();
    populateCountrySelects();
  }
}

function renderCountries() {
  const grid = document.getElementById('countriesGrid');
  if (!grid) return;

  let html = '';
  for (const [code, c] of Object.entries(countriesData)) {
    const name = currentLang === 'ar' ? c.nameAr : c.nameEn;
    html += `<a href="search.html?country=${code}" class="country-chip">
      <span class="flag">${c.flag}</span>
      <span>${name}</span>
    </a>`;
  }
  grid.innerHTML = html;
}

function populateCountrySelects() {
  // For registration page
  const regCountry = document.getElementById('regCountry');
  if (regCountry) {
    let html = `<option value="">${t('selectCountry')}</option>`;
    for (const [code, c] of Object.entries(countriesData)) {
      const name = currentLang === 'ar' ? c.nameAr : c.nameEn;
      html += `<option value="${code}">${c.flag} ${name} (${c.code})</option>`;
    }
    regCountry.innerHTML = html;
  }

  // For search page
  const countryFilter = document.getElementById('countryFilter');
  if (countryFilter) {
    let html = `<option value="">${currentLang === 'ar' ? '🌍 جميع البلدان' : '🌍 All Countries'}</option>`;
    for (const [code, c] of Object.entries(countriesData)) {
      const name = currentLang === 'ar' ? c.nameAr : c.nameEn;
      html += `<option value="${code}">${c.flag} ${name}</option>`;
    }
    countryFilter.innerHTML = html;
  }
}

function onRegCountryChange() {
  const code = document.getElementById('regCountry').value;
  if (!code || !countriesData[code]) return;

  const c = countriesData[code];
  document.getElementById('phoneCode').textContent = c.code;
  document.getElementById('phoneHint').textContent = 
    (currentLang === 'ar' ? 'مثال: ' : 'Example: ') + c.phoneExample;

  const citySelect = document.getElementById('regCity');
  if (citySelect) {
    let html = `<option value="">${t('selectCity')}</option>`;
    for (const city of c.cities) {
      html += `<option value="${city}">${city}</option>`;
    }
    citySelect.innerHTML = html;
  }
}

function onCountryChange() {
  currentCountryFilter = document.getElementById('countryFilter').value;
  const cityFilter = document.getElementById('cityFilter');

  if (cityFilter && currentCountryFilter && countriesData[currentCountryFilter]) {
    let html = `<option value="">${currentLang === 'ar' ? '📍 جميع المدن' : '📍 All Cities'}</option>`;
    for (const city of countriesData[currentCountryFilter].cities) {
      html += `<option value="${city}">${city}</option>`;
    }
    cityFilter.innerHTML = html;
  } else if (cityFilter) {
    cityFilter.innerHTML = `<option value="">${currentLang === 'ar' ? '📍 جميع المدن' : '📍 All Cities'}</option>`;
  }

  filterWorkers();
}

// ========== JOBS ==========
function populateJobs() {
  const el = document.getElementById('regJob');
  if (!el || !translations.jobs) return;

  let html = `<option value="">${t('selectJob')}</option>`;
  for (const [key, label] of Object.entries(translations.jobs)) {
    html += `<option value="${key}">${label}</option>`;
  }
  el.innerHTML = html;
}

function populateJobFilters() {
  const container = document.getElementById('jobFilters');
  if (!container || !translations.jobs) return;

  const allText = currentLang === 'ar' ? 'الكل' : 'All';
  let html = `<button class="filter-tag active" onclick="filterByJob('all', this)">${allText}</button>`;

  const jobEntries = Object.entries(translations.jobs);
  for (let i = 0; i < Math.min(jobEntries.length, 12); i++) {
    const [key, label] = jobEntries[i];
    const name = label.replace(/[🧱🪵🔩🔥🔧⚡🚗🎨🏠🏗️🪟❄️🛋️🚪🧹🌳🛗📌]/g, '').trim();
    html += `<button class="filter-tag" onclick="filterByJob('${key}', this)">${name}</button>`;
  }
  container.innerHTML = html;
}

// ========== STATS ==========
async function loadStats() {
  const result = await apiGet('/api/stats');
  if (result.success) {
    const d = result.data;
    const ids = ['statWorkers', 'statJobs', 'statCities', 'statCountries'];
    const keys = ['workers', 'jobs', 'cities', 'countries'];
    for (let i = 0; i < ids.length; i++) {
      const el = document.getElementById(ids[i]);
      if (el) el.textContent = d[keys[i]] || 0;
    }
  }
}

// ========== WORKERS ==========
async function loadWorkers() {
  const list = document.getElementById('workersList');
  if (!list) return;

  list.innerHTML = `<div style="text-align:center;padding:30px;"><div style="font-size:32px;">⏳</div>${currentLang === 'ar' ? 'جاري التحميل...' : 'Loading...'}</div>`;

  const result = await apiGet('/api/workers');
  if (result.success) {
    renderWorkers(result.data);
  }
}

function renderWorkers(workers) {
  const list = document.getElementById('workersList');
  if (!list) return;

  if (workers.length === 0) {
    list.innerHTML = `
      <div style="text-align:center;padding:40px;color:var(--text-gray);">
        <div style="font-size:48px;">😕</div>
        <h3 style="color:var(--primary-green);">${t('noResults')}</h3>
        <p>${t('noResultsDesc')}</p>
      </div>`;
    return;
  }

  let html = '';
  for (const w of workers) {
    const c = countriesData[w.country] || { flag: '🌍', nameAr: w.country, nameEn: w.country };
    const countryName = currentLang === 'ar' ? c.nameAr : c.nameEn;
    const jobName = currentLang === 'ar' ? w.job : (w.jobEn || w.job);
    const desc = currentLang === 'ar' ? w.desc : (w.descEn || w.desc);
    const exp = currentLang === 'ar' ? w.exp : (w.expEn || w.exp);

    html += `
    <div class="worker-card" data-job="${w.job}" data-city="${w.city}" data-country="${w.country}">
      <div class="worker-header">
        <div class="worker-name">
          ${w.name}
          <span class="worker-country">${c.flag} ${countryName}</span>
        </div>
        <div class="worker-job">${jobName}</div>
      </div>
      <div class="worker-info">
        <span>📍 ${w.city} - ${w.area}</span><br>
        <span>⭐ ${exp}</span><br>
        <span>📝 ${desc}</span>
      </div>
      <div class="worker-actions">
        <a href="https://wa.me/${w.phone}" class="btn btn-whatsapp" target="_blank">📱 ${t('whatsapp')}</a>
        <a href="tel:+${w.phone}" class="btn btn-call">📞 ${t('call')}</a>
      </div>
    </div>`;
  }
  list.innerHTML = html;
}

// ========== SEARCH ==========
async function filterWorkers() {
  const searchTerm = document.getElementById('searchInput')?.value.trim() || '';
  const cityFilter = document.getElementById('cityFilter')?.value || '';
  const countryFilter = document.getElementById('countryFilter')?.value || '';
  const list = document.getElementById('workersList');
  if (!list) return;

  list.innerHTML = `<div style="text-align:center;padding:20px;">⏳ ${currentLang === 'ar' ? 'جاري البحث...' : 'Searching...'}</div>`;

  let params = [];
  if (searchTerm) params.push(`q=${encodeURIComponent(searchTerm)}`);
  if (currentJobFilter !== 'all') params.push(`job=${encodeURIComponent(currentJobFilter)}`);
  if (cityFilter) params.push(`city=${encodeURIComponent(cityFilter)}`);
  if (countryFilter) params.push(`country=${encodeURIComponent(countryFilter)}`);

  const result = await apiGet('/api/workers/search?' + params.join('&'));
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

// ========== REGISTRATION ==========
function selectVerify(el, method) {
  document.querySelectorAll('.verify-method').forEach(m => m.classList.remove('selected'));
  el.classList.add('selected');
  currentVerifyMethod = method;

  const methodText = document.getElementById('verifyMethodText');
  if (methodText) {
    const texts = {
      whatsapp: currentLang === 'ar' ? 'عبر الواتساب' : 'via WhatsApp',
      sms: currentLang === 'ar' ? 'عبر الرسالة القصيرة' : 'via SMS',
      email: currentLang === 'ar' ? 'عبر البريد الإلكتروني' : 'via Email'
    };
    methodText.textContent = texts[method] || '';
  }
}

async function goToVerify() {
  const name = document.getElementById('regName').value.trim();
  const countryCode = document.getElementById('regCountry').value;
  const phoneRaw = document.getElementById('regPhone').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const job = document.getElementById('regJob').value;
  const city = document.getElementById('regCity').value;
  const area = document.getElementById('regArea').value.trim();
  const v = translations.validation || {};

  if (!name) { alert('⚠️ ' + (v.nameRequired || 'Name required')); return; }
  if (!countryCode) { alert('⚠️ ' + (v.countryRequired || 'Country required')); return; }
  if (!phoneRaw) { alert('⚠️ ' + (v.phoneRequired || 'Phone required')); return; }
  if (!job) { alert('⚠️ ' + (v.jobRequired || 'Job required')); return; }
  if (!city) { alert('⚠️ ' + (v.cityRequired || 'City required')); return; }
  if (!area) { alert('⚠️ ' + (v.areaRequired || 'Area required')); return; }

  const c = countriesData[countryCode];
  const codeDigits = c.code.replace('+', '');
  currentPhone = codeDigits + phoneRaw.replace(/^0+/, '');

  const result = await apiPost('/api/verify/send', { 
    phone: currentPhone, 
    method: currentVerifyMethod,
    email: email 
  });

  if (!result.success) {
    alert('⚠️ ' + result.message);
    return;
  }

  document.getElementById('verifyPhoneNum').textContent = '+' + currentPhone;
  document.getElementById('regStep1').style.display = 'none';
  document.getElementById('regStep2').style.display = 'block';
  document.getElementById('successMsg').classList.add('show');

  if (result.demoCode) {
    console.log('🔐 Demo OTP:', result.demoCode);
    setTimeout(() => {
      const inputs = document.querySelectorAll('.otp-input');
      const code = result.demoCode.split('');
      inputs.forEach((input, i) => { if (code[i]) input.value = code[i]; });
    }, 1000);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function moveOtp(input, index) {
  input.value = input.value.replace(/[^0-9]/g, '');
  if (input.value && index < 3) {
    document.querySelectorAll('.otp-input')[index + 1].focus();
  }
  const allFilled = Array.from(document.querySelectorAll('.otp-input')).every(i => i.value.length === 1);
  if (allFilled) setTimeout(verifyOtp, 300);
}

async function verifyOtp() {
  const code = Array.from(document.querySelectorAll('.otp-input')).map(i => i.value).join('');
  const v = translations.validation || {};

  if (code.length !== 4) {
    alert('⚠️ ' + (v.otpRequired || 'Enter complete code'));
    return;
  }

  const verifyResult = await apiPost('/api/verify/check', { phone: currentPhone, code });
  if (!verifyResult.success) {
    alert('⚠️ ' + verifyResult.message);
    return;
  }

  const countryCode = document.getElementById('regCountry').value;
  const jobKey = document.getElementById('regJob').value;
  const jobLabel = translations.jobs ? translations.jobs[jobKey] : jobKey;

  const workerData = {
    name: document.getElementById('regName').value.trim(),
    phone: currentPhone,
    email: email,
    job: jobLabel || jobKey,
    jobEn: jobKey,
    desc: document.getElementById('regDesc').value.trim(),
    descEn: document.getElementById('regDesc').value.trim(),
    country: countryCode,
    city: document.getElementById('regCity').value,
    area: document.getElementById('regArea').value.trim(),
    exp: document.getElementById('regExp').value,
    expEn: document.getElementById('regExp').value,
    verifyMethod: currentVerifyMethod
  };

  const regResult = await apiPost('/api/workers', workerData);
  if (!regResult.success) {
    alert('⚠️ ' + regResult.message);
    return;
  }

  document.getElementById('regStep2').style.display = 'none';
  document.getElementById('regStep3').style.display = 'block';
  loadStats();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function resendCode() {
  const result = await apiPost('/api/verify/send', { 
    phone: currentPhone, 
    method: currentVerifyMethod 
  });
  if (result.success) {
    alert('🔄 ' + (currentLang === 'ar' ? 'تم إعادة الإرسال!' : 'Resent!'));
    document.querySelectorAll('.otp-input').forEach(input => input.value = '');
    document.querySelectorAll('.otp-input')[0].focus();
    if (result.demoCode) console.log('🔐 New Demo OTP:', result.demoCode);
  } else {
    alert('⚠️ ' + result.message);
  }
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', async function() {
  // Step 1: Load countries first (needed for everything)
  await loadCountries();

  // Step 2: Load translations
  await loadTranslations();

  // Step 3: Page-specific init
  if (document.getElementById('workersList')) {
    loadWorkers();
    populateJobFilters();
  }

  if (document.getElementById('countriesGrid')) {
    loadStats();
  }

  if (document.getElementById('regJob')) {
    populateJobs();
  }

  // URL params
  const urlParams = new URLSearchParams(window.location.search);
  const countryParam = urlParams.get('country');
  const jobParam = urlParams.get('job');

  if (countryParam && document.getElementById('countryFilter')) {
    document.getElementById('countryFilter').value = countryParam;
    onCountryChange();
  }

  if (jobParam && document.getElementById('searchInput')) {
    document.getElementById('searchInput').value = jobParam;
    filterWorkers();
  }
});

document.addEventListener('dblclick', function(e) { e.preventDefault(); }, { passive: false });

console.log('🛠️ Mahanti V2 Loaded!');
