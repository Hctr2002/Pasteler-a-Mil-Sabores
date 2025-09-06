document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementById("editar-perfil");
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (!usuario) {
        alert("No hay sesión activa");
        window.location.href = "login.html";
        return;
    }

    // Crear formulario con los datos actuales
    main.innerHTML = `
        <h2>Editar perfil</h2>
        <form id="form-editar-perfil">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" value="${usuario.nombre || ""}" required>
            
            <label for="apellido">Apellido:</label>
            <input type="text" id="apellido" name="apellido" value="${usuario.apellido || ""}" required>
            
            <label for="direccion">Dirección:</label>
            <input type="text" id="direccion" name="direccion" value="${usuario.direccion || ""}" required>
            
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" value="${usuario.email || ""}" required>
            
            <button type="submit">Guardar cambios</button>
            <button type="button" id="cancelar-btn">Cancelar</button>
        </form>
        <div id="toast"></div>
    `;

    // Guardar cambios
    document.getElementById("form-editar-perfil").addEventListener("submit", function(e) {
        e.preventDefault();
        const nuevoUsuario = {
            ...usuario,
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            direccion: document.getElementById("direccion").value,
            email: document.getElementById("email").value
        };

        function mostrarToast(mensaje) {
            const toast = document.getElementById("toast");
            toast.textContent = mensaje;
            toast.classList.add("show");

            setTimeout(() => {
                toast.classList.remove("show");
            }, 3000);
        }

        // Actualizar en el array de usuarios
        const idx = usuarios.findIndex(u => u.email === usuario.email);
        if (idx !== -1) {
            usuarios[idx] = { ...usuarios[idx], ...nuevoUsuario };
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
        }

        // Actualizar usuario actual
        localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
        mostrarToast("Perfil actualizado correctamente");
    });

    // Cancelar edición
    document.getElementById("cancelar-btn").addEventListener("click", function() {
        window.location.href = "perfil.html";
    });
});