document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.querySelector("tbody");
    const tfoot = document.querySelector("tfoot td:nth-child(2)");

    // Recuperar productos del localStorage
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    function renderCarrito() {
        tbody.innerHTML = ""; // Limpiar tabla
        let total = 0;

        carrito.forEach((item, index) => {
            const row = document.createElement("tr");

            // Valores por defecto si no existen
            const tamano = item.tamano || "14/16 Personas";
            const extras = item.extras || "Ninguno";

            row.innerHTML = `
                <td>${item.nombre}</td>
                <td>${item.categoria}</td>
                <td>${item.tipo || "Redondo"}</td>
                <td>${tamano}</td>
                <td>${extras}</td>
                <td>$${item.precio.toLocaleString()}</td>
                <td>
                    <a href="#" data-action="eliminar" data-index="${index}">Eliminar</a>
                </td>
            `;

            tbody.appendChild(row);
            total += item.precio;
        });

        tfoot.textContent = `$${total.toLocaleString()}`;
    }


    // Acción eliminar
    tbody.addEventListener("click", (e) => {
        if (e.target.dataset.action === "eliminar") {
            const index = e.target.dataset.index;
            carrito.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderCarrito();
        }
    });

    renderCarrito();
});
