import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Employees = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'employee',
    department: 'Engineering',
    designation: 'Software Engineer',
    salary: 75000,
  });

  const loadEmployees = async () => {
    const { data } = await API.get('/employees', { params: { search } });
    setEmployees(data);
  };

  useEffect(() => {
    loadEmployees();
  }, [search]);

  const handleAdd = async (e) => {
    e.preventDefault();
    await API.post('/employees', form);
    setForm({ ...form, name: '', email: '' });
    loadEmployees();
  };

  const handleDelete = async (id) => {
    await API.delete(`/employees/${id}`);
    loadEmployees();
  };

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
        <h3 className="fw-bold mb-0">Employee Directory</h3>
        <input
          type="text"
          className="form-control bg-dark text-light border-secondary w-auto"
          placeholder="Search name, ID, designation..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row g-4">
        {user?.role === 'hr' && (
          <div className="col-lg-4">
            <div className="card-hrm p-4">
              <h5 className="fw-bold mb-3">Onboard New Employee (HR)</h5>
              <form onSubmit={handleAdd}>
                <div className="mb-2">
                  <label className="form-label small text-secondary">Full Name</label>
                  <input
                    type="text"
                    required
                    className="form-control form-control-sm bg-dark text-light border-secondary"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label small text-secondary">Work Email</label>
                  <input
                    type="email"
                    required
                    className="form-control form-control-sm bg-dark text-light border-secondary"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="row g-2 mb-2">
                  <div className="col-6">
                    <label className="form-label small text-secondary">Role</label>
                    <select
                      className="form-select form-select-sm bg-dark text-light border-secondary"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                    >
                      <option value="employee">Employee</option>
                      <option value="manager">Manager</option>
                      <option value="hr">HR Admin</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label small text-secondary">Department</label>
                    <input
                      type="text"
                      className="form-control form-control-sm bg-dark text-light border-secondary"
                      value={form.department}
                      onChange={(e) => setForm({ ...form, department: e.target.value })}
                    />
                  </div>
                </div>
                <div className="row g-2 mb-3">
                  <div className="col-7">
                    <label className="form-label small text-secondary">Designation</label>
                    <input
                      type="text"
                      className="form-control form-control-sm bg-dark text-light border-secondary"
                      value={form.designation}
                      onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    />
                  </div>
                  <div className="col-5">
                    <label className="form-label small text-secondary">Salary (₹)</label>
                    <input
                      type="number"
                      className="form-control form-control-sm bg-dark text-light border-secondary"
                      value={form.salary}
                      onChange={(e) => setForm({ ...form, salary: e.target.value })}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-info btn-sm w-100 fw-bold">
                  + Add Employee Record
                </button>
              </form>
            </div>
          </div>
        )}

        <div className={user?.role === 'hr' ? 'col-lg-8' : 'col-12'}>
          <div className="card-hrm p-4">
            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle small mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Role</th>
                    {user?.role === 'hr' && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp._id}>
                      <td className="font-monospace text-info">{emp.employeeId}</td>
                      <td>
                        <div className="fw-semibold">{emp.name}</div>
                        <div className="text-secondary">{emp.email}</div>
                      </td>
                      <td>{emp.department}</td>
                      <td>{emp.designation}</td>
                      <td>
                        <span className="badge bg-secondary text-uppercase">{emp.role}</span>
                      </td>
                      {user?.role === 'hr' && (
                        <td>
                          <button
                            onClick={() => handleDelete(emp._id)}
                            className="btn btn-outline-danger btn-sm"
                          >
                            Remove
                          </button>
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

export default Employees;
