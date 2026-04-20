import { useEffect, useState } from "react";
import { getDashboardStats } from "../api";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_students: 0,
    total_events: 0,
    total_participation: 0,
    total_faculty: 0
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
      </div>

      <div className="stats-grid">
        <StatCard title="Total Students" value={stats.total_students} color="blue" />
        <StatCard title="Total Events" value={stats.total_events} color="green" />
        <StatCard title="Participations" value={stats.total_participation} color="orange" />
        <StatCard title="Faculty Members" value={stats.total_faculty} color="purple" />
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