const express = require('express');
const cors = require('cors');
const path = require('path');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const { countries } = require('./data/countries');
const { i18n } = require('./data/i18n');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
const adapter = new JSONFile(path.join(__dirname, 'data', 'db.json'));
const db = new Low(adapter);

// Default data with sample workers from multiple countries
const defaultData = {
  workers: [
    // Saudi Arabia
    { id: "w1", name: "أحمد محمد العلي", phone: "966501234567", job: "بناء", jobEn: "Builder", desc: "بناء طوب وقصارة وتشطيب", descEn: "Brick laying, plastering & finishing", country: "sa", city: "الرياض", area: "حي النسيم", exp: "5 سنوات خبرة", expEn: "5 years experience", verified: true, verifyMethod: "whatsapp", createdAt: new Date().toISOString() },
    { id: "w2", name: "خالد عبدالرحمن", phone: "966509876543", job: "نجار", jobEn: "Carpenter", desc: "نجارة أبواب وشبابيك ودواليب", descEn: "Doors, windows & cabinets carpentry", country: "sa", city: "جدة", area: "حي الصفا", exp: "12 سنة خبرة", expEn: "12 years experience", verified: true, verifyMethod: "sms", createdAt: new Date().toISOString() },
    { id: "w3", name: "سلطان المطيري", phone: "966503456789", job: "حداد", jobEn: "Blacksmith", desc: "حدادة أبواب حديد وشبابيك ودرابزين", descEn: "Iron doors, windows & railings", country: "sa", city: "الدمام", area: "حي الفيصلية", exp: "8 سنوات خبرة", expEn: "8 years experience", verified: true, verifyMethod: "whatsapp", createdAt: new Date().toISOString() },
    { id: "w4", name: "فهد السبيعي", phone: "966508901234", job: "سائق", jobEn: "Driver", desc: "سائق نقل خفيف وثقيل - رخصة عمومي", descEn: "Light & heavy transport driver", country: "sa", city: "مكة", area: "حي الزاهر", exp: "10 سنوات خبرة", expEn: "10 years experience", verified: true, verifyMethod: "email", createdAt: new Date().toISOString() },

    // Egypt
    { id: "w5", name: "محمد أحمد حسن", phone: "201012345678", job: "كهربائي", jobEn: "Electrician", desc: "كهرباء منازل وتركيبات وصيانة", descEn: "Home electricity, installations & maintenance", country: "eg", city: "القاهرة", area: "مدينة نصر", exp: "7 سنوات خبرة", expEn: "7 years experience", verified: true, verifyMethod: "whatsapp", createdAt: new Date().toISOString() },
    { id: "w6", name: "عبدالله محمود", phone: "201198765432", job: "سباك", jobEn: "Plumber", desc: "سباكة مواسير وصرف صحي وتركيب سخانات", descEn: "Pipes, drainage & water heater installation", country: "eg", city: "الإسكندرية", area: "سموحة", exp: "9 سنوات خبرة", expEn: "9 years experience", verified: true, verifyMethod: "sms", createdAt: new Date().toISOString() },
    { id: "w7", name: "عمر خالد", phone: "201155443322", job: "صباغ", jobEn: "Painter", desc: "دهانات داخلية وخارجية وديكورات", descEn: "Interior, exterior paint & decorations", country: "eg", city: "الجيزة", area: "الدقي", exp: "4 سنوات خبرة", expEn: "4 years experience", verified: true, verifyMethod: "whatsapp", createdAt: new Date().toISOString() },

    // Jordan
    { id: "w8", name: "أحمد سلامة", phone: "962790123456", job: "بليط", jobEn: "Tiler", desc: "تركيب سيراميك ورخام وبورسلان", descEn: "Ceramic, marble & porcelain installation", country: "jo", city: "عمان", area: "جبل عمان", exp: "11 سنة خبرة", expEn: "11 years experience", verified: true, verifyMethod: "whatsapp", createdAt: new Date().toISOString() },
    { id: "w9", name: "خالد النعيمي", phone: "962779876543", job: "لحام", jobEn: "Welder", desc: "لحام حديد وستانلس وخزانات", descEn: "Iron, stainless steel & tank welding", country: "jo", city: "إربد", area: "الحي الشرقي", exp: "6 سنوات خبرة", expEn: "6 years experience", verified: true, verifyMethod: "sms", createdAt: new Date().toISOString() },

    // UAE
    { id: "w10", name: "Ali Hassan", phone: "971501234567", job: "تكييف", jobEn: "AC Technician", desc: "تركيب وصيانة مكيفات", descEn: "AC installation & maintenance", country: "ae", city: "دبي", area: "بر دبي", exp: "8 سنوات خبرة", expEn: "8 years experience", verified: true, verifyMethod: "whatsapp", createdAt: new Date().toISOString() },
    { id: "w11", name: "Rashid Al-Mansouri", phone: "971559876543", job: "ميكانيكي", jobEn: "Mechanic", desc: "صيانة سيارات وكشف أعطال", descEn: "Car maintenance & diagnostics", country: "ae", city: "أبوظبي", area: "المركزية", exp: "15 سنة خبرة", expEn: "15 years experience", verified: true, verifyMethod: "email", createdAt: new Date().toISOString() },

    // Qatar
    { id: "w12", name: "محمد العطية", phone: "97433123456", job: "جبس", jobEn: "Gypsum", desc: "ديكورات جبس وأسقف مستعارة", descEn: "Gypsum decorations & false ceilings", country: "qa", city: "الدوحة", area: "السد", exp: "10 سنوات خبرة", expEn: "10 years experience", verified: true, verifyMethod: "whatsapp", createdAt: new Date().toISOString() },

    // Iraq
    { id: "w13", name: "علي كريم", phone: "9647701234567", job: "حداد", jobEn: "Blacksmith", desc: "حدادة عامة وأبواب حديد", descEn: "General blacksmithing & iron doors", country: "iq", city: "بغداد", area: "الكرادة", exp: "13 سنة خبرة", expEn: "13 years experience", verified: true, verifyMethod: "sms", createdAt: new Date().toISOString() },

    // Lebanon
    { id: "w14", name: "جورج سمعان", phone: "96131234567", job: "ألمنيوم", jobEn: "Aluminum", desc: "شبابيك وأبواب ألمنيوم", descEn: "Aluminum windows & doors", country: "lb", city: "بيروت", area: "الأشرفية", exp: "7 سنوات خبرة", expEn: "7 years experience", verified: true, verifyMethod: "whatsapp", createdAt: new Date().toISOString() },

    // Morocco
    { id: "w15", name: "Youssef Benali", phone: "212612345678", job: "نجار", jobEn: "Carpenter", desc: "نجارة أثاث تقليدي وحديث", descEn: "Traditional & modern furniture carpentry", country: "ma", city: "الدار البيضاء", area: "عين الدياب", exp: "20 سنة خبرة", expEn: "20 years experience", verified: true, verifyMethod: "email", createdAt: new Date().toISOString() },

    // Turkey
    { id: "w16", name: "Mehmet Yılmaz", phone: "905321234567", job: "بناء", jobEn: "Builder", desc: "بناء وترميم منازل", descEn: "Building & home renovation", country: "tr", city: "إسطنبول", area: "فاتح", exp: "9 سنوات خبرة", expEn: "9 years experience", verified: true, verifyMethod: "whatsapp", createdAt: new Date().toISOString() }
  ],
  verifications: {}
};

// Initialize database
async function initDb() {
  await db.read();
  db.data = db.data || defaultData;
  await db.write();
}

initDb().then(() => {
  console.log('✅ Database initialized with multi-country data');
}).catch(err => {
  console.error('❌ Database error:', err);
});

// ===================== API ROUTES =====================

// Get all countries data
app.get('/api/countries', (req, res) => {
  res.json({ success: true, data: countries });
});

// Get single country
app.get('/api/countries/:code', (req, res) => {
  const country = countries[req.params.code];
  if (!country) return res.status(404).json({ success: false, message: 'Country not found' });
  res.json({ success: true, data: country });
});

// Get translations
app.get('/api/translations/:lang', (req, res) => {
  const lang = req.params.lang;
  if (!i18n[lang]) return res.status(404).json({ success: false, message: 'Language not supported' });
  res.json({ success: true, data: i18n[lang] });
});

// Get all workers (with optional country filter)
app.get('/api/workers', async (req, res) => {
  await db.read();
  let workers = db.data.workers;

  if (req.query.country) {
    workers = workers.filter(w => w.country === req.query.country);
  }

  res.json({ success: true, count: workers.length, data: workers });
});

// Get single worker
app.get('/api/workers/:id', async (req, res) => {
  await db.read();
  const worker = db.data.workers.find(w => w.id === req.params.id);
  if (!worker) return res.status(404).json({ success: false, message: 'Worker not found' });
  res.json({ success: true, data: worker });
});

// Search workers
app.get('/api/workers/search', async (req, res) => {
  await db.read();
  const { q, job, city, country } = req.query;
  let results = db.data.workers;

  if (q) {
    const term = q.toLowerCase();
    results = results.filter(w => 
      w.name.toLowerCase().includes(term) ||
      w.job.toLowerCase().includes(term) ||
      w.jobEn.toLowerCase().includes(term) ||
      w.desc.toLowerCase().includes(term) ||
      w.descEn.toLowerCase().includes(term) ||
      w.city.toLowerCase().includes(term) ||
      w.area.toLowerCase().includes(term)
    );
  }

  if (job && job !== 'all') {
    results = results.filter(w => w.job === job || w.jobEn === job);
  }

  if (city) {
    results = results.filter(w => w.city === city);
  }

  if (country) {
    results = results.filter(w => w.country === country);
  }

  res.json({ success: true, count: results.length, data: results });
});

// Register new worker
app.post('/api/workers', async (req, res) => {
  await db.read();

  const { name, phone, email, job, jobEn, desc, descEn, country, city, area, exp, expEn, verifyMethod } = req.body;

  // Validation
  if (!name || !phone || !job || !country || !city || !area) {
    return res.status(400).json({ success: false, message: 'All required fields must be filled' });
  }

  // Check if phone already exists
  const exists = db.data.workers.find(w => w.phone === phone);
  if (exists) {
    return res.status(400).json({ success: false, message: 'Phone number already registered' });
  }

  const countryData = countries[country];
  const newWorker = {
    id: uuidv4(),
    name,
    phone,
    email: email || '',
    job,
    jobEn: jobEn || job,
    desc: desc || '',
    descEn: descEn || desc || '',
    country,
    city,
    area,
    exp: exp || 'Less than 1 year',
    expEn: expEn || exp || 'Less than 1 year',
    verified: true,
    verifyMethod: verifyMethod || 'sms',
    createdAt: new Date().toISOString()
  };

  db.data.workers.push(newWorker);
  await db.write();

  res.status(201).json({ success: true, message: 'Registration successful', data: newWorker });
});

// Send OTP
app.post('/api/verify/send', async (req, res) => {
  const { phone, method, email } = req.body;

  if (!phone) {
    return res.status(400).json({ success: false, message: 'Phone number is required' });
  }

  // Generate 4-digit code
  const code = Math.floor(1000 + Math.random() * 9000).toString();

  await db.read();
  db.data.verifications[phone] = {
    code,
    method: method || 'sms',
    email: email || '',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes
  };
  await db.write();

  // In production: send real SMS via Twilio or email via SendGrid
  console.log(`📱 OTP for ${phone} (${method}): ${code}`);
  if (email) console.log(`📧 Also sent to email: ${email}`);

  res.json({ 
    success: true, 
    message: `Verification code sent via ${method}`,
    demoCode: code // Remove in production!
  });
});

// Verify OTP
app.post('/api/verify/check', async (req, res) => {
  const { phone, code } = req.body;

  await db.read();
  const verification = db.data.verifications[phone];

  if (!verification) {
    return res.status(400).json({ success: false, message: 'No verification code found for this number' });
  }

  if (new Date() > new Date(verification.expiresAt)) {
    return res.status(400).json({ success: false, message: 'Verification code expired' });
  }

  if (verification.code !== code) {
    return res.status(400).json({ success: false, message: 'Invalid verification code' });
  }

  delete db.data.verifications[phone];
  await db.write();

  res.json({ success: true, message: 'Verification successful' });
});

// Get stats
app.get('/api/stats', async (req, res) => {
  await db.read();
  const workers = db.data.workers;
  const jobs = [...new Set(workers.map(w => w.job))];
  const cities = [...new Set(workers.map(w => w.city))];
  const countryCodes = [...new Set(workers.map(w => w.country))];

  res.json({
    success: true,
    data: {
      workers: workers.length,
      jobs: jobs.length,
      cities: cities.length,
      countries: countryCodes.length
    }
  });
});

// Get stats by country
app.get('/api/stats/:country', async (req, res) => {
  await db.read();
  const workers = db.data.workers.filter(w => w.country === req.params.country);
  const jobs = [...new Set(workers.map(w => w.job))];
  const cities = [...new Set(workers.map(w => w.city))];

  res.json({
    success: true,
    data: {
      workers: workers.length,
      jobs: jobs.length,
      cities: cities.length
    }
  });
});

// ===================== FRONTEND ROUTES =====================

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ===================== START SERVER =====================

app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════════════╗');
  console.log('║     🛠️  MAHANTI V2 - Global Trades Directory       ║');
  console.log('╠════════════════════════════════════════════════════╣');
  console.log(`║  🌐 URL: http://localhost:${PORT}                    ║`);
  console.log('║                                                    ║');
  console.log('║  🌍 Supported: 35+ Countries                       ║');
  console.log('║  🌐 Languages: Arabic + English                    ║');
  console.log('║  ✅ Verification: Phone / WhatsApp / Email         ║');
  console.log('╚════════════════════════════════════════════════════╝');
});
