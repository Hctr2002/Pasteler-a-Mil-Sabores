// util: leer y guardar carrito
function getCarrito() {
    return JSON.parse(localStorage.getItem("carrito") || "[]");
}
function saveCarrito(c) {
    localStorage.setItem("carrito", JSON.stringify(c));
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form[data-screen='detalle-config']");
    if (!form) return;

    const article = form.closest("article");
    const productId = article?.dataset.id || "SIN_ID";
    const nombre = article.querySelector(".nombre-pastel")?.textContent.trim() || "Pastel sin nombre";
    const categoria = article.querySelector(".nombre-categoria")?.textContent.trim() || "Categoría desconocida";

    // precios por tamaño (ajústalos a tu realidad)
    const preciosPorTamano = {
        "6/8": 19990,
        "10/12": 25990,
        "14/16": 29990,
        "18/20": 34990
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const tipo = document.getElementById("tipo-pastel").value;
        const tamano = document.getElementById("tamano-pastel").value;
        const extrasSel = document.getElementById("extras");
        const extrasArr = Array.from(extrasSel.selectedOptions).map(o => o.value);

        const precio = preciosPorTamano[tamano] ?? 29990;

        // clave única por variante (id + tipo + tamaño + extras)
        const varianteKey = `${productId}|${tipo}|${tamano}|${extrasArr.sort().join("+")}`;

        const producto = {
        id: varianteKey,
        baseId: productId,
        nombre,
        categoria,
        tipo,
        tamano: `${tamano} Personas`,
        extras: extrasArr.length ? extrasArr.join(", ") : "Ninguno",
        precio,
        cantidad: 1
        };

        const carrito = getCarrito();
        const idx = carrito.findIndex(p => p.id === producto.id);

        if (idx >= 0) {
        carrito[idx].cantidad += 1;
        } else {
        carrito.push(producto);
        }

        if (`${tamano}` === "Seleccione una opción" || `${tipo}` === "Seleccione una opción" ) {
            alert("Por favor, selecciona una opción válida.");
            return;
        }else {
            saveCarrito(carrito);
            alert("Producto agregado al carrito ✅");
        }

        
    });

    const precioSpan = article.querySelector(".precio-pastel");
    const tamanoSelect = document.getElementById("tamano-pastel");
    if (precioSpan && tamanoSelect) {
        tamanoSelect.addEventListener("change", () => {
            const tamano = tamanoSelect.value;
            const precio = preciosPorTamano[tamano] ?? 19990;
            precioSpan.textContent = `$${precio.toLocaleString()}`;
        });
    }

});
