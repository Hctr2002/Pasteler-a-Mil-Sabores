document.addEventListener("DOMContentLoaded", () => {
    // LOGIN / PERFIL
    const loginLink = document.getElementById("login-link");
    const usuario = localStorage.getItem("usuario");

    // Detectamos si estamos dentro de /pages/
    const estaEnPages = window.location.pathname.includes("/pages/");

    if (loginLink) {
        if (usuario) {
            loginLink.textContent = "Mi perfil";
            loginLink.href = estaEnPages ? "perfil.html" : "pages/perfil.html";
        } else {
            loginLink.textContent = "Ingresar";
            loginLink.href = estaEnPages ? "login.html" : "pages/login.html";
        }
    }
    
});
