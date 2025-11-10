import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";
import { authService } from "../services/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const { updateProfile } = useProfile();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      const response = await authService.login(form.email, form.password);
      
      // Actualizar el perfil con los datos del login (sin mostrar toast)
      updateProfile({
        nombre: response.data.nombre,
        email: response.data.email,
        telefono: response.data.telefono || "",
        direccion: response.data.direccion || "",
        admin: response.data.admin || false
      }, false); // false = no mostrar toast de "perfil actualizado"

      toast.success("Inicio de sesión exitoso", {
        position: "bottom-center",
        autoClose: 1400,
        hideProgressBar: true,
        onClose: () => {
          navigate("/");
        },
      });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      const message = error.response?.data?.message || 'Credenciales incorrectas';
      toast.error(message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: "1rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="tu@correo.com"
          value={form.email}
          onChange={handleChange}
          required
          disabled={loading}
          style={{ width: "100%", marginBottom: "0.75rem" }}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          required
          disabled={loading}
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        <button type="submit" style={{ width: "100%" }} disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <span>¿No tienes cuenta? </span>
        <Link to="/register">Regístrate ahora</Link>
      </div>
      <ToastContainer />
    </div>
  );
}