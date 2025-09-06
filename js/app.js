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

// BUSCADOR DE PASTELES EN HOME
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('form[data-screen="home"]');
    const input = document.getElementById("q");
    const destacadosSection = document.querySelector('section[aria-labelledby="home-destacados-title"]');
    const cardsList = document.querySelector('ul.cards[data-test-id="home-destacados"]');
    const cards = cardsList ? Array.from(cardsList.querySelectorAll("li")) : [];

    // Crear contenedor para resultados si no existe
    let resultadosSection = document.getElementById("resultados-busqueda");
    if (!resultadosSection) {
        resultadosSection = document.createElement("section");
        resultadosSection.id = "resultados-busqueda";
        destacadosSection.parentNode.insertBefore(resultadosSection, destacadosSection.nextSibling);
    }

    resultadosSection.style.display = "none";

    if (form && input && cardsList) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const query = input.value.trim().toLowerCase();

            // Limpiar resultados anteriores
            resultadosSection.innerHTML = "";

            // Filtrar pasteles por nombre
            const resultados = cards.filter(card => {
                const nombre = card.querySelector("h4")?.textContent.toLowerCase() || "";
                return nombre.includes(query);
            });

            // Ocultar destacados y mostrar resultados
            destacadosSection.style.display = "none";
            resultadosSection.style.display = "block";

            if (resultados.length > 0) {
                const ul = document.createElement("ul");
                ul.className = "cards";
                resultados.forEach(card => {
                    ul.appendChild(card.cloneNode(true));
                });
                resultadosSection.appendChild(ul);
            } else {
                resultadosSection.innerHTML = "<p>No se encontraron pasteles con ese nombre.</p>";
            }

            if (!query) {
                destacadosSection.style.display = "block";
                resultadosSection.style.display = "none";
            }
        });
    }
});
