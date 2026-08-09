import express from 'express';
import { JSONFilePreset } from 'lowdb/node';

const app = express();
const PORT = process.env.PORT || 3000;

// 1. تحديد البيانات الافتراضية
const defaultData = { workers: [], users: [] };

// 2. تهيئة قاعدة البيانات lowdb
const db = await JSONFilePreset('db.json', defaultData);

// Middlewares
app.use(express.json());
app.use(express.static('.')); // خدمة الملفات الثابتة (HTML, CSS, JS)

// 3. API لجلب كافة العمال المسجلين
app.get('/api/workers', async (req, res) => {
  try {
    await db.read();
    res.json(db.data.workers || []);
  } catch (error) {
    res.status(500).json({ error: 'فشل في جلب البيانات' });
  }
});

// 4. API لاستقبال وحفظ عامل جديد (Backend Processing)
app.post('/api/register', async (req, res) => {
  try {
    const newWorker = req.body;
    
    // التحقق من البيانات الأساسية
    if (!newWorker.name || !newWorker.phone || !newWorker.job || !newWorker.country || !newWorker.city) {
      return res.status(400).json({ error: 'جميع الحقول المطلوبة يجب إكمالها' });
    }

    // إضافة معرف فريد وتاريخ التسجيل
    newWorker.id = Date.now().toString();
    newWorker.createdAt = new Date().toISOString();

    // قراءة وتحديث قاعدة البيانات
    await db.read();
    if (!db.data.workers) db.data.workers = [];
    db.data.workers.push(newWorker);
    await db.write();

    console.log('تم تسجيل عامل جديد بنجاح:', newWorker.name);
    res.status(201).json({ success: true, message: 'تم حفظ البيانات بنجاح' });
  } catch (error) {
    console.error('خطأ في الحفظ:', error);
    res.status(500).json({ error: 'حدث خطأ في السيرفر أثناء الحفظ' });
  }
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
