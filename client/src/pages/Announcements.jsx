import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Announcements = () => {
  const { user } = useAuth();
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    title: '',
    category: 'Company News',
    priority: 'Normal',
    content: '',
  });

  const loadAnnouncements = async () => {
    const { data } = await API.get('/announcements');
    setList(data);
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    await API.post('/announcements', form);
    setForm({ ...form, title: '', content: '' });
    loadAnnouncements();
  };

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">Company Announcements & HR Notices</h3>
      <div className="row g-4">
        {(user?.role === 'hr' || user?.role === 'manager') && (
          <div className="col-lg-4">
            <div className="card-hrm p-4">
              <h5 className="fw-bold mb-3">Post New Announcement</h5>
              <form onSubmit={handlePost}>
                <div className="mb-2">
                  <label className="form-label small text-secondary">Headline</label>
                  <input
                    type="text"
                    required
                    className="form-control form-control-sm bg-dark text-light border-secondary"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </div>
                <div className="row g-2 mb-2">
                  <div className="col-6">
                    <label className="form-label small text-secondary">Category</label>
                    <select
                      className="form-select form-select-sm bg-dark text-light border-secondary"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                      <option value="Company News">Company News</option>
                      <option value="Policy Update">Policy Update</option>
                      <option value="Event">Event</option>
                      <option value="Holiday Notice">Holiday Notice</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label small text-secondary">Priority</label>
                    <select
                      className="form-select form-select-sm bg-dark text-light border-secondary"
                      value={form.priority}
                      onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    >
                      <option value="Normal">Normal</option>
                      <option value="High">High Priority</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label small text-secondary">Details</label>
                  <textarea
                    rows="3"
                    required
                    className="form-control form-control-sm bg-dark text-light border-secondary"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-info btn-sm w-100 fw-bold">
                  Broadcast Announcement
                </button>
              </form>
            </div>
          </div>
        )}

        <div className={user?.role === 'hr' || user?.role === 'manager' ? 'col-lg-8' : 'col-12'}>
          <div className="d-flex flex-column gap-3">
            {list.map((a) => (
              <div key={a._id} className="card-hrm p-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex gap-2">
                    <span className="badge bg-info text-dark">{a.category}</span>
                    {a.priority === 'High' && (
                      <span className="badge bg-danger">High Priority</span>
                    )}
                  </div>
                  <span className="small text-secondary">Posted by {a.postedBy}</span>
                </div>
                <h5 className="fw-bold mb-1">{a.title}</h5>
                <p className="text-secondary mb-0">{a.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
