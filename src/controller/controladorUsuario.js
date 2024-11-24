import { buscarUsuario, registrarUsuario, iniciarSesion } from "../../services/servicioUsuario.js";
import { showNotification } from "../../js/notificaciones.js";


const buttonRegister = document.getElementById("buttonRegister");
const nameUser = document.getElementById("nameUser");
const birthDate = document.getElementById("birthDate");
const userLocation = document.getElementById("userLocation");
const savings = document.getElementById("savings");
const email = document.getElementById("email");
const password = document.getElementById("password");

// Mostrar y ocultar formularios de registro e inicio de sesión
let showRegisterForm = document.getElementById("showRegisterForm");
let hideRegisterForm = document.getElementById("hideRegisterForm");
let registerFormContainer = document.getElementById("registerFormContainer");
let loginFormContainer = document.getElementById("loginFormContainer");
let loginError = document.getElementById("loginError");


// Manejo de inicio de sesión

buttonLogin.addEventListener("click", async function(event) {
    event.preventDefault(); // Prevenir el envío por defecto del formulario

    if (!emailLogin.value || !passwordLogin.value) {
        console.error("Ambos campos son obligatorios.");
        alert("Por favor, completa ambos campos.");
        return;
    }

    let credenciales = {
        email: emailLogin.value,
        password: passwordLogin.value,
    };

    try {
        const respuesta = await iniciarSesion(credenciales);
        if (respuesta.access_token) {
            localStorage.setItem("access_token", respuesta.access_token);
            alert("Inicio de sesión exitoso.");
            window.location.href = "../views/login.html"; // Redirigir a la página de perfil
        }
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        loginError.style.display = "block"; // Mostrar mensaje de error
    }
});

// Registro de usuario
buttonRegister.addEventListener("click", async (event) => {
    event.preventDefault();

    if (!nameUser.value || !birthDate.value || !userLocation.value || isNaN(parseInt(savings.value, 10))) {
        showNotification("Todos los campos son obligatorios y la meta de ahorro debe ser un número.", "danger");
        return;
    }

    const datosUsuario = {
        strNombre: nameUser.value,
        dateFechaNacimiento: birthDate.value,
        strUbicacion: userLocation.value,
        intMetaAhorro: parseInt(savings.value, 10),
    };

    try {
        const response = await registrarUsuario(datosUsuario);
        if (response.success) {
            showNotification("Usuario registrado correctamente.", "success");
        } else {
            showNotification("Hubo un problema al registrar al usuario.", "danger");
        }
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        showNotification("Error al registrar usuario.", "danger");
    }
});

buttonRegister.addEventListener("click", async (event) => {
    console.log("Button clicked");
    try {
        console.log("Datos enviados:", datosUsuario);
        const response = await registrarUsuario(datosUsuario);
        console.log("Respuesta recibida:", response);
    } catch (error) {
        console.error("Error detectado:", error);
    }
});
// Obtener y renderizar usuarios
(async () => {
    try {
        const usuarios = await buscarUsuario();

        const fila = document.getElementById("fila");
        if (!fila) {
            console.error("El contenedor 'fila' no se encuentra en el DOM.");
            return;
        }

        usuarios.forEach((usuario) => {
            const columna = document.createElement("div");
            columna.classList.add("col");

            const tarjeta = document.createElement("div");
            tarjeta.classList.add("card", "h-100", "p-5", "shadow");

            tarjeta.innerHTML = `
                <h3>${usuario.strNombre}</h3>
                <p>Fecha de Nacimiento: ${usuario.dateFechaNacimiento}</p>
                <p>Meta de Ahorro: $${usuario.intMetaAhorro.toLocaleString()}</p>
            `;

            columna.appendChild(tarjeta);
            fila.appendChild(columna);
        });
    } catch (error) {
        console.error("Error al buscar usuarios:", error);
        showNotification("Error al cargar usuarios.", "danger");
    }
})();