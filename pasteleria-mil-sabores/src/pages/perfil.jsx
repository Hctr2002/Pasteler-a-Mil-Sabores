import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { ProfileContext } from "../contexts/ProfileContext";
import { useCart } from "../contexts/CartContext"; // 👈 Importamos el contexto del carrito
import "../styles/theme.css";

const Perfil = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const { orders } = useCart(); // 👈 Traemos los pedidos del carrito
  const [activeSection, setActiveSection] = useState("info");

  const handleLogout = () => {
    localStorage.removeItem("ds_profile");
    if (typeof setProfile === "function") setProfile(null);
    window.location.replace("/Loginpage");
  };

  return (
    <main className="perfil-modern-container">
      {/* Sidebar */}
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
        </ul>
        <Button className="btn-logout-modern" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </aside>

      {/* Contenido principal */}
      <section className="perfil-main">
        {/* --- SECCIÓN INFORMACIÓN --- */}
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

        {/* --- SECCIÓN PEDIDOS --- */}
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
