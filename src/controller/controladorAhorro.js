import { guardarAhorro, buscarAhorro } from "../services/servicioAhorro";

document.addEventListener("DOMContentLoaded", async () => {
    const formAhorro = document.getElementById("formAhorro");
    const botonAhorro = document.getElementById("GuardarAhorro");
    const contenedorAhorros = document.getElementById("contenedorAhorros");

    // Función para mostrar los ahorros en el DOM
    async function mostrarAhorros() {
        // Verifica que el contenedor existe
        if (!contenedorAhorros) {
            console.error("El contenedor de ahorros no se encontró en el DOM.");
            return;
        }

        try {
            const ahorros = await buscarAhorro(); // Asegúrate de que el servicio está correctamente implementado
            contenedorAhorros.innerHTML = ""; // Limpia el contenido previo

            if (ahorros.length === 0) {
                contenedorAhorros.innerHTML = `
                    <p class="text-center">No se encontraron ahorros registrados.</p>
                `;
                return;
            }

            // Genera el HTML para cada ahorro
            ahorros.forEach((ahorro) => {
                const ahorroHTML = `
                    <div class="col-md-4">
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">${ahorro.strConceptoAhorro}</h5>
                                <p class="card-text">Fecha: ${new Date(ahorro.dateFechaAhorro).toLocaleDateString()}</p>
                                <p class="card-text">Valor: $${ahorro.intValorAhorro.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                `;
                contenedorAhorros.innerHTML += ahorroHTML;
            });
        } catch (error) {
            console.error("Error al mostrar los ahorros:", error);
        }
    }

    // Manejador de eventos para guardar ahorro
    if (botonAhorro) {
        botonAhorro.addEventListener("click", async (evento) => {
            evento.preventDefault();

            // Obtiene los valores del formulario
            const datosAhorro = {
                strConceptoAhorro: document.getElementById("strConceptoAhorro").value.trim(),
                dateFechaAhorro: document.getElementById("dateFechaAhorro").value,
                intValorAhorro: parseInt(document.getElementById("intValorAhorro").value, 10),
            };

            // Validación de los datos
            if (!datosAhorro.strConceptoAhorro || !datosAhorro.dateFechaAhorro || isNaN(datosAhorro.intValorAhorro) || datosAhorro.intValorAhorro <= 0) {
                alert("Por favor, complete todos los campos correctamente.");
                return;
            }

            try {
                const respuesta = await guardarAhorro(datosAhorro);
                if (respuesta) {
                    alert("Ahorro registrado exitosamente.");
                    formAhorro.reset(); // Limpia el formulario
                    await mostrarAhorros(); // Actualiza la lista de ahorros
                } else {
                    alert("No se pudo registrar el ahorro. Intenta nuevamente.");
                }
            } catch (error) {
                console.error("Error al registrar el ahorro:", error);
                alert("Ocurrió un error al registrar el ahorro. Intenta nuevamente.");
            }
        });
    } else {
        console.error("El botón de guardar ahorro no se encontró en el DOM.");
    }

    // Carga inicial de ahorros al cargar la página
    await mostrarAhorros();
});

// Función para mostrar los ahorros de forma similar al ejemplo que me diste
function mostrarDatos(tipo) {
    const contenedores = {
        ahorros: "contenedorAhorros"
    };

    const contenedorId = contenedores[tipo];
    if (!contenedorId) return;

    // Muestra el contenedor correspondiente
    const contenedor = document.getElementById(contenedorId);
    contenedor.classList.remove("d-none");

    // Agrega datos simulados
    contenedor.innerHTML = `
        <div class="card m-2">
            <div class="card-body">
                <h5 class="card-title">Ejemplo Ahorro</h5>
                <p class="card-text">Descripción: Este es un ejemplo de ahorro</p>
                <p class="card-text">Valor: $100</p>
            </div>
        </div>
    `;
}

// Eventos para cada botón
document.getElementById("GuardarAhorro").addEventListener("click", () => mostrarDatos("ahorros"));
