import React, { useState, useEffect } from 'react';
import AgregarSolicitudModal from '../modal/AgregarSolicitudModal';

const Solicitudes = () => {
  // Estado y funciones para manejar las solicitudes
  const [solicitudes, setSolicitudes] = useState([]);
  const [currentSolicitud, setCurrentSolicitud] = useState({ id_solicitud: null, id_convocatoria_solicitud: '', id_grupo_investigacion_solicitud: '', id_investigador_solicitud: '', fecha_solicitud: '', estado_solicitud: '' });
  const [isEditMode, setIsEditMode] = useState(false);
  
  useEffect(() => {
    // Lógica para obtener solicitudes del backend
    const fetchSolicitudes = async () => {
      try {
        const response = await fetch('http://localhost:4000/solicitudes');
        if (!response.ok) {
          throw new Error('Hubo un error al obtener los datos');
        }
        const data = await response.json();
        setSolicitudes(data);
      } catch (err) {
        console.error(err.message);
      }
    };
  }, []);

  //  componente Solicitudes con lógica para mostrar y manipular las solicitudes
  const handleInputChange = e => {
    const { name, value } = e.target;
    setCurrentSolicitud({ ...currentSolicitud, [name]: value });
  };

  return (
    <div className="container mt-4">
      {/* Estructura del componente Solicitudes */}
      <h1>Solicitudes</h1>
      <AgregarSolicitudModal />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Convocatoria</th>
            <th scope="col">Grupo de investigación</th>
            <th scope="col">Investigador</th>
            <th scope="col">Fecha de solicitud</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Lógica para mostrar las solicitudes */}
          {solicitudes.map(solicitud => (
            <tr key={solicitud.id_solicitud}>
              <td>{solicitud.id_convocatoria_solicitud}</td>
              <td>{solicitud.id_grupo_investigacion_solicitud}</td>
              <td>{solicitud.id_investigador_solicitud}</td>
              <td>{solicitud.fecha_solicitud}</td>
              <td>{solicitud.estado_solicitud}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => console.log('Editar solicitud')}>
                  <i className="fas fa-pencil-alt"></i>
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => console.log('Eliminar solicitud')}>
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Solicitudes;
