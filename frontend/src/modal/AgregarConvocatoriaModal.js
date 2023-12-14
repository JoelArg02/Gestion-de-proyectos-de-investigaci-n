import React, { useState } from 'react';

const AgregarConvocatoriaModal = ({ agregarConvocatoria, closeModal }) => {
  // Estado y funciones para manejar la nueva convocatoria
    const [convocatoria, setConvocatoria] = useState({ fecha_publicacion: '', programa: '', fecha_limite_solicitudes: '', numero_convocatoria: '', web: '', boe_dogb: '', fecha_resolucion: '', id_organismo_convocatoria: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Lógica para enviar la nueva convocatoria al backend
        const response = await fetch('http://localhost:4000/convocatorias', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(convocatoria),
        });
    } catch (error) {
      console.error('Error al agregar convocatoria:', error);
    }
  };
  //componente AgregarConvocatoriaModal
    const handleInputChange = e => {
        const { name, value } = e.target;
        setConvocatoria({ ...convocatoria, [name]: value });
    };


  return (
    <div className="modal-content">
        <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">Agregar convocatoria</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
    </div>
        <div className="modal-body">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fecha_publicacion">Fecha de publicación:</label>
                    <input
                        type="text"
                        id="fecha_publicacion"
                        name="fecha_publicacion"
                        value={convocatoria.fecha_publicacion}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="programa">Programa:</label>
                    <input
                        type="text"
                        id="programa"
                        name="programa"
                        value={convocatoria.programa}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fecha_limite_solicitudes">Fecha límite de solicitudes:</label>
                    <input
                        type="text"
                        id="fecha_limite_solicitudes"
                        name="fecha_limite_solicitudes"
                        value={convocatoria.fecha_limite_solicitudes}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="numero_convocatoria">Número de convocatoria:</label>
                    <input
                        type="text"
                        id="numero_convocatoria"
                        name="numero_convocatoria"
                        value={convocatoria.numero_convocatoria}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="web">Web:</label>
                    <input
                        type="text"
                        id="web"
                        name="web"
                        value={convocatoria.web}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="boe_dogb">BOE/DOGB:</label>
                    <input
                        type="text"
                        id="boe_dogb"
                        name="boe_dogb"
                        value={convocatoria.boe_dogb}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fecha_resolucion">Fecha de resolución:</label>
                    <input
                        type="text"
                        id="fecha_resolucion"
                        name="fecha_resolucion"
                        value={convocatoria.fecha_resolucion}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="id_organismo_convocatoria">Organismo:</label>
                    <input
                        type="text"
                        id="id_organismo_convocatoria"
                        name="id_organismo_convocatoria"
                        value={convocatoria.id_organismo_convocatoria}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </div>
            </form>
        </div>
    </div>
    );
}

export default AgregarConvocatoriaModal;
