import { useEffect, useState } from "react";
import { getRegistrationLog } from "../api";
import "../styles/Global.css";

export default function RegistrationLog() {
  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const logData = await getRegistrationLog();
      setLogs(logData);
    } catch (err) {
      setMessage("Error loading logs: " + err.message);
    }
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
          <h2>📋 Registration Log</h2>
        </div>

        <table>
          <thead>
            <tr>
              <th>Log ID</th>
              <th>Student ID</th>
              <th>Event ID</th>
              <th>Registration Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? (
              logs.map((l, i) => (
                <tr key={i}>
                  <td>{l.registration_id || i + 1}</td>
                  <td>{l.student_id}</td>
                  <td>{l.event_id}</td>
                  <td>{l.registration_date ? new Date(l.registration_date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : "N/A"}</td>
                  <td>
                    <span style={{
                      background: "#c8e6c9",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      fontSize: "0.85em"
                    }}>
                      ✓ Registered
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  No registration logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}