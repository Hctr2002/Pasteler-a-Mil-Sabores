
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';

export default function Carrito(){
    const { cart, total, clearCart, checkout } = useCart();
    const [metodo, setMetodo] = useState('Efectivo');
    const [message, setMessage] = useState('');

    const handleCheckout = async () => {
        const fecha = new Date().toISOString();
        // Convertir método a minúsculas para que coincida con el backend
        const metodoLowerCase = metodo.toLowerCase();
        const id = await checkout({fecha, metodo: metodoLowerCase});
        if(id){
            setMessage(`Orden creada: ${id}`);
        } else {
            setMessage('El carrito está vacío');
        }
    }

    return (
        <div className="container py-4">
            <h2>Tu carrito</h2>
            {cart.length === 0 ? (
                <div className="alert alert-info">No hay productos en el carrito.</div>
            ) : (
                <div>
                    <div className="list-group mb-3">
                        {cart.map((it, i) => (
                            <CartItem key={`${it.id}-${i}`} item={it} index={i} />
                        ))}
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <div>
                            <label className="me-2">Método de pago:</label>
                            <select value={metodo} onChange={e => setMetodo(e.target.value)}>
                                <option>Efectivo</option>
                                <option>Tarjeta</option>
                                <option>Transferencia</option>
                            </select>
                        </div>
                        <div className="text-end">
                            <div className="fs-5">Total: <strong>${total.toLocaleString()}</strong></div>
                            <div className="mt-2">
                                <button className="btn btn-secondary me-2" onClick={clearCart}>Vaciar carrito</button>
                                <button className="btn btn-primary" onClick={handleCheckout}>Pagar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {message && <div className="mt-3 alert alert-success">{message}</div>}

            <hr />
        </div>
    )
}