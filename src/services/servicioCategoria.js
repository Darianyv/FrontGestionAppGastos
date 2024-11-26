export async function guardarCategoria(datosCategoria) {
    const URL = "http://localhost:8000/categoria";
    let peticiones = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosCategoria),
    };

    try {
        let respuestaInicial = await fetch(URL, peticiones);
        if (!respuestaInicial.ok) {
            throw new Error("No se pudo registrar la categoría.");
        }
        let respuestaFinal = await respuestaInicial.json();
        return respuestaFinal;
    } catch (error) {
        console.error("Error al guardar la categoría:", error);
        alert("Error al guardar la categoría. Intenta más tarde.");
    }
}

export async function buscarCategoria() {
    const URL = "http://localhost:8000/categorias";
    let peticiones = {
        method: "GET",
    };

    try {
        let respuestaInicial = await fetch(URL, peticiones);
        if (!respuestaInicial.ok) {
            throw new Error("No se pudo obtener la información de las categorías.");
        }
        let respuestaFinal = await respuestaInicial.json();
        return respuestaFinal;
    } catch (error) {
        console.error("Error al buscar las categorías:", error);
        alert("Error al buscar las categorías. Intenta más tarde.");
    }
}
