const express = require('express');
const router = express.Router();
const {
  applyLeave,
  getLeaves,
  updateLeaveStatus,
} = require('../controllers/leaveController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.route('/').get(protect, getLeaves).post(protect, applyLeave);
router.put(
  '/:id/status',
  protect,
  authorizeRoles('hr', 'manager'),
  updateLeaveStatus
);

module.exports = router;
