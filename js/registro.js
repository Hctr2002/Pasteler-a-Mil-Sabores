document.getElementById("registro-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const direccion = document.getElementById("direccion").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Recuperar lista de usuarios ya guardados
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar que el correo no esté ya registrado
    const existe = usuarios.some(u => u.email === email);
    if (existe) {
        alert("Ya existe una cuenta con este correo.");
        return;
    }

    // Crear objeto usuario
    const nuevoUsuario = { nombre, apellido, direccion, email, password };

    // Guardar en la lista
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
    window.location.href = "login.html"; // Redirigir al login
});
