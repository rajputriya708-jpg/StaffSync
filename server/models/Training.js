const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      default: 'Engineering',
    },
    instructor: {
      type: String,
      required: true,
    },
    scheduleDate: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      default: '2 Weeks (12 Hours)',
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Upcoming', 'Ongoing', 'Completed'],
      default: 'Upcoming',
    },
    enrolledEmployees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Training', trainingSchema);
