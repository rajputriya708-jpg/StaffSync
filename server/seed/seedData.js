const User = require('../models/User');
const Leave = require('../models/Leave');
const Attendance = require('../models/Attendance');
const Training = require('../models/Training');
const Announcement = require('../models/Announcement');

const seedInitialData = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) return;

    console.log('Seeding initial StaffSync HRM data...');

    const hrUser = await User.create({
      employeeId: 'EMP-1001',
      name: 'Riya Sonaniya (HR Head)',
      email: 'hr@staffsync.com',
      password: 'hr1234',
      role: 'hr',
      department: 'Human Resources',
      designation: 'VP of People Operations',
      phone: '+91 9820100100',
      salary: 125000,
    });

    const managerUser = await User.create({
      employeeId: 'EMP-1002',
      name: 'Arjun Mehta (Eng Manager)',
      email: 'manager@staffsync.com',
      password: 'manager123',
      role: 'manager',
      department: 'Engineering',
      designation: 'Engineering Manager',
      phone: '+91 9820100200',
      salary: 115000,
    });

    const emp1 = await User.create({
      employeeId: 'EMP-1003',
      name: 'Ananya Verma',
      email: 'employee@staffsync.com',
      password: 'emp123',
      role: 'employee',
      department: 'Engineering',
      designation: 'Full-Stack MERN Developer',
      phone: '+91 9820100300',
      salary: 85000,
    });

    const emp2 = await User.create({
      employeeId: 'EMP-1004',
      name: 'Rohan Deshmukh',
      email: 'rohan@staffsync.com',
      password: 'emp123',
      role: 'employee',
      department: 'Product & Design',
      designation: 'Senior UI/UX Designer',
      phone: '+91 9820100400',
      salary: 80000,
    });

    const today = new Date().toISOString().split('T')[0];

    await Leave.insertMany([
      {
        employee: emp1._id,
        leaveType: 'Casual Leave',
        startDate: today,
        endDate: today,
        days: 2,
        reason: 'Attending family function in Pune',
        status: 'Pending',
      },
      {
        employee: emp2._id,
        leaveType: 'Work From Home',
        startDate: today,
        endDate: today,
        days: 1,
        reason: 'Home broadband maintenance scheduled',
        status: 'Approved',
        reviewedBy: 'Arjun Mehta (MANAGER)',
      },
    ]);

    await Attendance.insertMany([
      {
        employee: hrUser._id,
        date: today,
        checkIn: '09:05 AM',
        checkOut: '06:15 PM',
        hoursWorked: 9.1,
        status: 'Present',
      },
      {
        employee: managerUser._id,
        date: today,
        checkIn: '09:15 AM',
        checkOut: '06:30 PM',
        hoursWorked: 9.2,
        status: 'Present',
      },
      {
        employee: emp1._id,
        date: today,
        checkIn: '09:30 AM',
        checkOut: '--:--',
        hoursWorked: 4.5,
        status: 'Present',
      },
    ]);

    await Training.insertMany([
      {
        title: 'Advanced MERN Microservices & Cloud Scaling',
        department: 'Engineering',
        instructor: 'Arjun Mehta',
        scheduleDate: today,
        duration: '3 Weeks (18 Hours)',
        description:
          'Hands-on training covering Docker, Node.js cluster scaling, MongoDB indexing, and JWT security best practices.',
        status: 'Ongoing',
        enrolledEmployees: [emp1._id],
      },
      {
        title: 'Agile Leadership & Sprint Estimation Workshop',
        department: 'Product & Design',
        instructor: 'Riya Sonaniya',
        scheduleDate: today,
        duration: '1 Week (6 Hours)',
        description:
          'Cross-functional workshop for product designers and developers on OKR alignment and velocity tracking.',
        status: 'Upcoming',
        enrolledEmployees: [emp1._id, emp2._id],
      },
    ]);

    await Announcement.insertMany([
      {
        title: 'Q4 Annual Performance Appraisal & Bonus Cycle Open',
        category: 'Policy Update',
        priority: 'High',
        content:
          'All employees are requested to submit their self-assessment forms and training completion certificates by Friday.',
        postedBy: 'Riya Sonaniya (HR)',
      },
      {
        title: 'Hybrid Work Policy & Wellness Friday Initiative',
        category: 'Company News',
        priority: 'Normal',
        content:
          'Starting next month, teams can opt for flexible remote Wednesdays and no-meeting Friday afternoons.',
        postedBy: 'Riya Sonaniya (HR)',
      },
    ]);

    console.log('StaffSync sample HRM data seeded successfully!');
  } catch (err) {
    console.error('Seed error:', err.message);
  }
};

module.exports = seedInitialData;
