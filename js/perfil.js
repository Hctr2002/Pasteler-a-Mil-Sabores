document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
        alert("No hay sesión activa");
        window.location.href = "../pages/login.html";
        return;
    }


    // Insertar datos en el HTML
    document.getElementById("nombre").textContent = usuario.nombre || "";
    document.getElementById("apellido").textContent = usuario.apellido || "";
    document.getElementById("direccion").textContent = usuario.direccion || "";
    document.getElementById("email").textContent = usuario.email || "";

    // Cerrar sesión
    document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("usuario");
        window.location.href = "login.html";
    });

    document.getElementById("edit-btn").addEventListener("click", () => {
    window.location.href = "editarPerfil.html";
});
});

