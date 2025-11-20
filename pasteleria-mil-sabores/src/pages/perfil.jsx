import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useProfile } from "../contexts/ProfileContext";
import { useCart } from "../contexts/CartContext";
import { orderService } from "../services/orderService";
import "../styles/theme.css";

const Perfil = () => {

  const { profile, logout } = useProfile();
  const { clearLocalCart } = useCart();
  const [activeSection, setActiveSection] = useState("info");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [updatingOrder, setUpdatingOrder] = useState(null);
  const navigate = useNavigate();

  // Cargar órdenes desde el backend cuando el usuario esté autenticado
  useEffect(() => {
    const loadOrders = async () => {
      const token = localStorage.getItem("token");
      if (token && profile?.email) {
        try {
          setLoadingOrders(true);
          // Si el usuario es admin, obtener todas las órdenes; si no, solo las propias
          const response = profile?.admin ? await orderService.getAll() : await orderService.getMine();
          console.log('Órdenes recibidas del backend:', response.data);

          // Transformar las órdenes del backend al formato esperado por el frontend
          const formattedOrders = response.data.map(order => ({
            id: order.orderId || order.id,
            items: order.items,
            total: order.total,
            fecha: order.fecha || order.createdAt,
            metodo: order.metodo,
            estado: order.estado,
            profile: order.profile || order.user || null
          }));

          console.log('Órdenes formateadas:', formattedOrders);
          setOrders(formattedOrders);
        } catch (error) {
          console.error('Error al cargar órdenes:', error);
          setOrders([]);
        } finally {
          setLoadingOrders(false);
        }
      }
    };

    if (activeSection === "pedidos") {
      loadOrders();
    }
  }, [activeSection, profile?.email]);

  const handleLogout = () => {
    clearLocalCart(); // Limpiar carrito local antes de cerrar sesión
    logout();
    navigate("/");
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingOrder(orderId);
      
      console.log('Order ID recibido:', orderId, 'Tipo:', typeof orderId);
      
      await orderService.updateStatus(orderId, newStatus);
      
      // Actualizar el estado local del pedido
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, estado: newStatus } : order
        )
      );
      
      console.log(`Estado del pedido ${orderId} actualizado a ${newStatus}`);
    } catch (error) {
      console.error('Error al actualizar estado del pedido:', error);
      console.error('Detalles del error:', error.response?.data);
      alert(`Error: ${error.response?.data?.message || 'No se pudo actualizar el estado'}`);
    } finally {
      setUpdatingOrder(null);
    }
  };

  return (
    <main className="perfil-modern-container">
      <aside className="perfil-sidebar">
        <h3>Mi Cuenta</h3>
        <ul>
          <li
            className={activeSection === "info" ? "active" : ""}
            onClick={() => setActiveSection("info")}
          >
            Mi información
          </li>
          <li
            className={activeSection === "pedidos" ? "active" : ""}
            onClick={() => setActiveSection("pedidos")}
          >
            Mis pedidos
          </li>
          {profile?.admin && (
            <li>
              <Link to="/admin" className="admin-link">Panel de Administración</Link>
            </li>
          )}
          <li>
            <Button className="btn-logout-modern" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </li>
        </ul>
      </aside>
      <section className="perfil-main">
        {activeSection === "info" && (
          <>
            <h2>Mi Información</h2>
            {profile ? (
              <div className="perfil-info-modern">
                <p><strong>Nombre:</strong> {profile.nombre}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Teléfono:</strong> {profile.telefono || "No especificado"}</p>
                <p><strong>Dirección:</strong> {profile.direccion || "No especificado"}</p>
              </div>
            ) : (
              <p>No hay información de perfil disponible.</p>
            )}
          </>
        )}
        {activeSection === "pedidos" && (
          <>
            <h2>Mis Pedidos</h2>
            {loadingOrders ? (
              <p>Cargando pedidos...</p>
            ) : orders && orders.length > 0 ? (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <span className="order-id">#{order.id}</span>
                      <span className="order-date">
                        {new Date(order.fecha).toLocaleString()}
                      </span>
                    </div>
                    {profile?.admin && order.profile && (
                      <div className="order-customer" style={{ marginTop: 6, marginBottom: 6 }}>
                        <strong>Cliente:</strong>{' '}
                        {(order.profile.nombre || order.profile.name) ? (
                          <span>{order.profile.nombre || order.profile.name}</span>
                        ) : null}
                        {order.profile.email ? (
                          <span>{(order.profile.nombre || order.profile.name) ? ' · ' : ''}{order.profile.email}</span>
                        ) : null}
                      </div>
                    )}
                    <div className="order-body">
                      <p><strong>Total:</strong> ${order.total.toLocaleString()}</p>
                      <p><strong>Método de pago:</strong> {order.metodo}</p>
                      <p><strong>Estado:</strong> {order.estado || 'pendiente'}</p>
                      {profile?.admin && (
                        <div className="order-status-controls" style={{ marginTop: '1rem' }}>
                          <label htmlFor={`status-${order.id}`} style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>
                            Cambiar estado:
                          </label>
                          <select
                            id={`status-${order.id}`}
                            value={order.estado || 'pendiente'}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            disabled={updatingOrder === order.id}
                            style={{
                              padding: '0.5rem',
                              borderRadius: '6px',
                              border: '1px solid #d5b896',
                              backgroundColor: '#fffdf9',
                              color: '#4a3324',
                              cursor: updatingOrder === order.id ? 'wait' : 'pointer'
                            }}
                          >
                            <option value="pendiente">Pendiente</option>
                            <option value="en_proceso">En proceso</option>
                            <option value="completado">Completado</option>
                            <option value="cancelado">Cancelado</option>
                          </select>
                          {updatingOrder === order.id && (
                            <span style={{ marginLeft: '0.5rem', fontSize: '0.9rem', color: '#8b4513' }}>
                              Actualizando...
                            </span>
                          )}
                        </div>
                      )}
                      {order.items && order.items.length > 0 && (
                        <div className="order-items">
                          <p><strong>Productos:</strong></p>
                          <ul>
                            {order.items.map((item, idx) => (
                              <li key={idx}>
                                {item.title} x{item.quantity} - ${item.subtotal?.toLocaleString()}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-orders">Aún no has realizado ningún pedido.</p>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Perfil;