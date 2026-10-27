import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaUsersCog,
  FaCalendarCheck,
  FaUserClock,
  FaChalkboardTeacher,
  FaBullhorn,
  FaUserCircle,
  FaSignOutAlt,
} from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-hrm sticky-top py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" to="/">
          <FaUsersCog className="text-info fs-3" />
          <span>
            Staff<span className="text-info">Sync</span>
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#staffsyncNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="staffsyncNav">
          {user && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 gap-lg-2">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link d-flex align-items-center gap-1" to="/employees">
                  <FaUsersCog className="text-info" /> Employees
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link d-flex align-items-center gap-1" to="/leaves">
                  <FaCalendarCheck className="text-warning" /> Leaves
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link d-flex align-items-center gap-1" to="/attendance">
                  <FaUserClock className="text-success" /> Attendance
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link d-flex align-items-center gap-1" to="/trainings">
                  <FaChalkboardTeacher className="text-primary" /> Trainings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link d-flex align-items-center gap-1" to="/announcements">
                  <FaBullhorn className="text-danger" /> Announcements
                </NavLink>
              </li>
            </ul>
          )}

          <div className="d-flex align-items-center gap-3 ms-auto">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="text-light text-decoration-none d-flex align-items-center gap-2"
                >
                  <FaUserCircle className="fs-4 text-info" />
                  <span className="fw-medium">{user.name}</span>
                  <span className="badge bg-info text-dark text-uppercase">{user.role}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light btn-sm px-3">
                  Sign In
                </Link>
                <Link to="/register" className="btn btn-info btn-sm px-3 fw-semibold">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
