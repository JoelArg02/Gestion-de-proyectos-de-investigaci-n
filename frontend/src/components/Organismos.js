import React, { useState, useEffect } from 'react';
import AgregarOrganismoModal from '../modal/AgregarOrganismoModal.js'; // Importa tu componente modal de agregar

const Organismos = () => {
  const [organismos, setOrganismos] = useState([]);
  const [currentOrganismo, setCurrentOrganismo] = useState({ id_organismo: null, nombre: '', direccion: '', telefono: '', poblacion: '', codigo_postal: '' });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchOrganismos = async () => {
      try {
        const response = await fetch('http://localhost:4000/organismos');
        if (!response.ok) {
          throw new Error('Hubo un error al obtener los datos');
        }
        const data = await response.json();
        setOrganismos(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchOrganismos();
  }, []);

  
  const handleInputChange = e => {
    const { name, value } = e.target;
    setCurrentOrganismo({ ...currentOrganismo, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const url = isEditMode ? `http://localhost:4000/organismos/${currentOrganismo.id_organismo}` : 'http://localhost:4000/organismos';
    const config = {
      method: isEditMode ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentOrganismo)
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error('Hubo un problema con la solicitud');
      }
      const updatedOrganismo = await response.json();

      if (isEditMode) {
        setOrganismos(organismos.map(org => org.id_organismo === updatedOrganismo.id_organismo ? updatedOrganismo : org));
      } else {
        setOrganismos([...organismos, updatedOrganismo]);
      }
      resetForm();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const resetForm = () => {
    setCurrentOrganismo({ id_organismo: null, nombre: '', direccion: '', telefono: '', poblacion: '', codigo_postal: '' });
    setIsEditMode(false);
  };

  const editOrganismo = organismo => {
    setCurrentOrganismo(organismo);
    setIsEditMode(true);
  };
  const deleteOrganismo = async (id) => {
    const url = `http://localhost:4000/organismos/${id}`;
    try {
      const response = await fetch(url, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Hubo un problema al eliminar el organismo');
      }
      setOrganismos(organismos.filter(org => org.id_organismo !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="container mt-4">
      <h2>Organismos</h2>
      <form onSubmit={handleSubmit} className="form">
        {isEditMode ? <h3>Editar Organismo</h3> : <h3>Agregar Organismo</h3>}
        <input type="hidden" name="id_organismo" value={currentOrganismo.id_organismo || ''} />
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={currentOrganismo.nombre}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="direccion">Dirección:</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={currentOrganismo.direccion}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={currentOrganismo.telefono}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="poblacion">Población:</label>
          <input
            type="text"
            id="poblacion"
            name="poblacion"
            value={currentOrganismo.poblacion}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="codigo_postal">Código Postal:</label>
          <input
            type="text"
            id="codigo_postal"
            name="codigo_postal"
            value={currentOrganismo.codigo_postal}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {isEditMode ? 'Actualizar' : 'Agregar'}
        </button>
        {isEditMode && (
          <button type="button" onClick={resetForm} className="btn btn-secondary">
            Cancelar Edición
          </button>
        )}
      </form>
      <ul className="list-group mt-4">
        {organismos.map((organismo) => (
          <li key={organismo.id_organismo} className="list-group-item">
            {organismo.nombre} - {organismo.direccion} - {organismo.poblacion} - {organismo.codigo_postal} -{' '}
            {organismo.telefono}
            <button onClick={() => editOrganismo(organismo)} className="btn btn-info ml-2">
              Editar
            </button>
            <button
              onClick={() => deleteOrganismo(organismo.id_organismo)}
              className="btn btn-danger ml-2"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Organismos;