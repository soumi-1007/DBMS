import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>🎓 Activity Management</h1>
          <p>Student Activity Tracking System</p>
        </div>
        
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="nav-link">
              📊 Dashboard
            </Link>
          </li>
          <li>
            <Link to="/students" className="nav-link">
              👨‍🎓 Students
            </Link>
          </li>
          <li>
            <Link to="/events" className="nav-link">
              📅 Events
            </Link>
          </li>
          <li>
            <Link to="/participation" className="nav-link">
              👥 Participation
            </Link>
          </li>
          <li>
            <Link to="/faculty" className="nav-link">
              👨‍🏫 Faculty
            </Link>
          </li>
          <li>
            <Link to="/achievements" className="nav-link">
              🏆 Achievements
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}