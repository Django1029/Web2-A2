const express = require('express');
const router = express.Router();
const eventModel = require('../models/eventModel');

// ✅ 获取所有活动
router.get('/events', (req, res) => {
  eventModel.getEvents((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// ✅ 获取活动详情
router.get('/events/:id', (req, res) => {
  eventModel.getEventById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Event not found" });
    res.json(results[0]);
  });
});

// ✅ 获取类别
router.get('/categories', (req, res) => {
  eventModel.getCategories((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// ✅ 搜索活动
router.get('/search', (req, res) => {
  const { date, location, category } = req.query;
  eventModel.searchEvents({ date, location, category }, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;
