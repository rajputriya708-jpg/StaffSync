const express = require('express');
const router = express.Router();
const {
  getAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
} = require('../controllers/announcementController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(protect, getAnnouncements)
  .post(protect, authorizeRoles('hr', 'manager'), createAnnouncement);
router.delete(
  '/:id',
  protect,
  authorizeRoles('hr', 'manager'),
  deleteAnnouncement
);

module.exports = router;
