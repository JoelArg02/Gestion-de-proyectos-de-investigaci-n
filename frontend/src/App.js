import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Convocatorias from './components/Convocatorias';
import Organismos from './components/Organismos'; 
import Navigation from './components/Navigation';


function App() {
  return (
    <Router>
      <Navigation /> {/* Include the Navigation component */}
        <Routes>
          <Route path="/convocatorias" element={<Convocatorias />} />
          <Route path="/organismos" element={<Organismos  />} />
        </Routes>
    </Router>
  );
}

export default App;
