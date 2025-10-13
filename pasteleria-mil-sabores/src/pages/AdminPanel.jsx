import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { pasteles as initialPasteles } from '../utils/mockPasteles.js';
import '../styles/theme.css';

const AdminPanel = () => {
  const [pasteles, setPasteles] = useState([]);

  useEffect(() => {
    let storedPasteles = localStorage.getItem('pasteles');

    if (storedPasteles) {
      setPasteles(JSON.parse(storedPasteles));
    } else {
      localStorage.setItem('pasteles', JSON.stringify(initialPasteles));
      setPasteles(initialPasteles);
    }
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este pastel?')) {
      const updatedPasteles = pasteles.filter((pastel) => pastel.id !== id);

      setPasteles(updatedPasteles);

      localStorage.setItem('pasteles', JSON.stringify(updatedPasteles));
    }
  };

  return (
    <div className="admin-panel-container">
      <div className="admin-header">
        <h1>Panel de Administración</h1>
        <Link to="/admin/pastel/nuevo" className="btn btn-primary">
          + Agregar Nuevo Pastel
        </Link>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Título</th>
            <th>Categoría</th>
            <th>Tamaño</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pasteles.map((pastel) => (
            <tr key={pastel.id}>
              <td>
                <img src={pastel.photo} alt={pastel.title} className="pastel-photo-admin" />
              </td>
              <td>{pastel.title}</td>
              <td>{pastel.category}</td>
              <td>{pastel.size}</td>
              <td>
                <div className="action-buttons">
                  <Link to={`/admin/pastel/editar/${pastel.id}`} className="btn btn-secondary">
                    Editar
                  </Link>
                  <button onClick={() => handleDelete(pastel.id)} className="btn btn-danger">
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;