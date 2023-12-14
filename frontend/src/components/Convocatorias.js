import React, { useState, useEffect } from 'react';
import AgregarConvocatoriaModal from '../modal/AgregarConvocatoriaModal';
//import './Convocatorias.css'; // Agrega estilos según sea necesario

const Convocatorias = () => {
  // Estado y funciones para manejar las convocatorias
  const [convocatorias, setConvocatorias] = useState([]);
  const [currentConvocatoria, setCurrentConvocatoria] = useState({ id_convocatoria: null, fecha_publicacion: '', programa: '', fecha_limite_solicitudes: '', numero_convocatoria: '', web: '', boe_dogb: '', fecha_resolucion: '', id_organismo_convocatoria: '' });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Lógica para obtener convocatorias del backend
    const fetchConvocatorias = async () => {
      try {
        const response = await fetch('http://localhost:4000/convocatorias');
        if (!response.ok) {
          throw new Error('Hubo un error al obtener los datos');
        }
        const data = await response.json();
        setConvocatorias(data);
      } catch (err) {
        console.error(err.message);
      }
    };
  }, []);
  //componente Convocatorias con lógica para mostrar y manipular las convocatorias
  const handleInputChange = e => {
    const { name, value } = e.target;
    setCurrentConvocatoria({ ...currentConvocatoria, [name]: value });
  };
  return (
    <div className="container mt-4">
      {/* Estructura del componente Convocatorias */}
      <h1>Convocatorias</h1>
      <AgregarConvocatoriaModal />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Fecha de publicación</th>
            <th scope="col">Programa</th>
            <th scope="col">Fecha límite de solicitudes</th>
            <th scope="col">Número de convocatoria</th>
            <th scope="col">Web</th>
            <th scope="col">BOE/DOGB</th>
            <th scope="col">Fecha de resolución</th>
            <th scope="col">Organismo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Lógica para mostrar las convocatorias */}
          {convocatorias.map(convocatoria => (
            <tr key={convocatoria.id_convocatoria}>
              <td>{convocatoria.fecha_publicacion}</td>
              <td>{convocatoria.programa}</td>
              <td>{convocatoria.fecha_limite_solicitudes}</td>
              <td>{convocatoria.numero_convocatoria}</td>
              <td>{convocatoria.web}</td>
              <td>{convocatoria.boe_dogb}</td>
              <td>{convocatoria.fecha_resolucion}</td>
              <td>{convocatoria.id_organismo_convocatoria}</td>
              <td>
                <button className="btn btn-warning">Editar</button>
                <button className="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default Convocatorias;
