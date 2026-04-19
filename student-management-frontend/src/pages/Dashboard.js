import { useEffect, useState } from "react";
import { getDashboardStats } from "../api";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_students: 0,
    total_events: 0,
    total_participation: 0,
    total_faculty: 0,
    curricular_events: 0,
    extra_curricular_events: 0,
    curricular_participation: 0,
    extra_curricular_participation: 0
  });

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error("Error loading dashboard stats:", err);
    }
  };

  useEffect(() => {
    loadStats();
    // Refresh stats every 5 seconds for dynamic updates
    const interval = setInterval(loadStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ icon, title, value, color }) => (
    <div className={`stat-card stat-${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h3>{title}</h3>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>📊 Dashboard</h1>
        <p>Student Curricular & Extra-Curricular Management System</p>
        <button className="btn btn-primary" onClick={loadStats} style={{ marginLeft: "auto" }}>
          🔄 Refresh
        </button>
      </div>

      <div className="stats-grid">
        <StatCard icon="👨‍🎓" title="Total Students" value={stats.total_students} color="blue" />
        <StatCard icon="🎯" title="Total Events" value={stats.total_events} color="green" />
        <StatCard icon="✋" title="Participations" value={stats.total_participation} color="orange" />
        <StatCard icon="👨‍🏫" title="Faculty Members" value={stats.total_faculty} color="purple" />
      </div>

      <div className="stats-grid">
        <StatCard icon="📚" title="Curricular Events" value={stats.curricular_events} color="blue" />
        <StatCard icon="🎭" title="Extra-Curricular Events" value={stats.extra_curricular_events} color="green" />
        <StatCard icon="📚" title="Curricular Participations" value={stats.curricular_participation} color="orange" />
        <StatCard icon="🎭" title="Extra-Curricular Participations" value={stats.extra_curricular_participation} color="purple" />
      </div>

      <div className="dashboard-sections">
        <div className="section">
          <h2>📚 Curricular Activities</h2>
          <p>Manage academic events, workshops, and seminars organized by departments.</p>
          <a href="/activities?type=curricular" className="btn btn-primary">View Curricular Events</a>
        </div>

        <div className="section">
          <h2>🎭 Extra-Curricular Activities</h2>
          <p>Track student participation in clubs, sports, cultural events, and competitions.</p>
          <a href="/activities?type=extra-curricular" className="btn btn-secondary">View Extra-Curricular</a>
        </div>
      </div>

      <div className="quick-actions">
        <h2>🚀 Quick Actions</h2>
        <div className="action-buttons">
          <a href="/students" className="action-btn">
            <span className="action-icon">➕</span> Add New Student
          </a>
          <a href="/events" className="action-btn">
            <span className="action-icon">📅</span> Create Event
          </a>
          <a href="/participation" className="action-btn">
            <span className="action-icon">👥</span> Register Participation
          </a>
          <a href="/faculty" className="action-btn">
            <span className="action-icon">👨‍🏫</span> Manage Faculty
          </a>
        </div>
      </div>
    </div>
  );
}