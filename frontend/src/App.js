import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Convocatorias from './components/Convocatorias';
import Organismos from './components/organismos'; 
import Navigation from './components/Navigation';
import Departamentos from './components/Departamentos';
import Investigadores from './components/Investigadores';
import Solicitudes from './components/Solicitudes';


function App() {
  return (
    <Router>
      <Navigation /> {/* Include the Navigation component */}
        <Routes>
          <Route path="/investigadores" element={<Investigadores />} />
          <Route path="/convocatorias" element={<Convocatorias />} />
          <Route path="/organismos" element={<Organismos  />} />
          <Route path="/departamentos" element={<Departamentos />} />
          <Route path="/solicitudes" element={<Solicitudes />} />
        </Routes>
    </Router>
  );
}

export default App;
