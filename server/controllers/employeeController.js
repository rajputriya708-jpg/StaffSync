const User = require('../models/User');
const Leave = require('../models/Leave');
const Attendance = require('../models/Attendance');
const Training = require('../models/Training');
const Announcement = require('../models/Announcement');

const getAllEmployees = async (req, res, next) => {
  try {
    const { department, search } = req.query;
    const filter = {};
    if (department && department !== 'All') filter.department = department;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { designation: { $regex: search, $options: 'i' } },
        { employeeId: { $regex: search, $options: 'i' } },
      ];
    }
    const employees = await User.find(filter).select('-password').sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    next(err);
  }
};

const createEmployee = async (req, res, next) => {
  try {
    const { name, email, password, role, department, designation, phone, salary } = req.body;
    const count = await User.countDocuments();
    const employeeId = `EMP-${1001 + count}`;

    const emp = await User.create({
      employeeId,
      name,
      email,
      password: password || 'emp123',
      role: role || 'employee',
      department: department || 'Engineering',
      designation: designation || 'Software Engineer',
      phone: phone || '+91 9876543210',
      salary: Number(salary) || 75000,
    });

    res.status(201).json(emp);
  } catch (err) {
    next(err);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select('-password');
    if (!updated) {
      res.status(404);
      throw new Error('Employee not found');
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const emp = await User.findByIdAndDelete(req.params.id);
    if (!emp) {
      res.status(404);
      throw new Error('Employee not found');
    }
    res.json({ message: 'Employee record removed' });
  } catch (err) {
    next(err);
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const [totalEmployees, pendingLeaves, todayAttendance, activeTrainings, announcements] =
      await Promise.all([
        User.countDocuments(),
        Leave.countDocuments({ status: 'Pending' }),
        Attendance.countDocuments({ date: today }),
        Training.countDocuments(),
        Announcement.countDocuments(),
      ]);

    res.json({
      totalEmployees,
      pendingLeaves,
      todayAttendance,
      activeTrainings,
      announcements,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getDashboardStats,
};
