const Attendance = require('../models/Attendance');

const markAttendance = async (req, res, next) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const nowTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    let record = await Attendance.findOne({
      employee: req.user._id,
      date: today,
    });

    if (!record) {
      record = await Attendance.create({
        employee: req.user._id,
        date: today,
        checkIn: nowTime,
        checkOut: '--:--',
        hoursWorked: 0,
        status: req.body.status || 'Present',
      });
    } else {
      record.checkOut = nowTime;
      record.hoursWorked = 8.5;
      await record.save();
    }

    const populated = await Attendance.findById(record._id).populate(
      'employee',
      'name employeeId department designation'
    );
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
};

const getAttendanceLogs = async (req, res, next) => {
  try {
    const filter =
      req.user.role === 'employee' ? { employee: req.user._id } : {};
    const logs = await Attendance.find(filter)
      .populate('employee', 'name employeeId department designation')
      .sort({ date: -1, createdAt: -1 });
    res.json(logs);
  } catch (err) {
    next(err);
  }
};

module.exports = { markAttendance, getAttendanceLogs };
