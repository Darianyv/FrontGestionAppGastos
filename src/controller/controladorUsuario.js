import { buscarUsuario, registrarUsuario, iniciarSesion } from "../../services/servicioUsuario.js";
import { showNotification } from "../../js/notificaciones.js";


const buttonRegister = document.getElementById("buttonRegister");
const nameUser = document.getElementById("nameUser");
const birthDate = document.getElementById("birthDate");
const userLocation = document.getElementById("userLocation");
const savings = document.getElementById("savings");
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginError = document.getElementById("loginError");


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
    event.preventDefault(); // Prevenir comportamiento por defecto

    // Validación de campos
    if (
        !nameUser.value ||
        !birthDate.value ||
        !userLocation.value ||
        isNaN(parseInt(savings.value, 10)) ||
        !email.value ||
        !password.value
    ) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    // Crear el objeto de datos
    const datosUsuario = {
        strNombre: nameUser.value,
        dateFechaNacimiento: birthDate.value,
        strUbicacion: userLocation.value,
        intMetaAhorro: parseInt(savings.value, 10),
        strEmail: email.value,
        strContraseña: password.value,
    };

    try {
        const response = await fetch("http://localhost:8000/usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datosUsuario),
        });

        if (response.ok) {
            const data = await response.json();
            alert("Usuario registrado exitosamente.");
            document.getElementById("registerForm").reset(); // Limpiar formulario
        } else {
            const errorData = await response.json();
            alert("Error al registrar usuario: " + JSON.stringify(errorData));
        }
    } catch (error) {
        console.error("Error en el registro:", error);
        alert("Ocurrió un error al registrar al usuario.");
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