const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
    checkIn: {
      type: String,
      required: true,
    },
    checkOut: {
      type: String,
      default: '--:--',
    },
    hoursWorked: {
      type: Number,
      default: 8.0,
    },
    status: {
      type: String,
      enum: ['Present', 'Late', 'Remote', 'Half Day'],
      default: 'Present',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Attendance', attendanceSchema);
