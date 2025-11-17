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
        </ul>
        <Button className="btn-logout-modern" onClick={handleLogout}>
          Cerrar sesión
        </Button>
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