import { useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/authService";
import "../styles/theme.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ...existing code...
export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
        toast.error("Las contraseñas no coinciden", {
          position: "bottom-center",
          autoClose: 3000,
        });
        return;
    }

    if (form.password.length < 6) {
        toast.error("La contraseña debe tener al menos 6 caracteres", {
          position: "bottom-center",
          autoClose: 3000,
        });
        return;
    }

    setLoading(true);
    try {
      const userData = {
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono,
        direccion: form.direccion,
        password: form.password,
      };

      await authService.register(userData);

      toast.success("Registro exitoso. Ahora puedes iniciar sesión", {
        position: "bottom-center",
        autoClose: 1400,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        onClose: () => {
          navigate("/loginpage");
        },
      });
    } catch (error) {
      console.error('Error al registrar:', error);
      const message = error.response?.data?.message || 'Error al registrar usuario';
      toast.error(message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-screen">
      <h2>Registro de usuario</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="nombre">Nombre completo</label>
        <input id="nombre" type="text" name="nombre" placeholder="Tu nombre" value={form.nombre} onChange={handleChange} required disabled={loading} style={{ width: "100%", marginBottom: "0.75rem" }}
        />
        <label htmlFor="email">Correo electrónico</label>
        <input id="email" type="email" name="email" placeholder="tu@correo.com" value={form.email} onChange={handleChange} required disabled={loading} style={{ width: "100%", marginBottom: "0.75rem" }}
        />
        <label htmlFor="telefono">Teléfono</label>
        <input id="telefono" type="tel" name="telefono" placeholder="+56912345678" value={form.telefono} onChange={handleChange} required disabled={loading} style={{ width: "100%", marginBottom: "0.75rem" }}
        />
        <label htmlFor="direccion">Dirección</label>
        <input id="direccion" type="text" name="direccion" placeholder="Calle 123, Ciudad" value={form.direccion} onChange={handleChange} required disabled={loading} style={{ width: "100%", marginBottom: "0.75rem" }}
        />
        <label htmlFor="password">Contraseña</label>
        <input id="password" type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} required disabled={loading} style={{ width: "100%", marginBottom: "0.75rem" }}
        />
        <label htmlFor="confirmPassword">Confirmar contraseña</label>
        <input id="confirmPassword" type="password" name="confirmPassword" placeholder="Repite tu contraseña" value={form.confirmPassword} onChange={handleChange} required disabled={loading} style={{ width: "100%", marginBottom: "1rem" }}
        />
        <button type="submit" className="btn-register" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
      <div className="aux-link">
        <span>¿Ya tienes cuenta? </span>
        <Link to="/loginpage">Inicia sesión</Link>
      </div>
      <ToastContainer />
    </div>
  );
}