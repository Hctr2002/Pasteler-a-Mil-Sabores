document.getElementById("login-form").addEventListener("submit", e => {
    e.preventDefault();

    function mostrarToast(mensaje) {
        const toast = document.getElementById("toast");
        toast.textContent = mensaje;
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

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
        mostrarToast("Bienvenido Administrador 🎂");
        setTimeout(() => window.location.href = "../index.html", 1500);
        return;
    }

    // Verificar en los usuarios registrados
    const usuarioValido = usuarios.find(u => u.email === email && u.password === password);

    if (usuarioValido) {
        localStorage.setItem("usuario", JSON.stringify(usuarioValido));
        mostrarToast("Inicio de sesión exitoso 🎉");
        setTimeout(() => window.location.href = "../index.html", 1500);
    } else {
        mostrarToast("❌ Usuario o contraseña incorrectos");
    }
});
