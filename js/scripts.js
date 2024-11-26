

// Mostrar el formulario de registro y ocultar el de inicio de sesión
document.getElementById("showRegisterForm").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("loginFormContainer").classList.add("d-none");
    document.getElementById("registerFormContainer").classList.remove("d-none");
});

// Mostrar el formulario de inicio de sesión y ocultar el de registro
document.getElementById("hideRegisterForm").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("registerFormContainer").classList.add("d-none");
    document.getElementById("loginFormContainer").classList.remove("d-none");
});

document.getElementById('loader').classList.add('d-none');
let formLogin = document.getElementById("loginForm");

formLogin.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto de enviar el formulario

    let email = document.getElementById("emailLogin").value;
    let password = document.getElementById("passwordLogin").value;

    if (!email || !password) {
        console.error("Ambos campos son obligatorios.");
        return;
    }

    let loginData = {
        strEmail: email,
        strContraseña: password
    };

    iniciarSesion(loginData)
        .then(response => {
            console.log("Inicio de sesión exitoso:", response);
            // Redirigir o mostrar mensaje de éxito
            showNotification("Inicio de sesión exitoso.", "success");
        })
        .catch(error => {
            console.error("Error al iniciar sesión:", error);
            // Mostrar mensaje de error
            document.getElementById("loginError").style.display = "block";
        });
});

