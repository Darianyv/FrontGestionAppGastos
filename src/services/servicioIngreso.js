export async function buscarIngresos(){
    //1. PA ONDE VOY / URL SERVICIO
    const URL="http://localhost:8000/ingresos"
    //2 A HACER QUE OME / CONF PETICION
    let peticion={
        method:"GET"
    }
    //3. VAYA PS OME / CONSUMA EL API
    let respuestaInicial=await fetch(URL,peticion)
    let respuestaFinal=await respuestaInicial.json()
    return(respuestaFinal)
}

export async function registrarIngreso(datosIngreso) {
    const URL = "http://localhost:8000/ingreso";
    let peticion = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosIngreso),
    };
    try {
        let respuestaInicial = await fetch(URL, peticion);
        if (!respuestaInicial.ok) {
            throw new Error(`Error: ${respuestaInicial.status} ${respuestaInicial.statusText}`);
        }
        let respuestaFinal = await respuestaInicial.json();
        console.log(respuestaFinal);
    } catch (error) {
        console.error("Error en registrarIngreso:", error);
    }
}

