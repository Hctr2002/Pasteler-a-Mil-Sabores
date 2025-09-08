document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('form[data-screen="catalogo-filtros"]');
    const pastelesList = document.querySelector('ul.grid[data-test-id="catalogo-pasteles"]');
    const pasteles = Array.from(pastelesList.querySelectorAll("li"));

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        // Leer filtros seleccionados
        const categorias = Array.from(form.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.id.toLowerCase());
        const tipo = form.querySelector('#tipo-pastel').value.toLowerCase();

        pasteles.forEach(li => {
            const articulo = li.querySelector("article");
            const meta = articulo.querySelector(".meta")?.textContent.toLowerCase() || "";

            let mostrar = true;

            // Filtrar por categoría
            if (categorias.length > 0) {
                mostrar = categorias.some(cat => meta.includes(cat));
            }

            // Filtrar por tipo (select)
            if (mostrar && tipo && tipo !== "seleccione una opción") {
                mostrar = meta.includes(tipo);
            }

            li.style.display = mostrar ? "" : "none";
        });
    });
});