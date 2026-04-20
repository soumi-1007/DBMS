import { useEffect, useState } from "react";
import { getParticipation, getParticipationByType, getStudents, getEvents, addParticipation, updateParticipation, deleteParticipation } from "../api";
import "../styles/Global.css";

export default function Participation() {
  const [participations, setParticipations] = useState([]);
  const [students, setStudents] = useState([]);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("all");
  const [formData, setFormData] = useState({
    student_id: "",
    event_id: "",
    role: "Participant",
    status: "Registered"
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [studentsData, eventsData] = await Promise.all([
        getStudents(),
        getEvents()
      ]);
      setStudents(studentsData);
      setEvents(eventsData);
      loadParticipationByFilter("all");
    } catch (err) {
      setMessage("Error loading data: " + err.message);
    }
  };

  const loadParticipationByFilter = async (filterType) => {
    try {
      let participationData;
      if (filterType === "all") {
        participationData = await getParticipation();
      } else if (filterType === "curricular") {
        participationData = await getParticipationByType("curricular");
      } else if (filterType === "extra-curricular") {
        participationData = await getParticipationByType("extra-curricular");
      }
      setParticipations(participationData);
      setFilter(filterType);
    } catch (err) {
      setMessage("Error loading participations: " + err.message);
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
        await updateParticipation(editingId, formData);
        setMessage("Participation updated successfully!");
      } else {
        await addParticipation(formData);
        setMessage("Participation added successfully!");
      }
      setFormData({ student_id: "", event_id: "", role: "Participant", status: "Registered" });
      setEditingId(null);
      setShowModal(false);
      loadParticipationByFilter(filter);
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this participation?")) {
      try {
        await deleteParticipation(id);
        setMessage("Participation removed successfully!");
        loadParticipationByFilter(filter);
      } catch (err) {
        setMessage("Error: " + err.message);
      }
    }
  };

  const handleAddNew = () => {
    setFormData({ student_id: "", event_id: "", role: "Participant", status: "Registered" });
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

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button
          className={`btn ${filter === "all" ? "btn-primary" : "btn-warning"} btn-sm`}
          onClick={() => loadParticipationByFilter("all")}
        >
          👥 All ({participations.length})
        </button>
        <button
          className={`btn ${filter === "curricular" ? "btn-primary" : "btn-warning"} btn-sm`}
          onClick={() => loadParticipationByFilter("curricular")}
        >
          📚 Curricular
        </button>
        <button
          className={`btn ${filter === "extra-curricular" ? "btn-primary" : "btn-warning"} btn-sm`}
          onClick={() => loadParticipationByFilter("extra-curricular")}
        >
          🎭 Extra-Curricular
        </button>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h2>👥 Participation Management</h2>
          <button className="btn btn-white" onClick={handleAddNew}>
            ➕ Register Student
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Event Name</th>
              <th>Activity Type</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {participations.map((p) => (
              <tr key={p.participation_id}>
                <td><strong>{p.name}</strong></td>
                <td>{p.event_name}</td>
                <td>
                  <span style={{
                    background: p.activity_type_display === "Curricular" ? "#e3f2fd" : "#f3e5f5",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontSize: "0.85em"
                  }}>
                    {p.activity_type_display === "Curricular" ? "📚 Curricular" : "🎭 Extra-Curricular"}
                  </span>
                </td>
                <td>{p.role}</td>
                <td>
                  <span style={{
                    background: p.status === "Registered" ? "#c8e6c9" : "#ffe0b2",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontSize: "0.85em"
                  }}>
                    {p.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(p.participation_id)}
                  >
                    🗑️ Remove
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
              <h3>{editingId ? "Edit Participation" : "Register Student"}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Student *</label>
                <select
                  name="student_id"
                  value={formData.student_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Student</option>
                  {students.map(student => (
                    <option key={student.student_id} value={student.student_id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Event *</label>
                <select
                  name="event_id"
                  value={formData.event_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Event</option>
                  {events.map(event => (
                    <option key={event.event_id} value={event.event_id}>
                      {event.event_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Role *</label>
                <select name="role" value={formData.role} onChange={handleInputChange} required>
                  <option value="Participant">Participant</option>
                  <option value="Organizer">Organizer</option>
                  <option value="Coordinator">Coordinator</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status *</label>
                <select name="status" value={formData.status} onChange={handleInputChange} required>
                  <option value="Registered">Registered</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
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