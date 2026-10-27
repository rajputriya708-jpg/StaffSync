import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [announcements, setAnnouncements] = useState([]);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    API.get('/employees/stats').then((r) => setStats(r.data)).catch(() => {});
    API.get('/announcements').then((r) => setAnnouncements(r.data.slice(0, 3))).catch(() => {});
    API.get('/leaves').then((r) => setLeaves(r.data.slice(0, 4))).catch(() => {});
  }, []);

  return (
    <div className="container py-4">
      <div className="hero-hrm mb-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <span className="badge bg-info text-dark mb-2 text-uppercase fw-bold">
            {user?.role} Portal • {user?.department}
          </span>
          <h2 className="fw-bold mb-1">Welcome back, {user?.name}</h2>
          <p className="text-secondary mb-0">
            Employee ID: {user?.employeeId} • Designation: {user?.designation}
          </p>
        </div>
        <div className="d-flex gap-2">
          <Link to="/attendance" className="btn btn-success fw-semibold">
            Mark Attendance
          </Link>
          <Link to="/leaves" className="btn btn-outline-info fw-semibold">
            Apply / Manage Leaves
          </Link>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card-hrm p-3 text-center">
            <div className="text-secondary small">Total Workforce</div>
            <div className="fs-2 fw-bold text-info">{stats.totalEmployees || 4}</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card-hrm p-3 text-center">
            <div className="text-secondary small">Pending Leaves</div>
            <div className="fs-2 fw-bold text-warning">{stats.pendingLeaves || 1}</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card-hrm p-3 text-center">
            <div className="text-secondary small">Present Today</div>
            <div className="fs-2 fw-bold text-success">{stats.todayAttendance || 3}</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card-hrm p-3 text-center">
            <div className="text-secondary small">Training Modules</div>
            <div className="fs-2 fw-bold text-primary">{stats.activeTrainings || 2}</div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card-hrm p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Recent Leave Requests</h5>
              <Link to="/leaves" className="small text-info text-decoration-none">
                View All →
              </Link>
            </div>
            {leaves.map((l) => (
              <div
                key={l._id}
                className="p-3 rounded bg-dark border border-secondary border-opacity-25 mb-2 d-flex justify-content-between align-items-center"
              >
                <div>
                  <div className="fw-semibold">{l.employee?.name}</div>
                  <div className="small text-secondary">
                    {l.leaveType} ({l.days} days) — {l.reason}
                  </div>
                </div>
                <span
                  className={`badge ${
                    l.status === 'Approved'
                      ? 'bg-success'
                      : l.status === 'Rejected'
                      ? 'bg-danger'
                      : 'bg-warning text-dark'
                  }`}
                >
                  {l.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card-hrm p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Latest Company Announcements</h5>
              <Link to="/announcements" className="small text-info text-decoration-none">
                View Board →
              </Link>
            </div>
            {announcements.map((a) => (
              <div
                key={a._id}
                className="p-3 rounded bg-dark border border-secondary border-opacity-25 mb-2"
              >
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="badge bg-info text-dark">{a.category}</span>
                  <span className="small text-secondary">{a.postedBy}</span>
                </div>
                <div className="fw-bold">{a.title}</div>
                <p className="small text-secondary mb-0 mt-1">{a.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
