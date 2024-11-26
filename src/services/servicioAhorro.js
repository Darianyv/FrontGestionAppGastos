export async function guardarAhorro(datosAhorro) {
    const URL = "http://localhost:8000/ahorro";  // Verifica que esta ruta sea correcta
    const peticiones = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosAhorro),
    };

    try {
        const respuestaInicial = await fetch(URL, peticiones);
        if (!respuestaInicial.ok) {
            throw new Error("No se pudo registrar el ahorro.");
        }
        const respuestaFinal = await respuestaInicial.json();
        return respuestaFinal;
    } catch (error) {
        console.error("Error al guardar el ahorro:", error);
        alert("Error al guardar el ahorro. Intenta más tarde.");
    }
}

export async function buscarAhorro() {
    const URL = "http://localhost:8000/ahorros";  // Verifica que esta ruta sea correcta
    const peticiones = {
        method: "GET",
    };

    try {
        const respuestaInicial = await fetch(URL, peticiones);
        if (!respuestaInicial.ok) {
            throw new Error("No se pudo obtener la información de los ahorros.");
        }
        const respuestaFinal = await respuestaInicial.json();
        return respuestaFinal;
    } catch (error) {
        console.error("Error al buscar los ahorros:", error);
        alert("Error al buscar los ahorros. Intenta más tarde.");
    }
}

