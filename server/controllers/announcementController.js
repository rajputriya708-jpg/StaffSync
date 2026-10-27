const Announcement = require('../models/Announcement');

const getAnnouncements = async (req, res, next) => {
  try {
    const list = await Announcement.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    next(err);
  }
};

const createAnnouncement = async (req, res, next) => {
  try {
    const { title, category, priority, content } = req.body;
    const item = await Announcement.create({
      title,
      category: category || 'Company News',
      priority: priority || 'Normal',
      content,
      postedBy: `${req.user.name} (${req.user.role.toUpperCase()})`,
    });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

const deleteAnnouncement = async (req, res, next) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Announcement removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAnnouncements, createAnnouncement, deleteAnnouncement };
