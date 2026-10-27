import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [designation, setDesignation] = useState(user?.designation || '');
  const [msg, setMsg] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    const { data } = await API.put('/auth/profile', { name, phone, designation });
    localStorage.setItem('staffsync_user', JSON.stringify(data));
    setUser(data);
    setMsg('Personal record updated successfully!');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card-hrm p-4">
            <h4 className="fw-bold mb-3">My Employee Record</h4>
            {msg && <div className="alert alert-success py-2 small">{msg}</div>}
            <form onSubmit={handleSave}>
              <div className="mb-3">
                <label className="form-label small text-secondary">Employee ID & Role</label>
                <input
                  type="text"
                  disabled
                  className="form-control bg-dark text-secondary border-secondary"
                  value={`${user?.employeeId} (${user?.role?.toUpperCase()})`}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small text-secondary">Full Name</label>
                <input
                  type="text"
                  className="form-control bg-dark text-light border-secondary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small text-secondary">Designation</label>
                <input
                  type="text"
                  className="form-control bg-dark text-light border-secondary"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small text-secondary">Phone</label>
                <input
                  type="text"
                  className="form-control bg-dark text-light border-secondary"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-info w-100 fw-bold">
                Save Personal Record
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
