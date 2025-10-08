import { useContext } from "react";
import { Button } from "react-bootstrap";
import { ProfileContext } from "../contexts/ProfileContext";
import { useNavigate } from "react-router-dom";
import "../styles/theme.css";

const Perfil = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("ds_profile");
    if (typeof setProfile === "function") setProfile(null); // opcional, limpia contexto
    window.location.replace("/Loginpage");
  };

  return (
    <>
      <main className="perfil-container" style={{ minHeight: "70vh", padding: "2rem" }}>
        <h2>Mi Perfil</h2>
        {profile ? (
          <div className="perfil-info">
            <p><strong>Nombre:</strong> {profile.nombre}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Teléfono:</strong> {profile.telefono || "No especificado"}</p>
          </div>
        ) : (
          <p>No hay información de perfil disponible.</p>
        )}

        <Button
          variant="outline-secondary"
          onClick={handleLogout}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
        >
          Cerrar sesión
        </Button>
      </main>
    </>
  );
};

export default Perfil;
