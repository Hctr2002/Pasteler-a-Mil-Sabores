import { createContext, useContext, useMemo, useEffect, useState, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useProfile } from "./ProfileContext";
import { orderService } from "../services/orderService";
import { cartService } from "../services/cartService";
import { toast } from "react-toastify";

const CartContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
    const [cart, setCart] = useLocalStorage("ds_cart", []);
    const [orders, setOrders] = useLocalStorage("ds_orders", []);
    const { profile } = useProfile();
    const [initialized, setInitialized] = useState(false);
    const [shouldSync, setShouldSync] = useState(false);
    const [lastEmail, setLastEmail] = useState(null);

    // Función para sincronizar con backend
    const syncCartToBackend = useCallback(async (cartToSync) => {
        const token = localStorage.getItem("token");
        if (!token || !initialized || !profile?.email) return;

        try {
            // Convertir formato del frontend al backend
            const backendFormat = cartToSync.map(item => ({
                pastelId: item.id,
                title: item.title,
                photo: item.photo,
                price: item.price,
                quantity: item.quantity,
                size: item.size || '',
                type: item.type || '',
                extras: item.extras || [],
                subtotal: item.subtotal
            }));

            console.log('Sincronizando carrito al backend:', backendFormat);
            await cartService.updateCart(backendFormat);
            console.log('Carrito sincronizado exitosamente');
        } catch (error) {
            console.error('Error al sincronizar carrito:', error);
            console.error('Detalles del error:', error.response?.data);
            // Si hay error, no mostrar al usuario pero registrar en consola
        }
    }, [initialized, profile?.email]);

    // Cargar carrito desde el backend cuando el usuario esté autenticado
    useEffect(() => {
        const loadCartFromBackend = async () => {
            try {
                const backendCart = await cartService.getCart();
                
                if (backendCart && backendCart.length > 0) {
                    // Convertir el formato del backend al formato del frontend
                    const formattedCart = backendCart.map(item => ({
                        id: item.pastelId,
                        title: item.title,
                        photo: item.photo,
                        price: item.price,
                        quantity: item.quantity,
                        size: item.size,
                        type: item.type,
                        extras: item.extras,
                        subtotal: item.subtotal
                    }));
                    
                    setCart(formattedCart);
                } else {
                    // Si el backend no tiene carrito, limpiar el local
                    setCart([]);
                }
                setInitialized(true);
            } catch (error) {
                console.error('Error al cargar carrito:', error);
                // Si falla, usar carrito local
                setInitialized(true);
            }
        };

        const token = localStorage.getItem("token");
        const currentEmail = profile?.email;

        // Si hay token y email, y cambió el usuario o no está inicializado
        if (token && currentEmail && (currentEmail !== lastEmail || !initialized)) {
            setLastEmail(currentEmail);
            loadCartFromBackend();
        } 
        // Si no hay token y estaba logueado antes, limpiar carrito
        else if (!token && lastEmail) {
            setLastEmail(null);
            setCart([]);
            setInitialized(true);
        }
        // Si no hay token y nunca ha habido, marcar como inicializado
        else if (!token && !lastEmail && !initialized) {
            setInitialized(true);
        }
    }, [profile?.email, initialized, lastEmail, setCart]);

    // Sincronizar carrito cuando cambie (solo si está inicializado y debe sincronizar)
    useEffect(() => {
        if (shouldSync && initialized && profile?.email) {
            // Sincronizar siempre, incluso si el carrito está vacío (para eliminar items del backend)
            syncCartToBackend(cart);
            setShouldSync(false);
        }
    }, [shouldSync, initialized, profile?.email, syncCartToBackend, cart]);

    const addToCart = (item) => {
        setCart(c => {
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

            let updatedCart;
            if (matchIndex === -1) {
                updatedCart = [...c, item];
            } else {
                // increment quantity and subtotal for matched item
                updatedCart = c.map((it, i) => {
                    if (i !== matchIndex) return it;
                    const addedQty = Number(item.quantity || 1);
                    const prevQty = Number(it.quantity || 1);
                    const price = Number(it.price ?? item.price ?? 0);
                    const qty = prevQty + addedQty;
                    const subtotal = Math.round(price * qty);
                    return { ...it, quantity: qty, subtotal };
                });
            }

            setShouldSync(true);
            return updatedCart;
        });
    };

    const removeFromCart = (idx) => {
        setCart(c => {
            const updatedCart = c.filter((_, i) => i !== idx);
            setShouldSync(true);
            return updatedCart;
        });
    };

    const clearCart = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                await cartService.clearCart();
            } catch (error) {
                console.error('Error al limpiar carrito en backend:', error);
            }
        }
        setCart([]);
    };

    // Función para limpiar el carrito al cerrar sesión (sin llamar al backend)
    const clearLocalCart = () => {
        setCart([]);
        setInitialized(false);
        setLastEmail(null);
    };

    // update an item at index with new partial data (e.g. quantity or subtotal)
    const updateItem = (idx, changes) => {
        setCart(c => {
            const updatedCart = c.map((it, i) => i === idx ? { ...it, ...changes } : it);
            setShouldSync(true);
            return updatedCart;
        });
    };

    const total = useMemo(() => cart.reduce((s, it) => s + (it.subtotal ?? 0), 0), [cart]);

    const checkout = async ({fecha, metodo}) => {
        if(!cart.length) return null;
        
        // Preparar items para el backend
        const items = cart.map(item => ({
            pastelId: item.id,
            id: item.id,
            title: item.title,
            photo: item.photo,
            price: item.price || 0,
            quantity: item.quantity || 1,
            size: item.size || '',
            type: item.type || '',
            extras: item.extras || [],
            subtotal: item.subtotal || 0
        }));
        
        try {
            // Crear pedido en el backend
            const response = await orderService.create({
                items,
                total,
                metodo
            });

            console.log('Pedido creado:', response);

            // Guardar en localStorage también
            const localOrder = { 
                id: response.data.orderId, 
                items: cart, 
                total, 
                fecha, 
                metodo, 
                profile: { 
                    nombre: profile.nombre, 
                    email: profile.email, 
                    telefono: profile.telefono, 
                    direccion: profile.direccion 
                }
            };
            setOrders(o => [...o, localOrder]);
            clearCart();
            
            toast.success('¡Pedido realizado exitosamente!');
            return response.data.orderId;
        } catch (error) {
            console.error('Error al crear pedido:', error);
            console.error('Detalles del error:', error.response?.data);
            console.error('Items enviados:', items);
            toast.error(error.response?.data?.message || 'Error al procesar el pedido');
            return null;
        }
    }

    const value = { cart, addToCart, removeFromCart, clearCart, clearLocalCart, updateItem, total, orders, checkout };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};