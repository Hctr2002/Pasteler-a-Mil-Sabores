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
    
    // CARRITO DE COMPRAS
    // Función para obtener carrito desde localStorage
    function getCarrito() {
        return JSON.parse(localStorage.getItem("carrito")) || [];
    }

    // Función para guardar carrito
    function saveCarrito(carrito) {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    // Agregar productos desde catálogo
    const botonesAgregar = document.querySelectorAll(".agregar-carrito");
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

            let carrito = getCarrito();

            // Ver si ya existe
            const index = carrito.findIndex(item => item.id === producto.id);
            if (index >= 0) {
                carrito[index].cantidad += 1;
            } else {
                carrito.push(producto);
            }

            saveCarrito(carrito);
            alert(`${producto.nombre} agregado al carrito ✅`);
        });
    });

    // Mostrar carrito en carrito.html
    const carritoContainer = document.getElementById("carrito-container");
    if (carritoContainer) {
        let carrito = getCarrito();
        carritoContainer.innerHTML = "";

        if (carrito.length === 0) {
            carritoContainer.innerHTML = "<p>Tu carrito está vacío 🛒</p>";
        } else {
            let total = 0;
            carrito.forEach((item, index) => {
                total += item.precio * item.cantidad;
                carritoContainer.innerHTML += `
                    <div class="carrito-item">
                        <p><strong>${item.nombre}</strong> (${item.categoria}, ${item.tipo})</p>
                        <p>Cantidad: ${item.cantidad}</p>
                        <p>Precio: $${item.precio.toLocaleString()}</p>
                        <p>Subtotal: $${(item.precio * item.cantidad).toLocaleString()}</p>
                        <button class="eliminar-item" data-index="${index}">❌ Eliminar</button>
                        <hr>
                    </div>
                `;
            });

            carritoContainer.innerHTML += `<h3>Total: $${total.toLocaleString()}</h3>`;
        }

        // Manejo de eliminar producto
        document.querySelectorAll(".eliminar-item").forEach(boton => {
            boton.addEventListener("click", () => {
                let carrito = getCarrito();
                carrito.splice(boton.dataset.index, 1);
                saveCarrito(carrito);
                location.reload(); // recarga para actualizar vista
            });
        });
    }
});
