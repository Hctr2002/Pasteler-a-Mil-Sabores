document.getElementById("login-form").addEventListener("submit", e => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Usuario administrador fijo
  const adminUser = { 
    email: "admin@pasteleria.cl", 
    password: "admin123", 
    nombre: "Administrador", 
    apellido: "-", 
    direccion: "Pastelería Central"
  };

  // Recuperar usuarios registrados en LocalStorage
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verificar si es el admin
  if (email === adminUser.email && password === adminUser.password) {
    localStorage.setItem("usuario", JSON.stringify(adminUser));
    alert("Bienvenido Administrador 🎂");
    window.location.href = "../index.html";
    return;
  }

  // Verificar en los usuarios registrados
  const usuarioValido = usuarios.find(u => u.email === email && u.password === password);

  if (usuarioValido) {
    localStorage.setItem("usuario", JSON.stringify(usuarioValido));
    alert("Inicio de sesión exitoso 🎉");
    window.location.href = "../index.html";
  } else {
    alert("❌ Usuario o contraseña incorrectos");
  }
});
