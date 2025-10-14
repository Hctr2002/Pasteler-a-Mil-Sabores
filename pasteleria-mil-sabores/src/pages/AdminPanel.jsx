import { Link } from 'react-router-dom';
import { usePasteles } from '../contexts/PastelesContext';
import '../styles/theme.css';

const AdminPanel = () => {
  const { pasteles, updatePasteles } = usePasteles();
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este pastel?')) {
      const updatedPasteles = pasteles.filter((pastel) => pastel.id !== id);

      updatePasteles(updatedPasteles);
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
              <td data-label="Foto">
                <img src={pastel.photo} alt={pastel.title} className="pastel-photo-admin" />
              </td>
              <td data-label="Título">{pastel.title}</td>
              <td data-label="Categoría">{pastel.category}</td>
              <td data-label="Tamaño">{pastel.size}</td>
              <td data-label="Acciones">
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