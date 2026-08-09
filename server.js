import express from 'express';
import { JSONFilePreset } from 'lowdb/node';

const app = express();
const PORT = process.env.PORT || 3000;

// 1. تهيئة البيانات الافتراضية
const defaultData = { workers: [], users: [] };
const db = await JSONFilePreset('db.json', defaultData);

// مخزن مؤقت لرموز التحقق OTP (في الذاكرة)
const otpStore = {};

app.use(express.json());
app.use(express.static('.'));

// جلب العمال المسجلين
app.get('/api/workers', async (req, res) => {
    try {
        await db.read();
        res.json(db.data.workers || []);
    } catch (error) {
        res.status(500).json({ error: 'فشل في جلب البيانات' });
    }
});

// 1. توليد وإرسال رمز التحقق OTP
app.post('/api/send-otp', async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) {
            return res.status(400).json({ error: 'رقم الهاتف مطلوب' });
        }

        // توليد كود عشوائي من 4 أرقام
        const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
        
        // حفظ الكود مؤقتاً للرقم
        otpStore[phone] = otpCode;

        console.log(`========================================`);
        console.log(`🔑 [SMS OTP] رمز التفعيل للرقم ${phone} هو: ${otpCode}`);
        console.log(`========================================`);

        /* 
           ملاحظة: لربط إرسال الرسائل الفعلية للواتساب أو الـ SMS:
           يمكنك إضافة مفاتيح بوابة مثل Twilio أو UltraMsg هنا لاحقاً.
        */

        res.json({ success: true, message: 'تم إرسال رمز التفعيل بنجاح' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'حدث خطأ أثناء إرسال الرمز' });
    }
});

// 2. التحقق من الرمز وإتمام حفظ العامل
app.post('/api/verify-and-register', async (req, res) => {
    try {
        const { workerData, otpCode } = req.body;

        if (!workerData || !otpCode) {
            return res.status(400).json({ error: 'البيانات غير مكتملة' });
        }

        const savedCode = otpStore[workerData.phone];

        // التأكد من صحة الكود المدخل
        if (!savedCode || savedCode !== otpCode) {
            return res.status(400).json({ error: 'رمز التفعيل غير صحيح، يرجى التأكد وإعادة المحاولة' });
        }

        // مسح الكود بعد الاستخدام
        delete otpStore[workerData.phone];

        // حفظ البيانات في قاعدة البيانات
        await db.read();
        if (!db.data.workers) db.data.workers = [];

        workerData.id = Date.now().toString();
        workerData.verified = true;
        workerData.createdAt = new Date().toISOString();

        db.data.workers.push(workerData);
        await db.write();

        console.log('✅ تم توثيق وتسجيل العامل بنجاح:', workerData.name);
        res.status(201).json({ success: true, message: 'تم توثيق حسابك وتسجيله بنجاح!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'حدث خطأ في السيرفر أثناء الحفظ' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
