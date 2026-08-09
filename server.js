import express from 'express';
import { JSONFilePreset } from 'lowdb/node';

const app = express();
const PORT = process.env.PORT || 3000;

// 1. تحديد البيانات الافتراضية لقاعدة البيانات
const defaultData = { 
  posts: [], 
  users: [] 
};

// 2. تهيئة قاعدة البيانات lowdb مع القيمة الافتراضية
const db = await JSONFilePreset('db.json', defaultData);

// Middlewares
app.use(express.json());

// Routes مثال للتحقق من عمل السيرفر وقاعدة البيانات
app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});

app.get('/api/data', async (req, res) => {
  await db.read();
  res.json(db.data);
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. تحديد البيانات الافتراضية
const defaultData = { 
  posts: [], 
  users: [] 
};

// 2. إعداد Adapter و Low مع تمرير defaultData (حل المشكلة)
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});

app.get('/api/data', async (req, res) => {
  await db.read();
  res.json(db.data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
