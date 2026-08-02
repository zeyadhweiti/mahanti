# 🛠️ مهنتي - دليل المهن الحرفية (مع Backend حقيقي)

تطبيق ويب كامل بـ **Backend حقيقي** لتواصل أصحاب المهن الحرفية مع الباحثين عنهم.

## ✨ المميزات

- ✅ **Backend حقيقي** - Node.js + Express + قاعدة بيانات JSON
- ✅ **تسجيل فعلي** - البيانات تُحفظ في قاعدة البيانات
- ✅ **OTP حقيقي** - رمز تحقق عشوائي (قابل للربط بـ Twilio لاحقاً)
- ✅ **بحث ذكي** - تصفية بالمهنة والمدينة والاسم عبر API
- ✅ **إحصائيات حية** - تتحدث تلقائياً مع كل تسجيل جديد
- ✅ **مجاني 100%** - لا رسوم ولا عمولات
- ✅ **تواصل مباشر** - واتساب واتصال بنقرة واحدة
- ✅ **تصميم مريح** - ألوان خضراء وصفراء سهلة على العين

## 📁 هيكل الملفات

```
mahanti-backend/
├── server.js              # الخادم الرئيسي (Node.js + Express)
├── package.json           # تبعيات المشروع
├── .env.example           # نموذج الإعدادات
├── .gitignore             # ملفات يتم تجاهلها
├── db.json                # قاعدة البيانات (تُنشأ تلقائياً)
├── public/                # ملفات الواجهة الأمامية
│   ├── index.html         # الصفحة الرئيسية
│   ├── search.html        # صفحة البحث
│   ├── register.html      # صفحة التسجيل
│   ├── css/
│   │   └── style.css      # التنسيقات
│   └── js/
│       └── app.js         # الجافاسكريبت (يتصل بالـ API)
└── README.md              # هذا الملف
```

## 🚀 طريقة التشغيل المحلي

### 1️⃣ تثبيت المتطلبات
```bash
# تأكد من تثبيت Node.js (الإصدار 18 أو أحدث)
node -v

# انتقل لمجلد المشروع
cd mahanti-backend

# ثبت التبعيات
npm install
```

### 2️⃣ تشغيل التطبيق
```bash
# نسخ ملف الإعدادات
cp .env.example .env

# تشغيل الخادم
npm start
```

### 3️⃣ فتح التطبيق
```
🌐 افتح المتصفح على: http://localhost:3000
```

سترى في الطرفية:
```
✅ Database initialized
╔══════════════════════════════════════════╗
║         🛠️  مهنتي - Backend جاهز!        ║
╠══════════════════════════════════════════╣
║  🌐 الرابط: http://localhost:3000        ║
╚══════════════════════════════════════════╝
```

## 🌐 API Endpoints

| الطريقة | المسار | الوصف |
|---------|--------|-------|
| GET | `/api/workers` | جلب جميع العمال |
| GET | `/api/workers/search?q=...&job=...&city=...` | البحث عن عمال |
| POST | `/api/workers` | تسجيل عامل جديد |
| POST | `/api/verify/send` | إرسال رمز OTP |
| POST | `/api/verify/check` | التحقق من رمز OTP |
| GET | `/api/stats` | جلب الإحصائيات |

### مثال على الـ API:
```bash
# جلب جميع العمال
curl http://localhost:3000/api/workers

# البحث
curl "http://localhost:3000/api/workers/search?q=بناء&city=الرياض"

# تسجيل عامل جديد
curl -X POST http://localhost:3000/api/workers   -H "Content-Type: application/json"   -d '{"name":"علي","phone":"0555111111","job":"بناء","city":"الرياض","area":"حي النسيم"}'
```

## 🚀 الرفع على استضافة مجانية (Render.com)

### 1️⃣ أنشئ حساب على [render.com](https://render.com)

### 2️⃣ أنشئ Web Service جديد
1. اضغط **"New"** → **"Web Service"**
2. اربط بحساب GitHub وارفع المشروع
3. أو اختر **"Deploy from Git repo"**

### 3️⃣ الإعدادات
```
Name: mahanti-app
Runtime: Node
Build Command: npm install
Start Command: npm start
```

### 4️⃣ متغيرات البيئة (Environment Variables)
```
NODE_ENV=production
PORT=10000
```

### 5️⃣ اضغط "Create Web Service"

ستحصل على رابط مثل:
```
https://mahanti-app.onrender.com
```

## 🚀 الرفع على Railway

### 1️⃣ أنشئ حساب على [railway.app](https://railway.app)

### 2️⃣ اضغط "New Project" → "Deploy from GitHub repo"

### 3️⃣ اختر المستودع واضغط "Deploy"

Railway يتعرف تلقائياً على Node.js ويقوم بالبناء!

## 🔧 التطوير المستقبلي

- [ ] ربط Twilio لإرسال OTP حقيقي عبر SMS
- [ ] ربط MongoDB Atlas بدلاً من JSON file
- [ ] نظام تقييم العمال (نجوم)
- [ ] رفع صور للعمال وأعمالهم
- [ ] نظام الإشعارات
- [ ] تطبيق Android/iOS native
- [ ] خريطة تفاعلية (Google Maps)
- [ ] لوحة تحكم للأدمن

## 🔐 OTP - كيفية الربط بـ Twilio (للإنتاج)

1. سجل في [twilio.com](https://twilio.com)
2. احصل على Account SID و Auth Token
3. ثبت Twilio SDK:
   ```bash
   npm install twilio
   ```
4. عدل `server.js` لإرسال SMS حقيقي بدلاً من console.log

## 🎨 الألوان المستخدمة

| اللون | الكود | الاستخدام |
|-------|-------|----------|
| أخضر داكن | `#1B5E20` | خلفية الهيدر |
| أخضر رئيسي | `#2E7D32` | أزرار رئيسية |
| أخضر فاتح | `#66BB6A` | تفاصيل وتأثيرات |
| أصفر | `#FBC02D` | أزرار ثانوية ووسوم |
| كريمي | `#F1F8E9` | خلفية التطبيق |

## 📞 للتواصل

التطبيق مجاني للجميع - شاركه مع من تحب! 💚

---
© 2026 مهنتي - جميع الحقوق محفوظة
