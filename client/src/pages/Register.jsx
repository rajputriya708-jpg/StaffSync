import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee',
    department: 'Engineering',
    designation: 'Software Engineer',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form);
    navigate('/');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card-hrm p-4 shadow">
            <h3 className="fw-bold mb-1 text-center">Create StaffSync Account</h3>
            <p className="text-secondary small text-center mb-4">
              Onboard as HR, Manager, or Employee
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="form-label small text-secondary">Full Name</label>
                <input
                  type="text"
                  required
                  className="form-control bg-dark text-light border-secondary"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="mb-2">
                <label className="form-label small text-secondary">Work Email</label>
                <input
                  type="email"
                  required
                  className="form-control bg-dark text-light border-secondary"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="mb-2">
                <label className="form-label small text-secondary">Password</label>
                <input
                  type="password"
                  required
                  minLength="6"
                  className="form-control bg-dark text-light border-secondary"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label small text-secondary">Role</label>
                  <select
                    className="form-select bg-dark text-light border-secondary"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  >
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                    <option value="hr">HR Personnel</option>
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label small text-secondary">Department</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-secondary"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-info w-100 fw-bold py-2">
                Complete Registration
              </button>
            </form>
            <p className="text-center text-secondary small mt-3 mb-0">
              Already registered?{' '}
              <Link to="/login" className="text-info text-decoration-none">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
