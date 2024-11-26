// Importa las funciones necesarias del servicio
import { guardarGasto, buscarGasto } from "../services/servicioGastos.js";

document.addEventListener("DOMContentLoaded", async () => {
    const buttonGuardarGastos = document.getElementById("GuardarGastos");
    const contenedorGastos = document.getElementById("contenedorGastos");

    // Asigna el evento al botón de guardar gastos
    if (buttonGuardarGastos) {
        buttonGuardarGastos.addEventListener("click", handleGuardarGasto);
    } else {
        console.error("El botón GuardarGastos no se encontró en el DOM.");
    }

    // Carga los gastos al cargar la página
    await cargarGastos(contenedorGastos);
});

// Maneja el evento de clic del botón GuardarGastos
async function handleGuardarGasto(event) {
    event.preventDefault();

    // Obtiene los valores de los campos del formulario
    const descripcion = document.getElementById("strDescripcionGastos").value;
    const categoria = document.getElementById("strCategoriaGastos").value;
    const fecha = document.getElementById("dateFechaGastos").value;
    const valor = parseInt(document.getElementById("intValorGastos").value, 10);

    // Valida los campos del formulario
    if (!validateFields(descripcion, categoria, fecha, valor)) {
        alert("Todos los campos son obligatorios y el valor debe ser mayor a cero.");
        return;
    }

    const datosGasto = {
        strDescripcionGastos: descripcion,
        strCategoriaGastos: categoria,
        dateFechaGastos: fecha,
        intValorGastos: valor,
    };

    // Intenta guardar el gasto
    try {
        const respuesta = await guardarGasto(datosGasto);
        if (respuesta) {
            alert("Gasto registrado exitosamente.");
            document.getElementById("formGastos").reset();
            await cargarGastos(document.getElementById("contenedorGastos"));
        }
    } catch (error) {
        console.error("Error al guardar el gasto:", error);
        alert("Error al guardar el gasto. Intenta nuevamente.");
    }
}

// Carga y renderiza los gastos en el contenedor
async function cargarGastos(contenedor) {
    try {
        const gastos = await buscarGasto();
        contenedor.innerHTML = ""; // Limpia el contenido previo
        if (gastos.length === 0) {
            contenedor.innerHTML = `<p>No hay gastos registrados.</p>`;
            return;
        }

        // Renderiza cada gasto
        gastos.forEach((gasto) => {
            const card = document.createElement("div");
            card.className = "col-md-4 mb-3";
            card.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${gasto.strDescripcionGastos}</h5>
                        <p class="card-text">Categoría: ${gasto.strCategoriaGastos}</p>
                        <p class="card-text">Fecha: ${new Date(gasto.dateFechaGastos).toLocaleDateString()}</p>
                        <p class="card-text">Valor: $${gasto.intValorGastos}</p>
                    </div>
                </div>
            `;
            contenedor.appendChild(card);
        });
    } catch (error) {
        console.error("Error al cargar los gastos:", error);
        contenedor.innerHTML = `<p>Error al cargar los gastos. Intenta más tarde.</p>`;
    }
}

// Valida los campos del formulario
function validateFields(descripcion, categoria, fecha, valor) {
    return descripcion && categoria && fecha && !isNaN(valor) && valor > 0;
}
