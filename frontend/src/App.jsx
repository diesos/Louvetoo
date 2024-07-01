import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Component/Nav.jsx';
import Home from './Home';
import Homepage from './Homepage.jsx';
import Register from './Component/Register.jsx';
import Login from './Component/Login.jsx';



function App() {
  return (
    <Router>
      <div>
        <Nav /> {/* Composant Nav ajouté ici */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
