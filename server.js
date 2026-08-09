require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const admin = require('firebase-admin');

// 1. التهيئة والاتصال بـ Firebase Firestore
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// استدعاء بيانات الدول والترجمات
const { countries } = require('./data/countries');
const { translations } = require('./data/i18n');

// تخزين رموز OTP مؤقتاً في الذاكرة
const otpStore = new Map();

// ==========================================
// 🌐 APIs البيانات العامة والترجمات
// ==========================================

// جلب قائمة الدول
app.get('/api/countries', (req, res) => {
  res.json(countries);
});

// جلب دولة محددة
app.get('/api/countries/:code', (req, res) => {
  const country = countries.find(c => c.code === req.params.code.toUpperCase());
  if (!country) return res.status(404).json({ error: 'الدولة غير موجودة' });
  res.json(country);
});

// جلب الترجمات حسب اللغة
app.get('/api/translations/:lang', (req, res) => {
  const lang = req.params.lang.toLowerCase();
  res.json(translations[lang] || translations.ar);
});

// ==========================================
// 📱 APIs التوثيق وإرسال OTP
// ==========================================

// إرسال رمز OTP
app.post('/api/verify/send', (req, res) => {
  const { phone, method } = req.body;
  if (!phone) return res.status(400).json({ error: 'رقم الهاتف مطلوب' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(phone, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

  console.log(`[OTP] Sent to ${phone} via ${method || 'SMS'}: ${otp}`);

  res.json({
    success: true,
    message: 'تم إرسال رمز التحقق بنجاح',
    // لتسهيل التجربة والتطوير المحلية:
    debugOtp: process.env.NODE_ENV !== 'production' ? otp : undefined
  });
});

// التحقق من رمز OTP
app.post('/api/verify/check', (req, res) => {
  const { phone, otp } = req.body;
  const record = otpStore.get(phone);

  if (!record) {
    return res.status(400).json({ success: false, error: 'لم يتم طلب رمز لهذا الرقم' });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(phone);
    return res.status(400).json({ success: false, error: 'انتهت صلاحية الرمز' });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ success: false, error: 'رمز التحقق غير صحيح' });
  }

  otpStore.delete(phone);
  res.json({ success: true, message: 'تم التحقق بنجاح' });
});

// ==========================================
// 🛠️ APIs إدارة العمال (Firestore)
// ==========================================

// جلب جميع العمال
app.get('/api/workers', async (req, res) => {
  try {
    const snapshot = await db.collection('workers').get();
    const workers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(workers);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب البيانات من قاعدة البيانات' });
  }
});

// البحث المتقدم عن العمال
app.get('/api/workers/search', async (req, res) => {
  try {
    const { country, city, profession, q } = req.query;
    let queryRef = db.collection('workers');

    if (country) queryRef = queryRef.where('countryCode', '==', country);
    if (city) queryRef = queryRef.where('city', '==', city);
    if (profession) queryRef = queryRef.where('profession', '==', profession);

    const snapshot = await queryRef.get();
    let workers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // تصفية إضافية للبحث بالنص (الاسم أو الوصف) إن وجد
    if (q) {
      const searchTerm = q.toLowerCase();
      workers = workers.filter(w => 
        (w.name && w.name.toLowerCase().includes(searchTerm)) ||
        (w.description && w.description.toLowerCase().includes(searchTerm))
      );
    }

    res.json(workers);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في عملية البحث' });
  }
});

// تسجيل عامل جديد في Firestore
app.post('/api/workers', async (req, res) => {
  try {
    const workerData = req.body;

    if (!workerData.name || !workerData.phone || !workerData.profession) {
      return res.status(400).json({ error: 'يرجى تعبئة جميع الحقول المطلوبة' });
    }

    const newWorker = {
      ...workerData,
      isVerified: true,
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection('workers').add(newWorker);
    res.status(201).json({ success: true, data: { id: docRef.id, ...newWorker } });
  } catch (error) {
    res.status(500).json({ error: 'فشل حفظ بيانات العامل في قاعدة البيانات' });
  }
});

// ==========================================
// 📊 API الإحصائيات العامة
// ==========================================

app.get('/api/stats', async (req, res) => {
  try {
    const snapshot = await db.collection('workers').get();
    const workers = snapshot.docs.map(doc => doc.data());

    const totalWorkers = workers.length;
    const countriesCount = new Set(workers.map(w => w.countryCode)).size;
    const professionsCount = new Set(workers.map(w => w.profession)).size;

    res.json({
      totalWorkers,
      countriesCount,
      professionsCount
    });
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب الإحصائيات' });
  }
});

// ==========================================
// 🚀 تشغيل الخادم
// ==========================================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ الخادم يعمل ومربوط بـ Firestore على المنفذ: ${PORT}`);
});
