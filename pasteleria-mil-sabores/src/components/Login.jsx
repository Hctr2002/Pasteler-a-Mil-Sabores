import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useProfile } from "../contexts/ProfileContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const { updateProfile } = useProfile();
  const [storedUser] = useLocalStorage("ds_user", null);

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!storedUser) {
      setError("No hay usuario registrado. Regístrate para continuar.");
      return;
    }

    const isValid =
      form.email === storedUser.email && form.password === storedUser.password;

    if (!isValid) {
      setError("Credenciales incorrectas. Revisa tu correo y contraseña.");
      return;
    }

    setError("");
    updateProfile({
      nombre: storedUser.nombre ?? "",
      email: storedUser.email,
      telefono: storedUser.telefono ?? "",
      direccion: storedUser.direccion ?? "",
    });

    toast.success("Inicio de sesión exitoso", {
      position: "bottom-center",
      autoClose: 1400,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      onClose: () => {
        navigate("/");
      },
    });
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
          style={{ width: "100%", marginBottom: "1rem" }}
        />

        <button type="submit" style={{ width: "100%" }}>
          Ingresar
        </button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: "0.75rem" }} role="alert">
          {error}
        </p>
      )}

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <span>¿No tienes cuenta? </span>
        <Link to="/register">Regístrate ahora</Link>
      </div>

      {/* Contenedor del toast */}
      <ToastContainer />
    </div>
  );
}
