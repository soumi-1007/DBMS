import { useEffect, useState } from "react";
import { getAchievements } from "../api";
import "../styles/Global.css";

export default function Achievements() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      const achievements = await getAchievements();
      setData(achievements);
    } catch (err) {
      setMessage("Error loading achievements: " + err.message);
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
          <h2>🏆 Achievements</h2>
        </div>

        <table>
          <thead>
            <tr>
              <th>Achievement ID</th>
              <th>Participation</th>
              <th>Prize/Recognition</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((a) => (
                <tr key={a.achievement_id || a.participation_id}>
                  <td>{a.achievement_id || a.participation_id}</td>
                  <td>{a.participation_id}</td>
                  <td><strong>{a.prize || "N/A"}</strong></td>
                  <td>{a.details || "No additional details"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                  No achievements recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}