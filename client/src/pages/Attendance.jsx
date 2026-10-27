import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const Attendance = () => {
  const [logs, setLogs] = useState([]);
  const [mode, setMode] = useState('Present');

  const loadLogs = async () => {
    const { data } = await API.get('/attendance');
    setLogs(data);
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const handleMark = async () => {
    await API.post('/attendance', { status: mode });
    loadLogs();
  };

  return (
    <div className="container py-4">
      <div className="card-hrm p-4 mb-4 d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div>
          <h4 className="fw-bold mb-1">Daily Attendance Tracker</h4>
          <p className="text-secondary small mb-0">
            Mark your daily check-in or check-out with timestamp verification
          </p>
        </div>
        <div className="d-flex gap-2">
          <select
            className="form-select bg-dark text-light border-secondary w-auto"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="Present">Office — Present</option>
            <option value="Remote">Remote — WFH</option>
          </select>
          <button onClick={handleMark} className="btn btn-success fw-bold px-4">
            Check-In / Check-Out Now
          </button>
        </div>
      </div>

      <div className="card-hrm p-4">
        <h5 className="fw-bold mb-3">Attendance Logs</h5>
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle small mb-0">
            <thead>
              <tr>
                <th>Date</th>
                <th>Employee</th>
                <th>Department</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((r) => (
                <tr key={r._id}>
                  <td>{r.date}</td>
                  <td className="fw-semibold">{r.employee?.name}</td>
                  <td>{r.employee?.department}</td>
                  <td className="text-info">{r.checkIn}</td>
                  <td>{r.checkOut}</td>
                  <td>{r.hoursWorked} hrs</td>
                  <td>
                    <span className="badge bg-success">{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
