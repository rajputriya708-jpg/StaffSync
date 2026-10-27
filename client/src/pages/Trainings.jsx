import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Trainings = () => {
  const { user } = useAuth();
  const [trainings, setTrainings] = useState([]);
  const [form, setForm] = useState({
    title: '',
    department: 'Engineering',
    instructor: user?.name || 'Department Manager',
    scheduleDate: new Date().toISOString().split('T')[0],
    duration: '2 Weeks (12 Hours)',
    description: '',
  });

  const loadTrainings = async () => {
    const { data } = await API.get('/trainings');
    setTrainings(data);
  };

  useEffect(() => {
    loadTrainings();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await API.post('/trainings', form);
    setForm({ ...form, title: '', description: '' });
    loadTrainings();
  };

  const handleEnroll = async (id) => {
    await API.post(`/trainings/${id}/enroll`);
    loadTrainings();
  };

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">Training & Development Programs</h3>
      <div className="row g-4">
        {(user?.role === 'manager' || user?.role === 'hr') && (
          <div className="col-lg-4">
            <div className="card-hrm p-4">
              <h5 className="fw-bold mb-3">Launch Training Module</h5>
              <form onSubmit={handleCreate}>
                <div className="mb-2">
                  <label className="form-label small text-secondary">Program Title</label>
                  <input
                    type="text"
                    required
                    className="form-control form-control-sm bg-dark text-light border-secondary"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label small text-secondary">Department</label>
                  <input
                    type="text"
                    className="form-control form-control-sm bg-dark text-light border-secondary"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label small text-secondary">Duration</label>
                  <input
                    type="text"
                    className="form-control form-control-sm bg-dark text-light border-secondary"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small text-secondary">Syllabus / Overview</label>
                  <textarea
                    rows="2"
                    required
                    className="form-control form-control-sm bg-dark text-light border-secondary"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-info btn-sm w-100 fw-bold">
                  Publish Training Program
                </button>
              </form>
            </div>
          </div>
        )}

        <div className={user?.role === 'manager' || user?.role === 'hr' ? 'col-lg-8' : 'col-12'}>
          <div className="row g-3">
            {trainings.map((t) => {
              const enrolled = t.enrolledEmployees?.some(
                (e) => (e._id || e) === user?._id
              );
              return (
                <div key={t._id} className="col-md-6">
                  <div className="card-hrm p-4 h-100 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="badge bg-primary">{t.department}</span>
                        <span className="small text-secondary">{t.duration}</span>
                      </div>
                      <h5 className="fw-bold">{t.title}</h5>
                      <p className="small text-secondary">{t.description}</p>
                      <div className="small text-info mb-3">
                        Instructor: {t.instructor} • Enrolled: {t.enrolledEmployees?.length || 0}
                      </div>
                    </div>
                    <button
                      onClick={() => handleEnroll(t._id)}
                      className={`btn btn-sm w-100 fw-semibold ${
                        enrolled ? 'btn-outline-warning' : 'btn-info'
                      }`}
                    >
                      {enrolled ? 'Enrolled ✓ (Click to Withdraw)' : 'Enroll in Program'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trainings;
