const express = require('express');
const cors = require('cors');
const path = require('path');

const eventsRoutes = require('./routes/events');
const db = require('./config/event_db');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ 提供前端静态文件（让 http://localhost:3000 打开 index.html）
app.use(express.static(path.join(__dirname, '../frontend')));

// ✅ 注册 API 路由
app.use('/api', eventsRoutes);

// ✅ 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ✅ 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  const now = new Date();
  console.log("🎉 Charity Events Server started successfully!");
  console.log(`📍 Local access: http://localhost:${PORT}`);
  console.log(`🌐 Frontend served from: ${path.join(__dirname, '../frontend')}`);
  console.log(`📊 API base URL: http://localhost:${PORT}/api/events`);
  console.log(`⏰ ${now.toLocaleString()}`);
  console.log("✅ Successfully connected to MySQL database: charityevents_db");
});
