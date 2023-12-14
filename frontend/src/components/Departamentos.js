import React, { useState, useEffect } from 'react';
import AgregarDepartamentoModal from '../modal/AgregarDepartamentoModal';
//import './Departamentos.css'; // Agrega estilos según sea necesario

const Departamentos = () => {
  // Estado y funciones para manejar los departamentos
  const [departamentos, setDepartamentos] = useState([]);
  const [currentDepartamento, setCurrentDepartamento] = useState({ id_departamento: null, nombre: '', id_facultad_departamento: '' });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Lógica para obtener departamentos del backend
    const fetchDepartamentos = async () => {
      try {
        const response = await fetch('http://localhost:4000/departamentos');
        if (!response.ok) {
          throw new Error('Hubo un error al obtener los datos');
        }
        const data = await response.json();
        setDepartamentos(data);
      } catch (err) {
        console.error(err.message);
      }
    };
  }, []);

  // componente Departamentos con lógica para mostrar y manipular los departamentos
  const handleInputChange = e => {
    const { name, value } = e.target;
    setCurrentDepartamento({ ...currentDepartamento, [name]: value });
  };
  
  return (
    <div className="container mt-4">
      {/* Estructura del componente Departamentos */}
      <h1>Departamentos</h1>
      <AgregarDepartamentoModal />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Facultad</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Lógica para mostrar los departamentos */}
          {departamentos.map(departamento => (
            <tr key={departamento.id_departamento}>
              <td>{departamento.nombre}</td>
              <td>{departamento.id_facultad_departamento}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => console.log('Editar departamento')}>
                  <i className="fas fa-pencil-alt"></i>
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => console.log('Eliminar departamento')}>
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

export default Departamentos;
