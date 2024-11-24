window.onload = function() {
    const token = localStorage.getItem('access_token');
    if (!token) {
        const newLocal = "../views/index.html";
        window.location.href = newLocal; // Redirigir a la página de login si no hay token
    } else {
        // Lógica para mostrar la información del perfil
    }
}
