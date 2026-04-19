import { useEffect, useState } from "react";
import { getFaculty, addFaculty, updateFaculty, deleteFaculty } from "../api";
import "../styles/Global.css";

export default function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    faculty_name: "",
    dept_id: ""
  });

  useEffect(() => {
    loadFaculty();
  }, []);

  const loadFaculty = async () => {
    try {
      const data = await getFaculty();
      setFaculty(data);
    } catch (err) {
      setMessage("Error loading faculty: " + err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateFaculty(editingId, formData);
        setMessage("Faculty updated successfully!");
      } else {
        await addFaculty(formData);
        setMessage("Faculty added successfully!");
      }
      setFormData({ faculty_name: "", dept_id: "" });
      setEditingId(null);
      setShowModal(false);
      loadFaculty();
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  const handleEdit = (fac) => {
    setFormData(fac);
    setEditingId(fac.faculty_id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this faculty member?")) {
      try {
        await deleteFaculty(id);
        setMessage("Faculty deleted successfully!");
        loadFaculty();
      } catch (err) {
        setMessage("Error: " + err.message);
      }
    }
  };

  const handleAddNew = () => {
    setFormData({ faculty_name: "", dept_id: "" });
    setEditingId(null);
    setShowModal(true);
  };

  return (
    <div className="container">
      {message && (
        <div className={`alert ${message.includes("Error") ? "alert-error" : "alert-success"}`}>
          {message}
        </div>
      )}

      <div className="table-container">
        <div className="table-header">
          <h2>👨‍🏫 Faculty Management</h2>
          <button className="btn btn-primary" onClick={handleAddNew}>
            ➕ Add Faculty
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Faculty ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faculty.map((fac) => (
              <tr key={fac.faculty_id}>
                <td>{fac.faculty_id}</td>
                <td><strong>{fac.faculty_name}</strong></td>
                <td>{fac.dept_name || `Dept ${fac.dept_id}`}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(fac)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(fac.faculty_id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingId ? "Edit Faculty" : "Add New Faculty"}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Faculty Name *</label>
                <input
                  type="text"
                  name="faculty_name"
                  value={formData.faculty_name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Department ID</label>
                <input
                  type="number"
                  name="dept_id"
                  value={formData.dept_id}
                  onChange={handleInputChange}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "30px" }}>
                <button type="submit" className="btn btn-success" style={{ flex: 1 }}>
                  ✓ Save
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setShowModal(false)}
                  style={{ flex: 1 }}
                >
                  ✕ Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}