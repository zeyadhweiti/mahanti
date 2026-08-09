import express from 'express';
import { JSONFilePreset } from 'lowdb/node';

const app = express();
const PORT = process.env.PORT || 3000;

// 1. تحديد البيانات الافتراضية
const defaultData = { posts: [], users: [] };

// 2. تهيئة قاعدة البيانات بالشكل الصحيح والآمن
const db = await JSONFilePreset('db.json', defaultData);

app.use(express.json());
app.use(express.static('.')); // لتشغيل ملفات الـ HTML والـ CSS تلقائياً

app.get('/api/data', async (req, res) => {
  await db.read();
  res.json(db.data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
