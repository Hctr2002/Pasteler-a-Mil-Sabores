import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/theme.css';

export function NoticiaCard({ noticia }) {
    
    const formatTimestamp = (timestamp) => {
        if (!timestamp) return 'Fecha desconocida';
        const date = new Date(timestamp);
        // Puedes ajustar el formato según tu preferencia (ej: 'es-ES' para España, 'es-CL' para Chile, etc.)
        return date.toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    return (
        <Card className="noticia-card h-100">
            <Card.Img 
                variant="top" 
                src={noticia.photo} 
                alt={noticia.title} 
                className="noticia-img" 
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{noticia.title}</Card.Title>
                
                {/* Meta data: Categoría, Fuente, Impacto y Fecha */}
                <Card.Subtitle className="meta mb-2 text-muted small">
                    <span className={`badge ${noticia.impact === 'Alto' ? 'bg-danger' : noticia.impact === 'Medio' ? 'bg-warning text-dark' : 'bg-success'}`}>
                        {noticia.impact}
                    </span>
                    {' '}
                    **{noticia.category}** | Tipo: {noticia.type}
                </Card.Subtitle>
                <Card.Text className="flex-grow-1">{noticia.description}</Card.Text>

                <div className="d-flex justify-content-between align-items-center mt-2">
                    <small className="text-muted">
                        **Fuente:** {noticia.source} | **Publicado:** {formatTimestamp(noticia.timestamp)}
                    </small>
                    
                    {/* Botón para ver el detalle de la noticia */}
                    <Button 
                        as={Link} 
                        // Asume que la ruta de detalle será /noticias/ID_DE_LA_NOTICIA
                        to={`/noticias/${noticia.id}`} 
                        className="btn noticia-btn" 
                        size="sm"
                        variant="outline-primary" // Cambiado el color del botón para diferenciarlo
                    >
                        Leer más ➡️
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}