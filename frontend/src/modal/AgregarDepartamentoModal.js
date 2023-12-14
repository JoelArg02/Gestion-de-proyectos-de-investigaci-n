import React, { useState } from 'react';

const AgregarDepartamentoModal = ({ agregarDepartamento, closeModal }) => {
  // Estado y funciones para manejar el nuevo departamento
    const [departamento, setDepartamento] = useState({ nombre: '', id_facultad_departamento: '' });
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Lógica para enviar el nuevo departamento al backend
        const response = await fetch('http://localhost:4000/departamentos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(departamento),
        });
    } catch (error) {
      console.error('Error al agregar departamento:', error);
    }
  };

  // componente AgregarDepartamentoModal
    const handleInputChange = e => {
        const { name, value } = e.target;
        setDepartamento({ ...departamento, [name]: value });
    };

  return (
    <div className="modal-content">
      {/* Estructura del modal para agregar departamento y su director*/}
        <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">Agregar departamento</h5>
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
                        value={departamento.nombre}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="id_facultad_departamento">Facultad:</label>
                    <input
                        type="text"
                        id="id_facultad_departamento"
                        name="id_facultad_departamento"
                        value={departamento.id_facultad_departamento}
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

export default AgregarDepartamentoModal;
