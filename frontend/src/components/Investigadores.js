import React, { useState, useEffect } from 'react';
import AgregarInvestigadorModal from '../modal/AgregarInvestigadorModal';

const Investigadores = () => {
  // Estado y funciones para manejar los investigadores
  const [investigadores, setInvestigadores] = useState([]);
  const [currentInvestigador, setCurrentInvestigador] = useState({ id_investigador: null, nombre: '', area_conocimiento: '', id_departamento_investigador: '' });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Lógica para obtener investigadores del backend
    const fetchInvestigadores = async () => {
      try {
        const response = await fetch('http://localhost:4000/investigadores');
        if (!response.ok) {
          throw new Error('Hubo un error al obtener los datos');
        }
        const data = await response.json();
        setInvestigadores(data);
      } catch (err) {
        console.error(err.message);
      }
    };

  }, []);

  //  componente Investigadores con lógica para mostrar y manipular los investigadores
  const handleInputChange = e => {
    const { name, value } = e.target;
    setCurrentInvestigador({ ...currentInvestigador, [name]: value });
  };


  return (
    <div className="container mt-4">
      {/* Estructura del componente Investigadores */}
      <h1>Investigadores</h1>
      <AgregarInvestigadorModal />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Área de conocimiento</th>
            <th scope="col">Departamento</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Lógica para mostrar los investigadores */}
          {investigadores.map(investigador => (
            <tr key={investigador.id_investigador}>
              <td>{investigador.nombre}</td>
              <td>{investigador.area_conocimiento}</td>
              <td>{investigador.id_departamento_investigador}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => console.log('Editar investigador')}>
                  <i className="fas fa-pencil-alt"></i>
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => console.log('Eliminar investigador')}>
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

export default Investigadores;
