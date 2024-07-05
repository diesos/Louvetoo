import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Component/Nav.jsx';
import Home from './Home';
import Homepage from './Homepage.jsx';
import Register from './Component/Register.jsx';
import Login from './Component/Login.jsx';
import Profile from './Component/Profile.jsx';
import Dashboard from './Component/Dashboard.jsx';



function App() {
  return (
    <Router>
      <div>
        <Nav /> {/* Composant Nav ajouté ici */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;