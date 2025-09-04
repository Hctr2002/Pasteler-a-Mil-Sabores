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
        if (ancho < 600) {
            celdaTotal.setAttribute("colspan", "3");
        } else {
            celdaTotal.setAttribute("colspan", "6");
        }
    }

    window.addEventListener("resize", ajustarColspanTotal);
    window.addEventListener("load", ajustarColspanTotal);

    const btnMilHojas = document.getElementById("detalle-mil-hojas");
    const btnTresLeches = document.getElementById("detalle-tres-leches");
    const btnChocolate = document.getElementById("detalle-chocolate");
    
    btnMilHojas.addEventListener("click", () => {
        window.location.href = "pastelMilHojas.html";
    })

    btnTresLeches.addEventListener("click", () => {
        window.location.href = "pastelTresLeches.html";
    })

    btnChocolate.addEventListener("click", () => {
        window.location.href = "pastelChocolate.html";
    })
    
    

});
// FORMULARIO CONTACTO
document.addEventListener("DOMContentLoaded", () => {

    function mostrarToast(mensaje) {
        const toast = document.getElementById("toast");
        toast.textContent = mensaje;
        toast.classList.add("show");

        // Ocultar después de 3 segundos
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    const btnContacto = document.getElementById("btn-contacto");
    const formContacto = document.getElementById("form-contacto");
    btnContacto.addEventListener("click", (e) => {
        if (formContacto.checkValidity()) {
            e.preventDefault();
            mostrarToast("Gracias por contactarnos, te escribiremos lo antes posible!");
            formContacto.reset();
        }else {
            formContacto.reportValidity();
        }
    });
});
