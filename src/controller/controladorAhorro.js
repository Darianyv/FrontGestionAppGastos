// Importa las funciones necesarias del servicio
import { guardarAhorro, buscarAhorro } from "../services/servicioAhorro";

// Función principal que se ejecuta cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    const buttonGuardarAhorro = document.getElementById("GuardarAhorro");

    if (buttonGuardarAhorro) {
        buttonGuardarAhorro.addEventListener("click", handleGuardarAhorro);
    } else {
        console.error("El botón GuardarAhorro no se encontró en el DOM.");
    }

    // Llama a la función para mostrar los ahorros al cargar la página
    mostrarAhorros();
});

// Maneja el evento de clic del botón GuardarAhorro
async function handleGuardarAhorro(event) {
    event.preventDefault();

    // Obtiene los valores de los campos del formulario
    const concepto = document.getElementById("strConceptoAhorro").value;
    const fecha = document.getElementById("dateFechaAhorro").value;
    const valor = parseInt(document.getElementById("intValorAhorro").value, 10);

    // Valida los campos del formulario
    if (!validateFields(concepto, fecha, valor)) {
        alert("Todos los campos son obligatorios y el valor debe ser mayor a cero.");
        return;
    }

    const datosAhorro = {
        strConceptoAhorro: concepto,
        dateFechaAhorro: fecha,
        intValorAhorro: valor,
    };

    // Intenta guardar el ahorro y manejar errores si ocurren
    try {
        const respuesta = await guardarAhorro(datosAhorro);
        if (respuesta) {
            alert("Ahorro registrado exitosamente.");
            document.getElementById("formAhorro").reset(); // Limpia el formulario
            mostrarAhorros(); // Actualiza la lista de ahorros
        }
    } catch (error) {
        console.error("Error al guardar el ahorro:", error);
        alert("Error al guardar el ahorro. Intenta nuevamente.");
    }
}

// Función para mostrar los ahorros en el contenedor
async function mostrarAhorros() {
    const contenedorAhorros = document.getElementById("contenedorAhorros");

    // Verifica que el contenedor existe
    if (!contenedorAhorros) {
        console.error("El contenedor de ahorros no se encontró en el DOM.");
        return;
    }

    try {
        const ahorros = await buscarAhorro();
        contenedorAhorros.classList.remove("d-none"); // Muestra el contenedor si estaba oculto
        contenedorAhorros.innerHTML = ""; // Limpia el contenido anterior

        ahorros.forEach((ahorro) => {
            const ahorroHTML = `
                <div class="col-md-4">
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">${ahorro.strConceptoAhorro}</h5>
                            <p class="card-text">Fecha: ${ahorro.dateFechaAhorro}</p>
                            <p class="card-text">Valor: $${ahorro.intValorAhorro}</p>
                        </div>
                    </div>
                </div>
            `;
            contenedorAhorros.innerHTML += ahorroHTML;
        });
    } catch (error) {
        console.error("Error al mostrar los ahorros:", error);
        alert("Error al mostrar los ahorros. Intenta más tarde.");
    }
}

// Valida los campos del formulario
function validateFields(concepto, fecha, valor) {
    return concepto && fecha && !isNaN(valor) && valor > 0;
}
