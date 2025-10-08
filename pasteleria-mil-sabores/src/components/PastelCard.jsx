import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/theme.css';
import { useCart } from '../contexts/CartContext';
import { calcPricePastel } from '../utils/pricing';

export function PastelCard({ pastel }) {
    const { addToCart } = useCart();

    const handleAdd = () => {
        const price = calcPricePastel(pastel);
        const item = { ...pastel, price, quantity: 1, subtotal: price };
        addToCart(item);
    }

    return (
        <Card className="pastel-card h-100">
            <Card.Img 
                variant="top" 
                src={pastel.photo} 
                alt={pastel.title} 
                className="pastel-img" 
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{pastel.title}</Card.Title>
                <Card.Subtitle className="meta mb-2">
                    Categoria: {pastel.category}  Tipo: {pastel.type}  Tamao: {pastel.size}  Extras: {pastel.extras}  Opiniones: {'\u2605'.repeat(pastel.opinions)}
                </Card.Subtitle>
                <Card.Text className="flex-grow-1">{pastel.description}</Card.Text>
                <div className="d-flex gap-2">
                    <Button 
                        as={Link} 
                        to={`/pastel/${pastel.id}`} 
                        className="btn pastel-btn" 
                        size="sm"
                    >
                        Ver detalle
                    </Button>
                    <Button 
                        onClick={handleAdd}
                        className="btn pastel-btn" 
                        size="sm"
                    >
                        Agregar al carrito
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}
