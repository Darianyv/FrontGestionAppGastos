// Servicio para guardar un gasto
export async function guardarGasto(datosGasto) {
    const URL = "http://localhost:8000/gasto";
    const peticiones = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosGasto),
    };

    try {
        const respuestaInicial = await fetch(URL, peticiones);
        if (!respuestaInicial.ok) {
            throw new Error("No se pudo registrar el gasto.");
        }
        const respuestaFinal = await respuestaInicial.json();
        return respuestaFinal;
    } catch (error) {
        console.error("Error al guardar el gasto:", error);
        alert("Error al guardar el gasto. Intenta más tarde.");
    }
}

// Servicio para buscar los gastos
export async function buscarGasto() {
    const URL = "http://localhost:8000/gasto";
    const peticiones = {
        method: "GET",
    };

    try {
        const respuestaInicial = await fetch(URL, peticiones);
        if (!respuestaInicial.ok) {
            throw new Error("No se pudo obtener la información de los gastos.");
        }
        const respuestaFinal = await respuestaInicial.json();
        return respuestaFinal;
    } catch (error) {
        console.error("Error al buscar los gastos:", error);
        alert("Error al buscar los gastos. Intenta más tarde.");
    }
}
