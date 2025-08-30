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

    function ajustarColspanTotal() {
        const ancho = window.innerWidth;
        const celdaTotal = document.getElementById("celda-total");
        if (celdaTotal) {
            if (ancho < 768) {
                celdaTotal.setAttribute("colspan", "2");
            } else {
                celdaTotal.setAttribute("colspan", "5");
            }
        }
    }

    window.addEventListener("resize", ajustarColspanTotal);
    window.addEventListener("load", ajustarColspanTotal);
    
    
});
