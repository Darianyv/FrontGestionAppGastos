import { registrarGasto, buscarGasto } from "../../services/servicioGastos.js";

// Elementos del formulario
const formGastos = document.getElementById("formGastos");
const strDescripcionGastos = document.getElementById("strDescripcionGastos");
const strCategoriaGastos = document.getElementById("strCategoriaGastos");
const dateFechaGastos = document.getElementById("dateFechaGastos");
const intValorGastos = document.getElementById("intValorGastos");
const contenedorGastos = document.getElementById("contenedorGastos");

// Función para manejar el registro de gastos
const btnGuardarGasto = document.getElementById("GuardarGastos");

btnGuardarGasto.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevenir comportamiento por defecto
    
    // Aquí puedes reutilizar el código para validar y registrar el gasto
    if (
        !strDescripcionGastos.value.trim() ||
        !strCategoriaGastos.value.trim() ||
        !dateFechaGastos.value ||
        isNaN(parseInt(intValorGastos.value, 10)) ||
        parseInt(intValorGastos.value, 10) <= 0
    ) {
        alert("Todos los campos son obligatorios y el valor debe ser mayor a 0.");
        return;
    }

    const datosGasto = {
        strDescripcionGastos: strDescripcionGastos.value.trim(),
        strCategoriaGastos: strCategoriaGastos.value.trim(),
        dateFechaGastos: dateFechaGastos.value,
        intValorGastos: parseInt(intValorGastos.value, 10),
    };

    try {
        const resultado = await registrarGasto(datosGasto);
        alert("Gasto registrado exitosamente.");
        formGastos.reset(); // Limpia el formulario
        cargarGastos(); // Actualiza la lista de gastos
    } catch (error) {
        console.error("Error al registrar el gasto:", error);
        alert("Ocurrió un error al registrar el gasto. Por favor, inténtalo más tarde.");
    }
});


// Función para cargar y renderizar todos los gastos
async function cargarGastos() {
    try {
        const gastos = await buscarGasto();
        contenedorGastos.innerHTML = ""; // Limpiar el contenedor antes de renderizar
        gastos.forEach((gasto) => renderGasto(gasto));
    } catch (error) {
        console.error("Error al cargar los gastos:", error);
        alert("Error al cargar los gastos. Intenta más tarde.");
    }
}

// Función para renderizar un gasto en la interfaz
function renderGasto(gasto) {
    const item = document.createElement("div");
    item.classList.add("gasto-item", "card", "mb-3");
    item.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${gasto.strDescripcionGastos}</h5>
            <p class="card-text">Categoría: ${gasto.strCategoriaGastos}</p>
            <p class="card-text">Fecha: ${gasto.dateFechaGastos}</p>
            <p class="card-text">Valor: $${gasto.intValorGastos.toLocaleString()}</p>
            <button class="btn btn-warning btn-sm" onclick="editarGasto(${gasto.id})">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="eliminarGasto(${gasto.id})">Eliminar</button>
        </div>
    `;
    contenedorGastos.appendChild(item);
}

// Función para editar un gasto (opcional, requiere implementación)
async function editarGasto(id) {
    // Aquí puedes abrir un modal o formulario prellenado para editar el gasto
    alert(`Función para editar gasto con ID: ${id} (por implementar).`);
}

// Función para eliminar un gasto (opcional, requiere implementación)
async function eliminarGasto(id) {
    const confirmar = confirm("¿Estás seguro de que deseas eliminar este gasto?");
    if (!confirmar) return;

    try {
        // Llama a tu servicio de eliminación (a implementar)
        await eliminarGastoServicio(id);
        alert("Gasto eliminado exitosamente.");
        cargarGastos(); // Recarga la lista de gastos
    } catch (error) {
        console.error("Error al eliminar el gasto:", error);
        alert("No se pudo eliminar el gasto. Intenta nuevamente.");
    }
}

// Cargar gastos al inicializar la página
document.addEventListener("DOMContentLoaded", cargarGastos);
