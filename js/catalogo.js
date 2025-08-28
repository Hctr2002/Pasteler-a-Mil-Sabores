function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito!");
}

// Ejemplo de uso:
document.querySelector("#btn-chocolate").addEventListener("click", () => {
    agregarAlCarrito({
        nombre: "Pastel de Chocolate",
        categoria: "Chocolate",
        tipo: "Redondo",
        tamano: "10/12 Personas",
        extras: "Sin Extras",
        precio: 29990
    });
});
