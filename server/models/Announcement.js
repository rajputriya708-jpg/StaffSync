const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Policy Update', 'Company News', 'Event', 'Holiday Notice'],
      default: 'Company News',
    },
    priority: {
      type: String,
      enum: ['High', 'Normal'],
      default: 'Normal',
    },
    content: {
      type: String,
      required: true,
    },
    postedBy: {
      type: String,
      default: 'HR Department',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Announcement', announcementSchema);
