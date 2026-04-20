import { useEffect, useState } from "react";
import { getStudents, addStudent, updateStudent, deleteStudent } from "../api";
import "../styles/Global.css";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dept_id: "",
    year: ""
  });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      setMessage("Error loading students: " + err.message);
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
        await updateStudent(editingId, formData);
        setMessage("Student updated successfully!");
      } else {
        await addStudent(formData);
        setMessage("Student added successfully!");
      }
      setFormData({ name: "", email: "", dept_id: "", year: "" });
      setEditingId(null);
      setShowModal(false);
      loadStudents();
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id);
        setMessage("Student deleted successfully!");
        loadStudents();
      } catch (err) {
        setMessage("Error: " + err.message);
      }
    }
  };

  const handleAddNew = () => {
    setFormData({ name: "", email: "", dept_id: "", year: "" });
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
          <h2>👨‍🎓 Students Management</h2>
          <button className="btn btn-white" onClick={handleAddNew}>
            ➕ Add New Student
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.student_id}>
                <td>{s.student_id}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.dept_name || "N/A"}</td>
                <td>{s.year}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(s.student_id)}
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
              <h3>{editingId ? "Edit Student" : "Add New Student"}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
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

              <div className="form-group">
                <label>Year</label>
                <select name="year" value={formData.year} onChange={handleInputChange}>
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
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