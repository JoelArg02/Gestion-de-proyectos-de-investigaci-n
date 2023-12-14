import React, { useState } from 'react';

const AgregarSolicitudModal = ({ agregarSolicitud, closeModal }) => {
  // Estado y funciones para manejar la nueva solicitud
    const [solicitud, setSolicitud] = useState({ fecha_solicitud: '', id_investigador_solicitud: '', id_convocatoria_solicitud: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Lógica para enviar la nueva solicitud al backend
        const response = await fetch('http://localhost:4000/solicitudes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(solicitud),
        });
    } catch (error) {
      console.error('Error al agregar solicitud:', error);
    }
  };

  // componente AgregarSolicitudModal
    const handleInputChange = e => {
        const { name, value } = e.target;
        setSolicitud({ ...solicitud, [name]: value });
    };

  return (
    <div className="modal-content">
      {/* Estructura del modal para agregar solicitud */}
        <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">Agregar solicitud</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
        </div>
        <div className="modal-body">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fecha_solicitud">Fecha de solicitud:</label>
                    <input
                        type="text"
                        id="fecha_solicitud"
                        name="fecha_solicitud"
                        value={solicitud.fecha_solicitud}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="id_investigador_solicitud">Investigador:</label>
                    <input
                        type="text"
                        id="id_investigador_solicitud"
                        name="id_investigador_solicitud"
                        value={solicitud.id_investigador_solicitud}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="id_convocatoria_solicitud">Convocatoria:</label>
                    <input
                        type="text"
                        id="id_convocatoria_solicitud"
                        name="id_convocatoria_solicitud"
                        value={solicitud.id_convocatoria_solicitud}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-dark">Agregar</button>
            </form>
        </div>
    </div>
  );
};

export default AgregarSolicitudModal;
