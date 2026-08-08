const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());

// 1. خدمة جميع الملفات الثابتة من المجلد الرئيسي و public
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'public')));

// 2. إعداد وقراءة قاعدة البيانات المحلية db.json بأمان بدون أخطاء lowdb
const dataDir = path.join(__dirname, 'data');
const dbPath = path.join(dataDir, 'db.json');

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ workers: [] }, null, 2));
}

function getWorkers() {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data).workers || [];
    } catch (err) {
        return [];
    }
}

function saveWorkers(workers) {
    fs.writeFileSync(dbPath, JSON.stringify({ workers }, null, 2));
}

// 3. مسارات الـ API
app.get('/api/workers', (req, res) => {
    res.json(getWorkers());
});

app.post('/api/workers', (req, res) => {
    const workers = getWorkers();
    const newWorker = { id: Date.now(), ...req.body };
    workers.push(newWorker);
    saveWorkers(workers);
    res.status(201).json(newWorker);
});

// توجيه أي طلب للصفحة الرئيسية
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 4. تشغيل السيرفر على المنفذ المطلوب من Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
