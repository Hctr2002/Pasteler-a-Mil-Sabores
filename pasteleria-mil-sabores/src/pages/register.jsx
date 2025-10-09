import { useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import "../styles/theme.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ...existing code...
export default function Register() {
  const navigate = useNavigate();
  const [storedUser, setStoredUser] = useLocalStorage("ds_user", null);

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (storedUser && storedUser.email === form.email) {
        setError("Ya existe un usuario registrado con este correo");
        return;
    }

    if (form.password !== form.confirmPassword) {
        setError("Las contraseñas no coinciden");
        return;
    }

    const newUser = {
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono,
        direccion: form.direccion,
        password: form.password,
    };

    setStoredUser(newUser);
    setError("");

    toast.success("Registro exitoso", {
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
  };

  return (
    <div className="register-screen">
      <h2>Registro de usuario</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="nombre">Nombre completo</label>
        <input id="nombre" type="text" name="nombre" placeholder="Tu nombre" value={form.nombre} onChange={handleChange} required style={{ width: "100%", marginBottom: "0.75rem" }}
        />
        <label htmlFor="email">Correo electrónico</label>
        <input id="email" type="email" name="email" placeholder="tu@correo.com" value={form.email} onChange={handleChange} required style={{ width: "100%", marginBottom: "0.75rem" }}
        />
        <label htmlFor="telefono">Teléfono</label>
        <input id="telefono" type="tel" name="telefono" placeholder="+56912345678" value={form.telefono} onChange={handleChange} required style={{ width: "100%", marginBottom: "0.75rem" }}
        />
        <label htmlFor="direccion">Dirección</label>
        <input id="direccion" type="text" name="direccion" placeholder="Calle 123, Ciudad" value={form.direccion} onChange={handleChange} required style={{ width: "100%", marginBottom: "0.75rem" }}
        />
        <label htmlFor="password">Contraseña</label>
        <input id="password" type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} required style={{ width: "100%", marginBottom: "0.75rem" }}
        />
        <label htmlFor="confirmPassword">Confirmar contraseña</label>
        <input id="confirmPassword" type="password" name="confirmPassword" placeholder="Repite tu contraseña" value={form.confirmPassword} onChange={handleChange} required style={{ width: "100%", marginBottom: "1rem" }}
        />
        <button type="submit" className="btn-register">
          Registrarse
        </button>
      </form>
      {error && (
        <p style={{ color: "red", marginTop: "0.75rem" }} role="alert">
          {error}
        </p>
      )}
      <div className="aux-link">
        <span>¿Ya tienes cuenta? </span>
        <Link to="/loginpage">Inicia sesión</Link>
      </div>
      <ToastContainer />
    </div>
  );
}