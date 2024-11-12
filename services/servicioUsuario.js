export async function buscarUsuario(){
    //1. Para donde voy /URL Servicio
    const URL="http://localhost:8000/usuario"


    //2. ¿QUe se va hacer? / Configuracion de peticion
let peticiones={
    method:"GET"

}
    //3. Ingrese / Consuma el API
    let respuestaInicial=await fetch(URL,peticiones)
    let respuestaFinal=await respuestaInicial.json()
    return(respuestaFinal)

}
export async function registrarUsuario(datosUsuario) {
    const URL="http://localhost:8000/usuario"
    let peticiones={
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(datosUsuario)

    }
    let respuestaInicial=await fetch(URL,peticiones)
    let respuestaFinal=await respuestaInicial.json()

    console.log(respuestaFinal)

}
