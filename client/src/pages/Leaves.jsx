import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Leaves = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({
    leaveType: 'Casual Leave',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    days: 2,
    reason: '',
  });

  const loadLeaves = async () => {
    const { data } = await API.get('/leaves');
    setLeaves(data);
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const handleApply = async (e) => {
    e.preventDefault();
    await API.post('/leaves', form);
    setForm({ ...form, reason: '' });
    loadLeaves();
  };

  const handleDecision = async (id, status) => {
    await API.put(`/leaves/${id}/status`, { status });
    loadLeaves();
  };

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">Leave Management & Approvals</h3>
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card-hrm p-4">
            <h5 className="fw-bold mb-3">Apply for Leave</h5>
            <form onSubmit={handleApply}>
              <div className="mb-2">
                <label className="form-label small text-secondary">Leave Type</label>
                <select
                  className="form-select form-select-sm bg-dark text-light border-secondary"
                  value={form.leaveType}
                  onChange={(e) => setForm({ ...form, leaveType: e.target.value })}
                >
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Paid Leave">Paid Leave</option>
                  <option value="Work From Home">Work From Home</option>
                </select>
              </div>
              <div className="row g-2 mb-2">
                <div className="col-6">
                  <label className="form-label small text-secondary">Start Date</label>
                  <input
                    type="date"
                    className="form-control form-control-sm bg-dark text-light border-secondary"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label small text-secondary">Total Days</label>
                  <input
                    type="number"
                    min="1"
                    className="form-control form-control-sm bg-dark text-light border-secondary"
                    value={form.days}
                    onChange={(e) => setForm({ ...form, days: e.target.value })}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label small text-secondary">Reason</label>
                <textarea
                  rows="2"
                  required
                  className="form-control form-control-sm bg-dark text-light border-secondary"
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-info btn-sm w-100 fw-bold">
                Submit Leave Application
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card-hrm p-4">
            <h5 className="fw-bold mb-3">Leave Requests History</h5>
            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle small mb-0">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Type & Dates</th>
                    <th>Reason</th>
                    <th>Status</th>
                    {(user?.role === 'hr' || user?.role === 'manager') && <th>Decision</th>}
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((l) => (
                    <tr key={l._id}>
                      <td>
                        <div className="fw-semibold">{l.employee?.name}</div>
                        <div className="text-secondary">{l.employee?.department}</div>
                      </td>
                      <td>
                        <div>{l.leaveType}</div>
                        <div className="text-secondary">
                          {l.startDate} ({l.days}d)
                        </div>
                      </td>
                      <td>{l.reason}</td>
                      <td>
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
                      </td>
                      {(user?.role === 'hr' || user?.role === 'manager') && (
                        <td>
                          {l.status === 'Pending' ? (
                            <div className="d-flex gap-1">
                              <button
                                onClick={() => handleDecision(l._id, 'Approved')}
                                className="btn btn-success btn-sm py-0 px-2"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleDecision(l._id, 'Rejected')}
                                className="btn btn-danger btn-sm py-0 px-2"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-secondary">{l.reviewedBy}</span>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaves;
