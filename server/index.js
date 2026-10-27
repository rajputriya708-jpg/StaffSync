const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const seedInitialData = require('./seed/seedData');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const trainingRoutes = require('./routes/trainingRoutes');
const announcementRoutes = require('./routes/announcementRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    application: 'StaffSync - Modern HRM Solution API',
    status: 'Running',
    version: '1.0.0',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/trainings', trainingRoutes);
app.use('/api/announcements', announcementRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

connectDB().then(async () => {
  await seedInitialData();
  app.listen(PORT, () => {
    console.log(`StaffSync Backend Server running on http://localhost:${PORT}`);
  });
});
