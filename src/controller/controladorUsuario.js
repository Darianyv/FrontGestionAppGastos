// //Objetivo recoger los datos de un formulario
// //Utilizando JS

// //1. A cada input, select, textarea  del form le creo una variable
// //le creo una variable asociada al ID del HTML

// let nameUser=document.getElementById("nameRegister")
// let birthDate=document.getElementById("birthDateRegister")
// let userLocation=document.getElementById("userLocationRegister")
// let savings=document.getElementById("savingGoalRegister")

// //2. Se crea una variable para asociarla con el boton de formulario
// let buttonRegister=document.getElementById("buttonRegister")

// //3. Se detecta el click del boton del formulario
// buttonRegister.addEventListener("click",function(event){

//     event.preventDefault()
// //4. Se construye un objeto con los datos del formulario
//     let objetoEnvioDatosUsuario={
        
//         strNombre:nameUser.value,
//         dateFechaNacimiento:birthDate.value,
//         strUbicacion:userLocation.value,
//         intMetaAhorro:savings.value
//     }

//     console.log(objetoEnvioDatosUsuario)
    

// })

// //OBJETIVO: Renderizar datos que vienen del back

// //1. Se queman los datos (MOCK)

// let usuarios=[
//     {id:20,strNombre:"Yone",dateFechaNacimiento:17-11-1996,intMetaAhorro:20000000},
//     {id:21,strNombre:"Mario",dateFechaNacimiento:17-10-1996,intMetaAhorro:15000000},
//     {id:22,strNombre:"Ana",dateFechaNacimiento:17-12-1996,intMetaAhorro:40000000}
// ]

// //2. Recorrer el arreglo de datos del Back
// let fila=document.getElementById("fila")
// usuarios.forEach(function(usuario){

//     console.log(usuario)
//     //2.1 Traversing
//     let columna=document.createElement("div")
//     columna.classList.add("col")

//     let tarjeta=document.createElement("div")
//     tarjeta.classList.add("card","h-100","p-5","shadow")
    
//     let nombrecard=document.createElement("h3")
//     nombrecard.textContent=usuario.strNombre
    
//     //2.2 Se asocian las creaciones
//     tarjeta.appendChild(nombrecard)
//     columna.appendChild(tarjeta)
//     fila.appendChild(columna)


// }
// )


// 1. A cada input, select, textarea del form le creo una variable

// Variables para los campos de registro
import { buscarUsuario } from "../../services/servicioUsuario.js";
import { registrarUsuario } from "../../services/servicioUsuario.js";



let nameUser = document.getElementById("nameRegister");
let birthDate = document.getElementById("birthDateRegister");
let userLocation = document.getElementById("userLocationRegister");
let savings = document.getElementById("savingGoalRegister");

// Variable para el botón de registro
let buttonRegister = document.getElementById("buttonRegister");

// Mostrar y ocultar formularios de registro e inicio de sesión
let showRegisterForm = document.getElementById("showRegisterForm");
let hideRegisterForm = document.getElementById("hideRegisterForm");
let registerFormContainer = document.getElementById("registerFormContainer");
let loginFormContainer = document.getElementById("loginFormContainer");

showRegisterForm.addEventListener("click", function(event) {
    event.preventDefault();
    registerFormContainer.classList.remove("d-none");
    loginFormContainer.classList.add("d-none");
});

hideRegisterForm.addEventListener("click", function(event) {
    event.preventDefault();
    registerFormContainer.classList.add("d-none");
    loginFormContainer.classList.remove("d-none");
});

// 3. Detectar clic en el botón de registro
buttonRegister.addEventListener("click", function(event) {
    event.preventDefault();
    
    // 4. Crear objeto con los datos del formulario
    let objetoEnvioDatosUsuario = {
        strNombre: nameUser.value,
        dateFechaNacimiento: birthDate.value,
        strUbicacion: userLocation.value,
        intMetaAhorro: parseInt(savings.value, 10)
    };
    
    console.log("Datos del usuario registrado:", objetoEnvioDatosUsuario);
});

// OBJETIVO: Renderizar datos que vienen del back

buscarUsuario().then(function(respuesta){
    console.log(respuesta)
})

let usuarios = [

];

// Renderizar usuarios en la sección con ID 'fila'
let fila=document.getElementById("fila");
usuarios.forEach(function(usuario) {
    console.log("Usuario:", usuario);

    let columna = document.createElement("div");
    columna.classList.add("col");

    let tarjeta = document.createElement("div");
    tarjeta.classList.add("card", "h-100", "p-5", "shadow");

    let nombrecard = document.createElement("h3");
    nombrecard.textContent = usuario.strNombre;

    let fechaNacimientoCard = document.createElement("p");
    fechaNacimientoCard.textContent = `Fecha de Nacimiento: ${usuario.dateFechaNacimiento}`;

    let metaAhorroCard = document.createElement("p");
    metaAhorroCard.textContent = `Meta de Ahorro: $${usuario.intMetaAhorro.toLocaleString()}`;

    // Asociar elementos
    tarjeta.appendChild(nombrecard);
    tarjeta.appendChild(fechaNacimientoCard);
    tarjeta.appendChild(metaAhorroCard);
    columna.appendChild(tarjeta);
    fila.appendChild(columna);
    
});

