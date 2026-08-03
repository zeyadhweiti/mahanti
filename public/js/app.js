/* ============================================
   MAHANTI V2 - Global Trades Directory
   Multi-language | Multi-country | Multi-verify
   ============================================ */

const API_URL = window.location.origin;
let currentLang = localStorage.getItem('mahanti_lang') || 'ar';
let currentCountryFilter = '';
let currentJobFilter = 'all';
let currentVerifyMethod = 'whatsapp';
let currentPhone = '';
let countriesData = {};
let translations = {};

// ========== LANGUAGE SYSTEM ==========
async function loadTranslations() {
  const res = await fetch(`${API_URL}/api/translations/${currentLang}`);
  const result = await res.json();
  if (result.success) {
    translations = result.data;
    applyTranslations();
  }
}

function applyTranslations() {
  document.documentElement.lang = currentLang;
  document.body.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

  // Update lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });

  // Translate all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const value = getNestedValue(translations, key);
    if (value) el.textContent = value;
  });

  // Translate placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    const value = getNestedValue(translations, key);
    if (value) el.placeholder = value;
  });

  // Update page title
  const appName = translations.appName || 'Mahanti';
  if (document.title.includes('Mahanti') || document.title.includes('مهنتي')) {
    document.title = document.title.replace(/Mahanti|مهنتي/g, appName);
  }
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((o, p) => o && o[p], obj);
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('mahanti_lang', lang);
  loadTranslations().then(() => {
    // Reload page-specific data
    if (document.getElementById('workersList')) loadWorkers();
    if (document.getElementById('countriesGrid')) loadCountries();
    if (document.getElementById('regCountry')) populateCountries();
    if (document.getElementById('regJob')) populateJobs();
  });
}

// ========== API HELPERS ==========
async function apiGet(endpoint) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`);
    return await res.json();
  } catch (err) {
    console.error('API Error:', err);
    return { success: false, message: 'Connection error' };
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
    return { success: false, message: 'Connection error' };
  }
}

// ========== COUNTRIES DATA ==========
async function loadCountries() {
  const result = await apiGet('/api/countries');
  if (result.success) {
    countriesData = result.data;
    renderCountries();
    populateCountryFilters();
    populateCountries();
  }
}

function renderCountries() {
  const grid = document.getElementById('countriesGrid');
  if (!grid) return;

  grid.innerHTML = Object.entries(countriesData).map(([code, c]) => `
    <a href="search.html?country=${code}" class="country-chip">
      <span class="flag">${c.flag}</span>
      <span>${currentLang === 'ar' ? c.nameAr : c.nameEn}</span>
    </a>
  `).join('');
}

function populateCountryFilters() {
  const filters = ['countryFilter'];
  filters.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const currentVal = el.value;
    const allText = currentLang === 'ar' ? '🌍 جميع البلدان' : '🌍 All Countries';
    el.innerHTML = `<option value="">${allText}</option>` + 
      Object.entries(countriesData).map(([code, c]) => 
        `<option value="${code}" ${currentVal === code ? 'selected' : ''}>${c.flag} ${currentLang === 'ar' ? c.nameAr : c.nameEn}</option>`
      ).join('');
  });
}

function populateCountries() {
  const el = document.getElementById('regCountry');
  if (!el) return;
  const selectText = currentLang === 'ar' ? 'اختر البلد' : 'Select Country';
  el.innerHTML = `<option value="">${selectText}</option>` + 
    Object.entries(countriesData).map(([code, c]) => 
      `<option value="${code}">${c.flag} ${currentLang === 'ar' ? c.nameAr : c.nameEn} (${c.code})</option>`
    ).join('');
}

// ========== CITIES & PHONE BY COUNTRY ==========
function onRegCountryChange() {
  const countryCode = document.getElementById('regCountry').value;
  if (!countryCode || !countriesData[countryCode]) return;

  const country = countriesData[countryCode];

  // Update phone code
  document.getElementById('phoneCode').textContent = country.code;
  document.getElementById('phoneHint').textContent = 
    (currentLang === 'ar' ? 'مثال: ' : 'Example: ') + country.phoneExample;

  // Update cities
  const citySelect = document.getElementById('regCity');
  const selectText = currentLang === 'ar' ? 'اختر المدينة' : 'Select City';
  citySelect.innerHTML = `<option value="">${selectText}</option>` + 
    country.cities.map(city => `<option value="${city}">${city}</option>`).join('');
}

function onCountryChange() {
  currentCountryFilter = document.getElementById('countryFilter').value;

  // Update city filter based on country
  const cityFilter = document.getElementById('cityFilter');
  if (cityFilter && currentCountryFilter && countriesData[currentCountryFilter]) {
    const allCitiesText = currentLang === 'ar' ? '📍 جميع المدن' : '📍 All Cities';
    cityFilter.innerHTML = `<option value="">${allCitiesText}</option>` + 
      countriesData[currentCountryFilter].cities.map(city => `<option value="${city}">${city}</option>`).join('');
  } else if (cityFilter) {
    const allCitiesText = currentLang === 'ar' ? '📍 جميع المدن' : '📍 All Cities';
    cityFilter.innerHTML = `<option value="">${allCitiesText}</option>`;
  }

  filterWorkers();
}

// ========== JOBS ==========
function populateJobs() {
  const el = document.getElementById('regJob');
  if (!el) return;

  const jobs = translations.jobs || {};
  const selectText = currentLang === 'ar' ? 'اختر المهنة' : 'Select Trade';
  el.innerHTML = `<option value="">${selectText}</option>` + 
    Object.entries(jobs).map(([key, label]) => 
      `<option value="${key}">${label}</option>`
    ).join('');
}

// ========== STATS ==========
async function loadStats() {
  const result = await apiGet('/api/stats');
  if (result.success) {
    const d = result.data;
    if (document.getElementById('statWorkers')) document.getElementById('statWorkers').textContent = d.workers;
    if (document.getElementById('statJobs')) document.getElementById('statJobs').textContent = d.jobs;
    if (document.getElementById('statCities')) document.getElementById('statCities').textContent = d.cities;
    if (document.getElementById('statCountries')) document.getElementById('statCountries').textContent = d.countries;
  }
}

// ========== LOAD WORKERS ==========
async function loadWorkers() {
  const list = document.getElementById('workersList');
  if (!list) return;

  const loadingText = currentLang === 'ar' ? '⏳ جاري تحميل البيانات...' : '⏳ Loading...';
  list.innerHTML = `<div style="text-align:center;padding:30px;color:var(--text-gray);"><div style="font-size:32px;margin-bottom:10px;">⏳</div>${loadingText}</div>`;

  const result = await apiGet('/api/workers');
  if (result.success) {
    renderWorkers(result.data);
  }
}

function renderWorkers(workers) {
  const list = document.getElementById('workersList');
  if (!list) return;

  if (workers.length === 0) {
    const noResults = translations.noResults || 'No Results';
    const noResultsDesc = translations.noResultsDesc || 'Try different keywords';
    list.innerHTML = `
      <div style="text-align:center;padding:40px 20px;color:var(--text-gray);">
        <div style="font-size:48px;margin-bottom:12px;">😕</div>
        <h3 style="color:var(--primary-green);margin-bottom:8px;">${noResults}</h3>
        <p>${noResultsDesc}</p>
      </div>`;
    return;
  }

  list.innerHTML = workers.map(w => {
    const country = countriesData[w.country];
    const flag = country ? country.flag : '🌍';
    const countryName = country ? (currentLang === 'ar' ? country.nameAr : country.nameEn) : w.country;
    const jobName = currentLang === 'ar' ? w.job : (w.jobEn || w.job);
    const desc = currentLang === 'ar' ? w.desc : (w.descEn || w.desc);
    const exp = currentLang === 'ar' ? w.exp : (w.expEn || w.exp);
    const locationLabel = getNestedValue(translations, 'workerCard.location') || '📍';
    const expLabel = getNestedValue(translations, 'workerCard.experience') || '⭐';
    const descLabel = getNestedValue(translations, 'workerCard.description') || '📝';
    const waText = getNestedValue(translations, 'whatsapp') || '📱 WhatsApp';
    const callText = getNestedValue(translations, 'call') || '📞 Call';

    return `
    <div class="worker-card" data-job="${w.job}" data-city="${w.city}" data-country="${w.country}">
      <div class="worker-header">
        <div class="worker-name">
          ${w.name}
          <span class="worker-country">${flag} ${countryName}</span>
        </div>
        <div class="worker-job">${jobName}</div>
      </div>
      <div class="worker-info">
        <span>${locationLabel} ${w.city} - ${w.area}</span><br>
        <span>${expLabel} ${exp}</span><br>
        <span>${descLabel} ${desc}</span>
      </div>
      <div class="worker-actions">
        <a href="https://wa.me/${w.phone}" class="btn btn-whatsapp" target="_blank">${waText}</a>
        <a href="tel:${w.phone}" class="btn btn-call">${callText}</a>
      </div>
    </div>
  `}).join('');
}

// ========== SEARCH & FILTER ==========
async function filterWorkers() {
  const searchTerm = document.getElementById('searchInput')?.value.trim() || '';
  const cityFilter = document.getElementById('cityFilter')?.value || '';
  const countryFilter = document.getElementById('countryFilter')?.value || '';

  const list = document.getElementById('workersList');
  if (!list) return;

  const loadingText = currentLang === 'ar' ? '⏳ جاري البحث...' : '⏳ Searching...';
  list.innerHTML = `<div style="text-align:center;padding:20px;color:var(--text-gray);">${loadingText}</div>`;

  let endpoint = '/api/workers/search?';
  const params = [];
  if (searchTerm) params.push(`q=${encodeURIComponent(searchTerm)}`);
  if (currentJobFilter !== 'all') params.push(`job=${encodeURIComponent(currentJobFilter)}`);
  if (cityFilter) params.push(`city=${encodeURIComponent(cityFilter)}`);
  if (countryFilter) params.push(`country=${encodeURIComponent(countryFilter)}`);

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

// ========== REGISTRATION FLOW ==========
function selectVerify(el, method) {
  document.querySelectorAll('.verify-method').forEach(m => m.classList.remove('selected'));
  el.classList.add('selected');
  currentVerifyMethod = method;

  // Update verify text
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

  if (!name) { alert('⚠️ ' + (v.nameRequired || 'Name required')); document.getElementById('regName').focus(); return; }
  if (!countryCode) { alert('⚠️ ' + (v.countryRequired || 'Country required')); document.getElementById('regCountry').focus(); return; }
  if (!phoneRaw) { alert('⚠️ ' + (v.phoneRequired || 'Phone required')); document.getElementById('regPhone').focus(); return; }
  if (!job) { alert('⚠️ ' + (v.jobRequired || 'Job required')); document.getElementById('regJob').focus(); return; }
  if (!city) { alert('⚠️ ' + (v.cityRequired || 'City required')); document.getElementById('regCity').focus(); return; }
  if (!area) { alert('⚠️ ' + (v.areaRequired || 'Area required')); document.getElementById('regArea').focus(); return; }

  // Build full phone with country code
  const country = countriesData[countryCode];
  const codeDigits = country.code.replace('+', '');
  currentPhone = codeDigits + phoneRaw.replace(/^0+/, '');

  // Send OTP
  const result = await apiPost('/api/verify/send', { 
    phone: currentPhone, 
    method: currentVerifyMethod,
    email: email 
  });

  if (!result.success) {
    alert('⚠️ ' + result.message);
    return;
  }

  // Show verification step
  document.getElementById('verifyPhoneNum').textContent = '+' + currentPhone;
  document.getElementById('regStep1').style.display = 'none';
  document.getElementById('regStep2').style.display = 'block';
  document.getElementById('successMsg').classList.add('show');

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

function moveOtp(input, index) {
  input.value = input.value.replace(/[^0-9]/g, '');
  if (input.value && index < 3) {
    const inputs = document.querySelectorAll('.otp-input');
    inputs[index + 1].focus();
  }
  const allInputs = document.querySelectorAll('.otp-input');
  const allFilled = Array.from(allInputs).every(i => i.value.length === 1);
  if (allFilled) setTimeout(verifyOtp, 300);
}

async function verifyOtp() {
  const otpInputs = document.querySelectorAll('.otp-input');
  const code = Array.from(otpInputs).map(i => i.value).join('');
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

  // Register worker
  const countryCode = document.getElementById('regCountry').value;
  const country = countriesData[countryCode];
  const jobKey = document.getElementById('regJob').value;
  const jobLabel = translations.jobs ? translations.jobs[jobKey] : jobKey;

  const workerData = {
    name: document.getElementById('regName').value.trim(),
    phone: currentPhone,
    email: document.getElementById('regEmail').value.trim(),
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
  await loadCountries();
  await loadTranslations();

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
  const jobParam = urlParams.get('job');
  const countryParam = urlParams.get('country');

  if (countryParam && document.getElementById('countryFilter')) {
    document.getElementById('countryFilter').value = countryParam;
    onCountryChange();
  }

  if (jobParam && document.getElementById('searchInput')) {
    document.getElementById('searchInput').value = jobParam;
    filterWorkers();
  }
});

function populateJobFilters() {
  const container = document.getElementById('jobFilters');
  if (!container) return;
  const allText = currentLang === 'ar' ? 'الكل' : 'All';
  const jobs = translations.jobs || {};

  container.innerHTML = `<button class="filter-tag active" onclick="filterByJob('all', this)">${allText}</button>` + 
    Object.entries(jobs).slice(0, 9).map(([key, label]) => {
      const name = label.replace(/[🧱🪵🔩🔥🔧⚡🚗🎨🏠🏗️🪟❄️🛋️🚪🧹🌳🛗📌]/g, '').trim();
      return `<button class="filter-tag" onclick="filterByJob('${key}', this)">${name}</button>`;
    }).join('');
}

// Prevent zoom on double-tap
document.addEventListener('dblclick', function(event) {
  event.preventDefault();
}, { passive: false });

console.log('🛠️ Mahanti V2 - Global Trades Directory Loaded!');
