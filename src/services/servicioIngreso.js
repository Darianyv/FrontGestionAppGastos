export async function buscarIngreso() {
    const URL = "http://localhost:8000/ingresos";
    try {
        const respuesta = await fetch(URL, { method: "GET" });
        if (!respuesta.ok) throw new Error("No se pudo obtener la información de los ingresos.");
        return await respuesta.json();
    } catch (error) {
        console.error("Error al buscar los ingresos:", error);
        alert("Error al buscar los ingresos. Intenta más tarde.");
    }
}

export async function registrarIngreso(datosIngreso) {
    const URL = "http://localhost:8000/ingreso";

    try {
        const respuesta = await fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosIngreso),
        });

        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
        }

        return await respuesta.json(); // Devuelve la respuesta para mostrar un mensaje o actualizar la interfaz
    } catch (error) {
        console.error("Error al registrar el ingreso:", error);
        throw error; // Permite manejar el error en el controlador
    }
}


