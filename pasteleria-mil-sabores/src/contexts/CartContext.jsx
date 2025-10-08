import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useProfile } from "./ProfileContext";

const CartContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
    const [cart, setCart] = useLocalStorage("ds_cart", []);
    const [orders, setOrders] = useLocalStorage("ds_orders", []);
    const { profile } = useProfile();

    const addToCart = (item) => setCart(c => {
        // merge if same id and same options (size, type, extras)
        const normalizeExtras = (arr) => (arr || []).slice().map(String).sort();
        const newExtras = normalizeExtras(item.extras);
        const matchIndex = c.findIndex(it => {
            if (it.id !== item.id) return false;
            if ((it.size || '') !== (item.size || '')) return false;
            if ((it.type || '') !== (item.type || '')) return false;
            const itExtras = normalizeExtras(it.extras);
            if (itExtras.length !== newExtras.length) return false;
            for (let i = 0; i < itExtras.length; i++) {
                if (itExtras[i] !== newExtras[i]) return false;
            }
            return true;
        });

        if (matchIndex === -1) {
            return [...c, item];
        }

        // increment quantity and subtotal for matched item
        return c.map((it, i) => {
            if (i !== matchIndex) return it;
            const addedQty = Number(item.quantity || 1);
            const prevQty = Number(it.quantity || 1);
            const price = Number(it.price ?? item.price ?? 0);
            const qty = prevQty + addedQty;
            const subtotal = Math.round(price * qty);
            return { ...it, quantity: qty, subtotal };
        });
    });
    const removeFromCart = (idx) => setCart(c => c.filter((_, i) => i !== idx));
    const clearCart = () => setCart([]);

    // update an item at index with new partial data (e.g. quantity or subtotal)
    const updateItem = (idx, changes) => setCart(c => c.map((it, i) => i === idx ? { ...it, ...changes } : it));

    const total = useMemo(() => cart.reduce((s, it) => s + (it.subtotal ?? 0), 0), [cart]);

    const checkout = ({fecha, metodo}) => {
        if(!cart.length) return null;
        const orderId = `DS-${Date.now()}`;
        const snapshot = { nombre: profile.nombre, email: profile.email, telefono: profile.telefono, direccion: profile.direccion };
        const order = { id: orderId, items: cart, total, fecha, metodo, profile: snapshot};
        setOrders(o => [...o, order]);
        clearCart();
        return orderId;
    }

    const value = { cart, addToCart, removeFromCart, clearCart, updateItem, total, orders, checkout };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};