import { registrarIngreso, buscarIngreso } from "../services/servicioIngreso.js";

document.addEventListener("DOMContentLoaded", async () => {
    const formIngreso = document.getElementById("formIngreso");
    const botonIngreso = document.getElementById("GuardarIngreso");
    const contenedorIngresos = document.getElementById("contenedorIngresos");

    // Función para mostrar los ingresos en el DOM
    async function mostrarIngresos() {
        // Verifica que el contenedor existe
        if (!contenedorIngresos) {
            console.error("El contenedor de ingresos no se encontró en el DOM.");
            return;
        }

        try {
            const ingresos = await buscarIngreso(); // Asegúrate de que el servicio está correctamente implementado
            contenedorIngresos.innerHTML = ""; // Limpia el contenido previo

            if (ingresos.length === 0) {
                contenedorIngresos.innerHTML = `
                    <p class="text-center">No se encontraron ingresos registrados.</p>
                `;
                return;
            }

            // Genera el HTML para cada ingreso
            ingresos.forEach((ingreso) => {
                const ingresoHTML = `
                    <div class="col-md-4">
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">${ingreso.strDescripcionIngreso}</h5>
                                <p class="card-text">Fecha: ${new Date(ingreso.dateFechaIngreso).toLocaleDateString()}</p>
                                <p class="card-text">Valor: $${ingreso.intValorIngreso.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                `;
                contenedorIngresos.innerHTML += ingresoHTML;
            });
        } catch (error) {
            console.error("Error al mostrar los ingresos:", error);
        }
    }

    // Manejador de eventos para guardar ingreso
    if (botonIngreso) {
        botonIngreso.addEventListener("click", async (evento) => {
            evento.preventDefault();

            // Obtiene los valores del formulario
            const datosIngreso = {
                strDescripcionIngreso: document.getElementById("strDescripcionIngreso").value.trim(),
                dateFechaIngreso: document.getElementById("dateFechaIngreso").value,
                intValorIngreso: parseInt(document.getElementById("intValorIngreso").value, 10),
            };

            // Validación de los datos
            if (!datosIngreso.strDescripcionIngreso || !datosIngreso.dateFechaIngreso || isNaN(datosIngreso.intValorIngreso) || datosIngreso.intValorIngreso <= 0) {
                alert("Por favor, complete todos los campos correctamente.");
                return;
            }

            try {
                const respuesta = await registrarIngreso(datosIngreso);
                if (respuesta) {
                    alert("Ingreso registrado exitosamente.");
                    formIngreso.reset(); // Limpia el formulario
                    await mostrarIngresos(); // Actualiza la lista de ingresos
                } else {
                    alert("No se pudo registrar el ingreso. Intenta nuevamente.");
                }
            } catch (error) {
                console.error("Error al registrar el ingreso:", error);
                alert("Ocurrió un error al registrar el ingreso. Intenta nuevamente.");
            }
        });
    } else {
        console.error("El botón de guardar ingreso no se encontró en el DOM.");
    }

    // Carga inicial de ingresos al cargar la página
    await mostrarIngresos();
});
