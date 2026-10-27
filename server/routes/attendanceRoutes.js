const express = require('express');
const router = express.Router();
const {
  markAttendance,
  getAttendanceLogs,
} = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getAttendanceLogs).post(protect, markAttendance);

module.exports = router;
