// event_db.js
const mysql = require('mysql2');

// 创建数据库连接
const db = mysql.createConnection({
  host: 'localhost',   
  user: 'root',        
  password: '2874@Qq.com', 
  database: 'charityevents_db'
});

// 测试连接
db.connect((err) => {
  if (err) {
    console.error('❌ 数据库连接失败: ', err);
    return;
  }
  console.log('✅ 已成功连接到 MySQL 数据库 charityevents_db');
});

module.exports = db;
