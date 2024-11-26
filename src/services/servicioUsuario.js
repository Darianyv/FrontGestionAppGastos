export async function buscarUsuario(){
    //1. Para donde voy /URL Servicio
    const URL="http://localhost:8000/usuario"
    //2. ¿Que se va hacer? / Configuracion de peticion
    let peticiones = {
        method: "GET"
    };

    try {
        let respuestaInicial = await fetch(URL, peticiones);
        if (!respuestaInicial.ok) {
            throw new Error("No se pudo obtener la información de los usuarios.");
        }
        let respuestaFinal = await respuestaInicial.json();
        return respuestaFinal;
    } catch (error) {
        console.error("Error al buscar usuario:", error);
        // Manejo del error, como mostrar un mensaje al usuario
        alert("Error al buscar los usuarios. Intenta más tarde.");
    }
}
export async function registrarUsuario(datosUsuario) {
    const URL = "http://localhost:8000/usuario";
    let peticiones = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosUsuario)
    };

    try {
        let respuestaInicial = await fetch(URL, peticiones);
        if (!respuestaInicial.ok) {
            throw new Error("No se pudo registrar el usuario.");
        }
        let respuestaFinal = await respuestaInicial.json();
        console.log(respuestaFinal);
        return respuestaFinal; // Puedes devolver la respuesta para utilizarla en la UI
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        // Manejo del error, como mostrar un mensaje al usuario
        alert("Error al registrar el usuario. Intenta más tarde.");
    }
}
export async function iniciarSesion(credenciales) {
    const URL = "http://localhost:8000/login";
    let peticiones = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credenciales),
    };

    try {
        let respuestaInicial = await fetch(URL, peticiones);
        if (!respuestaInicial.ok) {
            throw new Error("Credenciales incorrectas. Intenta nuevamente.");
        }
        let respuestaFinal = await respuestaInicial.json();
        return respuestaFinal; // Retorna el token de acceso
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Error al iniciar sesión. Verifica tus datos.");
    }
}
