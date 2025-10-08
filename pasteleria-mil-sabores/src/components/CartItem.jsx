import React from 'react';
import { Button } from 'react-bootstrap';
import '../styles/theme.css';
import { useCart } from '../contexts/CartContext';

export default function CartItem({ item, index }) {
  const { updateItem, removeFromCart } = useCart();

  const setQuantity = (q) => {
    const qty = Math.max(1, Number(q) || 1);
    const subtotal = Math.round(item.price * qty);
    updateItem(index, { quantity: qty, subtotal });
  }

  return (
    <div className="cart-item d-flex align-items-center gap-3 p-2 border-bottom">
      <img src={item.photo} alt={item.title} style={{width:80, height:80, objectFit:'cover'}} />
      <div className="flex-grow-1">
        <div className="fw-bold">{item.title}</div>
        <div className="text-muted small">{item.size} • {item.type}</div>
        {item.extras && item.extras.length > 0 && (
          <div className="small text-muted">Extras: {item.extras.join(', ')}</div>
        )}
        <div className="mt-1">Precio: ${item.price.toLocaleString()}</div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <input aria-label="cantidad" type="number" min="1" value={item.quantity} onChange={e => setQuantity(e.target.value)} style={{width:70}} />
        <div className="fw-bold mt-2">${(item.subtotal||item.price).toLocaleString()}</div>
        <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(index)}>Eliminar</Button>
      </div>
    </div>
  );
}
