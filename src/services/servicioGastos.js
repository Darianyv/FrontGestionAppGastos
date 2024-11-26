// Servicio para manejar los gastos

// Función para buscar todos los gastos
export async function buscarGastos() {
    const URL = "http://127.0.0.1:8000/gasto";
    const peticiones = {
        method: "GET"
    };

    try {
        let respuestaInicial = await fetch(URL, peticiones);
        if (!respuestaInicial.ok) {
            throw new Error("No se pudo obtener la información de los gastos.");
        }
        let respuestaFinal = await respuestaInicial.json();
        return respuestaFinal; // Retorna la lista de gastos
    } catch (error) {
        console.error("Error al buscar gastos:", error);
        alert("Error al buscar los gastos. Intenta más tarde.");
    }
}

// Función para registrar un gasto
export async function registrarGasto(datosGasto) {
    const URL = "http://127.0.0.1:8000/gasto";
    const peticiones = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosGasto)
    };
    then(response => {
        if (!response.ok) {
            throw new Error(`Error en la respuesta: ${response.statusText}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error al registrar el gasto:', error);
    });

    try {
         let respuestaInicial = await fetch(URL, peticiones);
         if (!respuestaInicial.ok) {
             const errorInfo = await respuestaInicial.json(); // Captura la respuesta de error
             console.error("Detalles del error:", errorInfo);
             throw new Error(`Error ${respuestaInicial.status}: ${errorInfo.detail || "No se pudo registrar el gasto."}`);
         }
         let respuestaFinal = await respuestaInicial.json();
         console.log("Gasto registrado:", respuestaFinal);
         return respuestaFinal;
     } catch (error) {
         console.error("Error al registrar gasto:", error.message);
         alert(`Error al registrar el gasto: ${error.message}`);
     }
}

// Función para eliminar un gasto por su ID
export async function eliminarGasto(idGasto) {
    const URL = `http://localhost:8000/gasto/${idGasto}`;
    const peticiones = {
        method: "DELETE"
    };

    try {
        let respuestaInicial = await fetch(URL, peticiones);
        if (!respuestaInicial.ok) {
            throw new Error("No se pudo eliminar el gasto.");
        }
        console.log(`Gasto con ID ${idGasto} eliminado exitosamente.`);
        return { message: "Gasto eliminado exitosamente" };
    } catch (error) {
        console.error("Error al eliminar gasto:", error);
        alert("Error al eliminar el gasto. Intenta más tarde.");
    }
}
