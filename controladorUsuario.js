//Objetivo recoger los datos de un formulario
//Utilizando JS

//1. A cada input, select, textarea  del form le creo una variable
//le creo una variable asociada al ID del HTML

let nameUser=document.getElementById("nameRegister")
let birthDate=document.getElementById("birthDateRegister")
let location=document.getElementById("locationRegister")
let savings=document.getElementById("savingGoalRegister")

//2. Se crea una variable para asociarla con el boton de formulario
let buttonRegister=document.getElementById("buttonRegister")

//3. Se detecta el click del boton del formulario
buttonRegister.addEventListener("click",function(event){

    event.preventDefault()
//4. Se construye un objeto con los datos del formulario
    let objetoEnvioDatosUsuario={
        
        strNombre:nameUser.value,
        dateFechaNacimiento:birthDate.value,
        strUbicacion:location.value,
        intMetaAhorro:savings.value
    }

    console.log(objetoEnvioDatosUsuario)
    

})

