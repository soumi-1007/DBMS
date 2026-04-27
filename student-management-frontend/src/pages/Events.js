import { useEffect, useState } from "react";
import { getEvents, getEventsByType, getFaculty, getActivities, addEvent, updateEvent, deleteEvent } from "../api";
import "../styles/Global.css";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [activities, setActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("all");
  const [formData, setFormData] = useState({
    event_name: "",
    date: "",
    location: "",
    activity_id: "",
    faculty_id: ""
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [facultiesData, activitiesData] = await Promise.all([
        getFaculty(),
        getActivities()
      ]);
      setFaculties(facultiesData);
      setActivities(activitiesData);
      loadEventsByFilter("all");
    } catch (err) {
      setMessage("Error loading data: " + err.message);
    }
  };

  const loadEventsByFilter = async (filterType) => {
    try {
      let eventsData;
      if (filterType === "all") {
        eventsData = await getEvents();
      } else if (filterType === "curricular") {
        eventsData = await getEventsByType("curricular");
      } else if (filterType === "extra-curricular") {
        eventsData = await getEventsByType("extra-curricular");
      }
      setEvents(eventsData);
      setFilter(filterType);
    } catch (err) {
      setMessage("Error loading events: " + err.message);
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
        await updateEvent(editingId, formData);
        setMessage("Event updated successfully!");
      } else {
        await addEvent(formData);
        setMessage("Event added successfully!");
      }
      setFormData({ event_name: "", date: "", location: "", activity_id: "", faculty_id: "" });
      setEditingId(null);
      setShowModal(false);
      loadEventsByFilter(filter);
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(id);
        setMessage("Event deleted successfully!");
        loadEventsByFilter(filter);
      } catch (err) {
        setMessage("Error: " + err.message);
      }
    }
  };

  const handleAddNew = () => {
    setFormData({ event_name: "", date: "", location: "", activity_id: "", faculty_id: "" });
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
          onClick={() => loadEventsByFilter("all")}
        >
          📋 All Events ({events.length})
        </button>
        <button
          className={`btn ${filter === "curricular" ? "btn-primary" : "btn-warning"} btn-sm`}
          onClick={() => loadEventsByFilter("curricular")}
        >
          📚 Curricular
        </button>
        <button
          className={`btn ${filter === "extra-curricular" ? "btn-primary" : "btn-warning"} btn-sm`}
          onClick={() => loadEventsByFilter("extra-curricular")}
        >
          🎭 Extra-Curricular
        </button>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h2>📅 Events Management</h2>
          <button className="btn btn-white" onClick={handleAddNew}>
            ➕ Create Event
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Type</th>
              <th>Date</th>
              <th>Location</th>
              <th>Faculty Coordinator</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event) => (
                <tr key={event.event_id}>
                  <td><strong>{event.event_name}</strong></td>
                  <td>
                    <span style={{
                      background: event.activity_type_display === "Curricular" ? "#e3f2fd" : "#f3e5f5",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      fontSize: "0.85em"
                    }}>
                      {event.activity_type_display === "Curricular" ? "📚 Curricular" : "🎭 Extra-Curricular"}
                    </span>
                  </td>
                  <td>{event.date ? new Date(event.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : "N/A"}</td>
                  <td>{event.location || "N/A"}</td>
                  <td>{event.faculty_name || "N/A"}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(event.event_id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  No events found for this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingId ? "Edit Event" : "Create New Event"}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Event Name *</label>
                <input
                  type="text"
                  name="event_name"
                  value={formData.event_name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Activity Type *</label>
                <select
                  name="activity_id"
                  value={formData.activity_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Activity Type</option>
                  {activities.map(activity => (
                    <option key={activity.activity_id} value={activity.activity_id}>
                      {activity.activity_type === 'Co' ? 'Curricular' : 'Extra-Curricular'} - {activity.activity_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Faculty Coordinator</label>
                <select name="faculty_id" value={formData.faculty_id} onChange={handleInputChange}>
                  <option value="">Select Faculty</option>
                  {faculties.map(faculty => (
                    <option key={faculty.faculty_id} value={faculty.faculty_id}>
                      {faculty.faculty_name}
                    </option>
                  ))}
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