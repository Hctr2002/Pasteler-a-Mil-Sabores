document.addEventListener("DOMContentLoaded", () => {
    // Elementos del DOM
    const tbody = document.querySelector("tbody");
    const tfoot = document.querySelector("tfoot td:nth-child(2)");
    const carritoContainer = document.getElementById("carrito-container");
    const botonesAgregar = document.querySelectorAll(".agregar-carrito");

    // Funciones de carrito
    function getCarrito() {
        return JSON.parse(localStorage.getItem("carrito")) || [];
    }

    function saveCarrito(carrito) {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    function renderTablaCarrito() {
        const carrito = getCarrito();
        tbody.innerHTML = "";
        let total = 0;

        carrito.forEach((item, index) => {
            const row = document.createElement("tr");

            // Valores por defecto
            const tamano = item.tamano || "6/8 Personas";
            const extras = item.extras || "Ninguno";

            row.innerHTML = `
                <td  data-label="N°">${item.cantidad || 1}</td>
                <td data-label="Nombre">${item.nombre}</td>
                <td data-label="Categoria">${item.categoria}</td>
                <td data-label="Tipo">${item.tipo || "Redondo"}</td>
                <td data-label="Tamaño">${tamano}</td>
                <td data-label="Extras">${extras}</td>
                <td data-label="Precio">$${item.precio.toLocaleString()}</td>
                <td data-label="Acciones">
                    <a href="#" data-action="eliminar" data-index="${index}">Eliminar</a>
                </td>
            `;

            tbody.appendChild(row);
            total += (item.precio * (item.cantidad || 1));

        });

        tfoot.textContent = `$${total.toLocaleString()}`;
    }

    function renderCarritoPage() {
        if (!carritoContainer) return;

        const carrito = getCarrito();
        carritoContainer.innerHTML = "";

        if (carrito.length === 0) {
            carritoContainer.innerHTML = "<p>Tu carrito está vacío 🛒</p>";
            return;
        }

        let total = 0;
        carrito.forEach((item, index) => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;

            carritoContainer.innerHTML += `
                <div class="carrito-item">
                    <p>Cantidad: ${item.cantidad}<strong>${item.nombre}</strong> (${item.categoria}, ${item.tipo})</p>
                    <p>Precio: $${item.precio.toLocaleString()}</p>
                    <button class="eliminar-item" data-index="${index}">❌ Eliminar</button>
                    <hr>
                </div>
            `;
        });

        carritoContainer.innerHTML += `<h3>Total: $${total.toLocaleString()}</h3>`;

        // Manejo de eliminar producto
        carritoContainer.querySelectorAll(".eliminar-item").forEach(boton => {
            boton.addEventListener("click", () => {
                const carrito = getCarrito();
                carrito.splice(boton.dataset.index, 1);
                saveCarrito(carrito);
                renderCarritoPage(); // Actualiza la vista sin recargar
            });
        });
    }

    
    // Eventos

    function mostrarToast(mensaje) {
        const toast = document.getElementById("toast");
        toast.textContent = mensaje;
        toast.classList.add("show");

        // Ocultar después de 3 segundos
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    // Eliminar desde la tabla
    if (tbody) {
        tbody.addEventListener("click", (e) => {
            if (e.target.dataset.action === "eliminar") {
                const carrito = getCarrito();
                carrito.splice(e.target.dataset.index, 1);
                saveCarrito(carrito);
                renderTablaCarrito();
            }
        });
    }

    // Agregar productos desde catálogo
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", () => {
            const producto = {
                id: boton.dataset.id,
                nombre: boton.dataset.nombre,
                categoria: boton.dataset.categoria,
                tipo: boton.dataset.tipo,
                precio: parseFloat(boton.dataset.precio),
                cantidad: 1
            };

            const carrito = getCarrito();
            const index = carrito.findIndex(item => item.id === producto.id);

            if (index >= 0) {
                carrito[index].cantidad += 1;
            } else {
                carrito.push(producto);
            }

            saveCarrito(carrito);
            mostrarToast("Pastel agregado al carrito 🍰");
        });
    });

    // Inicialización
    renderTablaCarrito();
    renderCarritoPage();
});
