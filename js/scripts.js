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

