import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  const fillDemo = (role) => {
    if (role === 'hr') {
      setEmail('hr@staffsync.com');
      setPassword('hr1234');
    } else if (role === 'manager') {
      setEmail('manager@staffsync.com');
      setPassword('manager123');
    } else {
      setEmail('employee@staffsync.com');
      setPassword('emp123');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card-hrm p-4 shadow">
            <h3 className="fw-bold mb-1 text-center">StaffSync Sign In</h3>
            <p className="text-secondary small text-center mb-4">
              Role-Based HRM Portal (HR • Manager • Employee)
            </p>
            {error && <div className="alert alert-danger py-2 small">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small text-secondary">Work Email</label>
                <input
                  type="email"
                  required
                  className="form-control bg-dark text-light border-secondary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="form-label small text-secondary">Password</label>
                <input
                  type="password"
                  required
                  className="form-control bg-dark text-light border-secondary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-info w-100 fw-bold py-2">
                Sign In to Workspace
              </button>
            </form>

            <div className="mt-3 d-flex gap-2">
              <button
                type="button"
                onClick={() => fillDemo('hr')}
                className="btn btn-outline-info btn-sm flex-fill"
              >
                Demo HR
              </button>
              <button
                type="button"
                onClick={() => fillDemo('manager')}
                className="btn btn-outline-warning btn-sm flex-fill"
              >
                Demo Manager
              </button>
              <button
                type="button"
                onClick={() => fillDemo('employee')}
                className="btn btn-outline-light btn-sm flex-fill"
              >
                Demo Employee
              </button>
            </div>

            <p className="text-center text-secondary small mt-4 mb-0">
              Need an account?{' '}
              <Link to="/register" className="text-info text-decoration-none fw-semibold">
                Register Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
