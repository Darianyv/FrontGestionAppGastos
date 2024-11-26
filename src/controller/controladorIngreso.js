import { registrarIngreso,buscarIngresos } from "../services/servicioIngreso.js";

// Obtén los valores de los campos
let strDescripcionIngreso = document.getElementById("strDescripcionIngreso");
let dateFechaIngreso = document.getElementById("dateFechaIngreso");
let intValorIngreso = document.getElementById("intValorIngreso");

let botonIngreso=document.getElementById("GuardarIngreso")

botonIngreso.addEventListener("click",function(evento){
    evento.preventDefault()

    let objetoEnvioIngreso={

        strDescripcionIngreso: strDescripcionIngreso.value,
        dateFechaIngreso: dateFechaIngreso.value,
        intValorIngreso: parseInt(intValorIngreso.value) 

    }

    registrarIngreso(objetoEnvioIngreso)
})

buscarIngresos().then(function(respuesta){
    //2. Recorrer el arreglo de datos del back
let fila=document.getElementById("fila")
respuesta.forEach(function(ingreso){
    
    //2.1 TRAVERSING
    let columna=document.createElement("div")
    columna.classList.add("col")

    let tarjeta=document.createElement("div")
    tarjeta.classList.add("card","h-100","p-5","shadow")

    let nombrecard=document.createElement("h3")
    nombrecard.textContent=ingreso.nombres

    //2.2 Se asocian las creaciones
    tarjeta.appendChild(nombrecard)
    columna.appendChild(tarjeta)
    fila.appendChild(columna)

})
})

