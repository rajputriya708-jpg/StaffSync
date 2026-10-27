const express = require('express');
const router = express.Router();
const {
  getTrainings,
  createTraining,
  toggleEnrollTraining,
} = require('../controllers/trainingController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(protect, getTrainings)
  .post(protect, authorizeRoles('hr', 'manager'), createTraining);
router.post('/:id/enroll', protect, toggleEnrollTraining);

module.exports = router;
