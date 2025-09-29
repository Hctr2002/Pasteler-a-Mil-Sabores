import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/theme.css';

export function PastelCard({ pastel }){
    return(
        <Card className="bg-ligth border-secondary h-100">
            <Card.Body className="d-flex flex-column">
                <Card.Title className='filter-title'>{pastel.title}</Card.Title>
                <Card.Img variant="top" src={pastel.photo} alt={pastel.title} className="pastel-img"/>
                <Card.Subtitle className="meta mb-2">
                    Categoria: {pastel.category} • Tipo: {pastel.type} • Tamaño: {pastel.size} • Extras: {pastel.extras} • Opiniones: {'★'.repeat(pastel.opinions)}
                </Card.Subtitle>
                <Card.Text className="flex-grwo-1">{pastel.description}</Card.Text>
                <div className="d-flex gap-2">
                    <Button as={Link} to={`/pasteles/${pastel.id}`} className='btn' size='sm'>Ver detalle</Button>
                    <Button as={Link} to={"/carrito"} className='btn' size='sm'>Agregar al carrito</Button>
                </div>
            </Card.Body>
        </Card>
    );
}