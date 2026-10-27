const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'staffsync_super_secret_jwt_key_2026',
    { expiresIn: '7d' }
  );
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, department, designation, phone, salary } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      res.status(400);
      throw new Error('Employee with this email already exists');
    }

    const count = await User.countDocuments();
    const employeeId = `EMP-${1001 + count}`;

    const user = await User.create({
      employeeId,
      name,
      email,
      password,
      role: role || 'employee',
      department: department || 'Engineering',
      designation: designation || 'Software Engineer',
      phone: phone || '+91 9876543210',
      salary: Number(salary) || 75000,
    });

    res.status(201).json({
      _id: user._id,
      employeeId: user.employeeId,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      designation: user.designation,
      phone: user.phone,
      salary: user.salary,
      token: generateToken(user._id, user.role),
    });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        employeeId: user.employeeId,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        designation: user.designation,
        phone: user.phone,
        salary: user.salary,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.department = req.body.department || user.department;
    user.designation = req.body.designation || user.designation;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updated = await user.save();
    res.json({
      _id: updated._id,
      employeeId: updated.employeeId,
      name: updated.name,
      email: updated.email,
      role: updated.role,
      department: updated.department,
      designation: updated.designation,
      phone: updated.phone,
      salary: updated.salary,
      token: generateToken(updated._id, updated.role),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { registerUser, loginUser, getProfile, updateProfile };
