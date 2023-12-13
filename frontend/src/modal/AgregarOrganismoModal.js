import React, { useState } from 'react';

const AgregarOrganismoModal = ({ agregarOrganismo, closeModal }) => {
  const [nuevoOrganismo, setNuevoOrganismo] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    poblacion: '',
    codigo_postal: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoOrganismo({ ...nuevoOrganismo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/organismos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoOrganismo),
      });

      if (!response.ok) {
        throw new Error('Hubo un problema al agregar el organismo');
      }

      const nuevoOrganismoAgregado = await response.json();
      agregarOrganismo(nuevoOrganismoAgregado); // Llama a la función para agregar el organismo en el componente padre
      closeModal(); // Cierra el modal después de agregar
    } catch (error) {
      console.error('Error al agregar organismo:', error);
    }
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h3>Agregar Organismo</h3>
        <button className="close" onClick={closeModal}>
          &times;
        </button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nuevoOrganismo.nombre}
              onChange={handleInputChange}
              className="form-control"
              required
            />
            <label htmlFor="direccion">Dirección:</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={nuevoOrganismo.direccion}
              onChange={handleInputChange}
              className="form-control"
              required
            />
            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={nuevoOrganismo.telefono}
              onChange={handleInputChange}
              className="form-control"
              required
            />
            <label htmlFor="poblacion">Población:</label>
            <input
              type="text"
              id="poblacion"
              name="poblacion"
              value={nuevoOrganismo.poblacion}
              onChange={handleInputChange}
              className="form-control"
              required
            />
            <label htmlFor="codigo_postal">Código Postal:</label>
            <input
              type="text"
              id="codigo_postal"
              name="codigo_postal"
              value={nuevoOrganismo.codigo_postal}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          {/* Agrega otros campos de formulario aquí */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarOrganismoModal;
