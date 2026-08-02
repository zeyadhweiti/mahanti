const express = require('express');
const cors = require('cors');
const path = require('path');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
const adapter = new JSONFile(path.join(__dirname, 'db.json'));
const db = new Low(adapter);

// Default data
const defaultData = {
  workers: [
    {
      id: "w1",
      name: "أحمد محمد العلي",
      phone: "0555123456",
      job: "بناء",
      desc: "بناء طوب وقصارة وتشطيب",
      city: "الرياض",
      area: "حي النسيم",
      exp: "5 سنوات خبرة",
      verified: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "w2",
      name: "خالد عبدالرحمن",
      phone: "0555987654",
      job: "نجار",
      desc: "نجارة أبواب وشبابيك ودواليب",
      city: "جدة",
      area: "حي الصفا",
      exp: "12 سنة خبرة",
      verified: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "w3",
      name: "سلطان المطيري",
      phone: "0555345678",
      job: "حداد",
      desc: "حدادة أبواب حديد وشبابيك ودرابزين",
      city: "الدمام",
      area: "حي الفيصلية",
      exp: "8 سنوات خبرة",
      verified: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "w4",
      name: "ناصر الدوسري",
      phone: "0555765432",
      job: "لحام",
      desc: "لحام حديد وستانلس وخزانات",
      city: "الرياض",
      area: "حي العزيزية",
      exp: "6 سنوات خبرة",
      verified: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "w5",
      name: "فهد السبيعي",
      phone: "0555890123",
      job: "سائق",
      desc: "سائق نقل خفيف وثقيل - رخصة عمومي",
      city: "مكة",
      area: "حي الزاهر",
      exp: "10 سنوات خبرة",
      verified: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "w6",
      name: "محمد الشمري",
      phone: "0555456789",
      job: "بناء",
      desc: "بناء عظم وتشطيب كامل",
      city: "بريدة",
      area: "حي النقرة",
      exp: "15 سنة خبرة",
      verified: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "w7",
      name: "عبدالله القحطاني",
      phone: "0555234567",
      job: "سباك",
      desc: "سباكة مواسير وصرف صحي وتركيب سخانات",
      city: "جدة",
      area: "حي الروضة",
      exp: "7 سنوات خبرة",
      verified: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "w8",
      name: "سعد العتيبي",
      phone: "0555678901",
      job: "كهربائي",
      desc: "كهرباء منازل وتركيبات وصيانة",
      city: "الدمام",
      area: "حي الشاطئ",
      exp: "9 سنوات خبرة",
      verified: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "w9",
      name: "يوسف الحربي",
      phone: "0555345012",
      job: "صباغ",
      desc: "دهانات داخلية وخارجية وديكورات",
      city: "الرياض",
      area: "حي اليرموك",
      exp: "4 سنوات خبرة",
      verified: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "w10",
      name: "عمر الزهراني",
      phone: "0555789012",
      job: "بليط",
      desc: "تركيب سيراميك ورخام وبورسلان",
      city: "مكة",
      area: "حي العوالي",
      exp: "11 سنة خبرة",
      verified: true,
      createdAt: new Date().toISOString()
    }
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
  console.log('✅ Database initialized');
}).catch(err => {
  console.error('❌ Database error:', err);
});

// ===================== API ROUTES =====================

// Get all workers
app.get('/api/workers', async (req, res) => {
  await db.read();
  res.json({ success: true, count: db.data.workers.length, data: db.data.workers });
});

// Get single worker
app.get('/api/workers/:id', async (req, res) => {
  await db.read();
  const worker = db.data.workers.find(w => w.id === req.params.id);
  if (!worker) return res.status(404).json({ success: false, message: 'العامل غير موجود' });
  res.json({ success: true, data: worker });
});

// Search workers
app.get('/api/workers/search', async (req, res) => {
  await db.read();
  const { q, job, city } = req.query;
  let results = db.data.workers;

  if (q) {
    const term = q.toLowerCase();
    results = results.filter(w => 
      w.name.toLowerCase().includes(term) ||
      w.job.toLowerCase().includes(term) ||
      w.desc.toLowerCase().includes(term) ||
      w.city.toLowerCase().includes(term) ||
      w.area.toLowerCase().includes(term)
    );
  }

  if (job && job !== 'all') {
    results = results.filter(w => w.job === job);
  }

  if (city) {
    results = results.filter(w => w.city === city);
  }

  res.json({ success: true, count: results.length, data: results });
});

// Register new worker
app.post('/api/workers', async (req, res) => {
  await db.read();

  const { name, phone, job, desc, city, area, exp } = req.body;

  // Validation
  if (!name || !phone || !job || !city || !area) {
    return res.status(400).json({ success: false, message: 'جميع الحقول المطلوبة يجب ملؤها' });
  }

  // Check if phone already exists
  const exists = db.data.workers.find(w => w.phone === phone);
  if (exists) {
    return res.status(400).json({ success: false, message: 'رقم الجوال مسجل مسبقاً' });
  }

  const newWorker = {
    id: uuidv4(),
    name,
    phone,
    job,
    desc: desc || '',
    city,
    area,
    exp: exp || 'أقل من سنة',
    verified: true,
    createdAt: new Date().toISOString()
  };

  db.data.workers.push(newWorker);
  await db.write();

  res.status(201).json({ success: true, message: 'تم التسجيل بنجاح', data: newWorker });
});

// Send OTP
app.post('/api/verify/send', async (req, res) => {
  const { phone, method } = req.body;

  if (!phone || !/^05\d{8}$/.test(phone)) {
    return res.status(400).json({ success: false, message: 'رقم الجوال غير صحيح' });
  }

  // Generate 4-digit code
  const code = Math.floor(1000 + Math.random() * 9000).toString();

  await db.read();
  db.data.verifications[phone] = {
    code,
    method: method || 'sms',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes
  };
  await db.write();

  // In production: send real SMS via Twilio or similar
  console.log(`📱 OTP for ${phone}: ${code} (via ${method || 'sms'})`);

  res.json({ 
    success: true, 
    message: `تم إرسال رمز التحقق عبر ${method === 'whatsapp' ? 'الواتساب' : 'الرسالة'}`,
    // Remove this in production!
    demoCode: code 
  });
});

// Verify OTP
app.post('/api/verify/check', async (req, res) => {
  const { phone, code } = req.body;

  await db.read();
  const verification = db.data.verifications[phone];

  if (!verification) {
    return res.status(400).json({ success: false, message: 'لم يتم إرسال رمز تحقق لهذا الرقم' });
  }

  if (new Date() > new Date(verification.expiresAt)) {
    return res.status(400).json({ success: false, message: 'انتهت صلاحية رمز التحقق' });
  }

  if (verification.code !== code) {
    return res.status(400).json({ success: false, message: 'رمز التحقق غير صحيح' });
  }

  // Delete verification after successful check
  delete db.data.verifications[phone];
  await db.write();

  res.json({ success: true, message: 'تم التحقق بنجاح' });
});

// Get stats
app.get('/api/stats', async (req, res) => {
  await db.read();
  const workers = db.data.workers;
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
  console.log('╔══════════════════════════════════════════╗');
  console.log('║         🛠️  مهنتي - Backend جاهز!        ║');
  console.log('╠══════════════════════════════════════════╣');
  console.log(`║  🌐 الرابط: http://localhost:${PORT}        ║`);
  console.log('║                                          ║');
  console.log('║  📋 API Endpoints:                       ║');
  console.log('║  • GET  /api/workers                     ║');
  console.log('║  • GET  /api/workers/search?q=...        ║');
  console.log('║  • POST /api/workers                     ║');
  console.log('║  • POST /api/verify/send                 ║');
  console.log('║  • POST /api/verify/check                ║');
  console.log('║  • GET  /api/stats                       ║');
  console.log('╚══════════════════════════════════════════╝');
});
