const Leave = require('../models/Leave');

const applyLeave = async (req, res, next) => {
  try {
    const { leaveType, startDate, endDate, days, reason } = req.body;
    const leave = await Leave.create({
      employee: req.user._id,
      leaveType,
      startDate,
      endDate,
      days: Number(days) || 1,
      reason,
      status: 'Pending',
    });
    const populated = await Leave.findById(leave._id).populate(
      'employee',
      'name employeeId department designation'
    );
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
};

const getLeaves = async (req, res, next) => {
  try {
    const filter =
      req.user.role === 'employee' ? { employee: req.user._id } : {};
    const leaves = await Leave.find(filter)
      .populate('employee', 'name employeeId department designation role')
      .sort({ createdAt: -1 });
    res.json(leaves);
  } catch (err) {
    next(err);
  }
};

const updateLeaveStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      res.status(404);
      throw new Error('Leave request not found');
    }
    leave.status = status;
    leave.reviewedBy = `${req.user.name} (${req.user.role.toUpperCase()})`;
    await leave.save();

    const populated = await Leave.findById(leave._id).populate(
      'employee',
      'name employeeId department designation'
    );
    res.json(populated);
  } catch (err) {
    next(err);
  }
};

module.exports = { applyLeave, getLeaves, updateLeaveStatus };
