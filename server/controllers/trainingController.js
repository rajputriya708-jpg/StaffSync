const Training = require('../models/Training');

const getTrainings = async (req, res, next) => {
  try {
    const trainings = await Training.find()
      .populate('enrolledEmployees', 'name employeeId department')
      .sort({ createdAt: -1 });
    res.json(trainings);
  } catch (err) {
    next(err);
  }
};

const createTraining = async (req, res, next) => {
  try {
    const { title, department, instructor, scheduleDate, duration, description, status } =
      req.body;
    const training = await Training.create({
      title,
      department: department || 'Engineering',
      instructor,
      scheduleDate,
      duration: duration || '2 Weeks (12 Hours)',
      description,
      status: status || 'Upcoming',
      enrolledEmployees: [],
    });
    res.status(201).json(training);
  } catch (err) {
    next(err);
  }
};

const toggleEnrollTraining = async (req, res, next) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) {
      res.status(404);
      throw new Error('Training program not found');
    }
    const alreadyEnrolled = training.enrolledEmployees.some(
      (id) => id.toString() === req.user._id.toString()
    );
    if (alreadyEnrolled) {
      training.enrolledEmployees = training.enrolledEmployees.filter(
        (id) => id.toString() !== req.user._id.toString()
      );
    } else {
      training.enrolledEmployees.push(req.user._id);
    }
    await training.save();
    const populated = await Training.findById(training._id).populate(
      'enrolledEmployees',
      'name employeeId department'
    );
    res.json(populated);
  } catch (err) {
    next(err);
  }
};

module.exports = { getTrainings, createTraining, toggleEnrollTraining };
