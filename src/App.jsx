// import { useState } from 'react'
import './App.css'
// import logo from "/logo.svg"
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Home'
import Homepage from './Homepage'

function App() {

  return (
    <Router>
  <div>
      <Route path="/" exact component={Home} />
      <Route path="/Homepage" component={Homepage} />
      </div>
      </Router>
  );
}

export default App
