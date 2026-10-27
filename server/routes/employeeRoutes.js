const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getDashboardStats,
} = require('../controllers/employeeController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/stats', protect, getDashboardStats);
router
  .route('/')
  .get(protect, getAllEmployees)
  .post(protect, authorizeRoles('hr'), createEmployee);
router
  .route('/:id')
  .put(protect, authorizeRoles('hr'), updateEmployee)
  .delete(protect, authorizeRoles('hr'), deleteEmployee);

module.exports = router;
