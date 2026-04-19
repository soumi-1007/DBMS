import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./styles/Global.css";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Events from "./pages/Events";
import Faculty from "./pages/Faculty";
import Participation from "./pages/Participation";
import Achievements from "./pages/Achievements";
import RegistrationLog from "./pages/RegistrationLog";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/events" element={<Events />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/participation" element={<Participation />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/logs" element={<RegistrationLog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;