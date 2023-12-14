import React, { useState } from 'react';

const AgregarInvestigadorModal = ({ agregarInvestigador, closeModal }) => {
  // Estado y funciones para manejar el nuevo investigador
    const [investigador, setInvestigador] = useState({ nombre: '', area_conocimiento: '', id_departamento_investigador: '' });
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Lógica para enviar el nuevo investigador al backend
        const response = await fetch('http://localhost:4000/investigadores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(investigador),
        });
    } catch (error) {
      console.error('Error al agregar investigador:', error);
    }
  };

  //  componente AgregarInvestigadorModal
    const handleInputChange = e => {
        const { name, value } = e.target;
        setInvestigador({ ...investigador, [name]: value });
    };

  return (
    <div className="modal-content">
      {/* Estructura del modal para agregar investigador */}
        <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">Agregar investigador</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
        </div>
        <div className="modal-body">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={investigador.nombre}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="area_conocimiento">Área de conocimiento:</label>
                    <input
                        type="text"
                        id="area_conocimiento"
                        name="area_conocimiento"
                        value={investigador.area_conocimiento}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="id_departamento_investigador">Departamento:</label>
                    <input
                        type="text"
                        id="id_departamento_investigador"
                        name="id_departamento_investigador"
                        value={investigador.id_departamento_investigador}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-dark">
                    Agregar
                </button>
            </form>
        </div>
    </div>
  );
};

export default AgregarInvestigadorModal;
