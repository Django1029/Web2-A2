const db = require('../config/event_db');

// 获取所有 upcoming 活动
exports.getEvents = (callback) => {
  const sql = `
    SELECT e.*, c.name AS category, o.name AS organisation
    FROM events e
    JOIN categories c ON e.category_id = c.category_id
    JOIN organisations o ON e.org_id = o.org_id
    WHERE e.status = 'upcoming'
    ORDER BY e.event_date ASC;
  `;
  db.query(sql, callback);
};

// 获取单个活动详情
exports.getEventById = (id, callback) => {
  const sql = `
    SELECT e.*, c.name AS category, o.name AS organisation
    FROM events e
    JOIN categories c ON e.category_id = c.category_id
    JOIN organisations o ON e.org_id = o.org_id
    WHERE e.event_id = ?;
  `;
  db.query(sql, [id], callback);
};

// 获取所有类别
exports.getCategories = (callback) => {
  db.query("SELECT * FROM categories;", callback);
};

// 搜索活动
exports.searchEvents = (filters, callback) => {
  let sql = `
    SELECT e.*, c.name AS category, o.name AS organisation
    FROM events e
    JOIN categories c ON e.category_id = c.category_id
    JOIN organisations o ON e.org_id = o.org_id
    WHERE e.status = 'upcoming'
  `;
  let values = [];

  if (filters.date) {
    sql += " AND e.event_date = ?";
    values.push(filters.date);
  }
  if (filters.location) {
    sql += " AND e.location LIKE ?";
    values.push(`%${filters.location}%`);
  }
  if (filters.category) {
    sql += " AND e.category_id = ?";
    values.push(filters.category);
  }

  sql += " ORDER BY e.event_date ASC;";

  db.query(sql, values, callback);
};
