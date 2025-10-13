import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useProfile } from "../contexts/ProfileContext";
import { useCart } from "../contexts/CartContext";
import "../styles/theme.css";

const Perfil = () => {

  const { profile, updateProfile } = useProfile();
  const { orders } = useCart();
  const [activeSection, setActiveSection] = useState("info");
  const navigate = useNavigate();

  const handleLogout = () => {
    updateProfile({ nombre: "", email: "", telefono: "", direccion: "", admin: false });
    navigate("/loginpage");
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
            <ul>
              <li>
                <Link to="/admin" className="admin-link">Panel de Administración</Link>
              </li>
            </ul>
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
            {orders && orders.length > 0 ? (
              <div className="orders-list">
                {[...orders].reverse().map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <span className="order-id">#{order.id}</span>
                      <span className="order-date">
                        {new Date(order.fecha).toLocaleString()}
                      </span>
                    </div>
                    <div className="order-body">
                      <p><strong>Total:</strong> ${order.total.toLocaleString()}</p>
                      <p><strong>Método de pago:</strong> {order.metodo}</p>
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