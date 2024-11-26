import { guardarCategoria, buscarCategoria } from "../services/servicioCategoria";

document.addEventListener("DOMContentLoaded", async () => {
    const formCategoria = document.getElementById("formCategoria");
    const botonCategoria = document.getElementById("GuardarCategoria");
    const contenedorCategorias = document.getElementById("contenedorCategorias");

    // Función para mostrar las categorías en el DOM
    async function mostrarCategorias() {
        // Verifica que el contenedor existe
        if (!contenedorCategorias) {
            console.error("El contenedor de categorías no se encontró en el DOM.");
            return;
        }

        try {
            const categorias = await buscarCategoria(); // Asegúrate de que la API está bien implementada
            contenedorCategorias.innerHTML = ""; // Limpia el contenido previo

            if (categorias.length === 0) {
                contenedorCategorias.innerHTML = `
                    <p class="text-center">No se encontraron categorías registradas.</p>
                `;
                return;
            }

            // Genera el HTML para cada categoría
            categorias.forEach((categoria) => {
                const categoriaHTML = `
                    <div class="col-md-4">
                        <div class="card mb-3">
                            <img src="${categoria.strFotoCategoria}" class="card-img-top" alt="${categoria.strNombreCategoria}">
                            <div class="card-body">
                                <h5 class="card-title">${categoria.strNombreCategoria}</h5>
                                <p class="card-text">${categoria.strDescripcionCategoria}</p>
                            </div>
                        </div>
                    </div>
                `;
                contenedorCategorias.innerHTML += categoriaHTML;
            });
        } catch (error) {
            console.error("Error al mostrar las categorías:", error);
        }
    }

    // Manejador de eventos para guardar categoría
    if (botonCategoria) {
        botonCategoria.addEventListener("click", async (evento) => {
            evento.preventDefault();

            // Obtiene los valores del formulario
            const datosCategoria = {
                strNombreCategoria: document.getElementById("strNombreCategoria").value.trim(),
                strDescripcionCategoria: document.getElementById("strDescripcionCategoria").value.trim(),
                strFotoCategoria: document.getElementById("strFotoCategoria").value.trim(),
            };

            // Validación de los datos
            if (!datosCategoria.strNombreCategoria || !datosCategoria.strDescripcionCategoria || !datosCategoria.strFotoCategoria) {
                alert("Por favor, complete todos los campos correctamente.");
                return;
            }

            try {
                const respuesta = await guardarCategoria(datosCategoria);
                if (respuesta) {
                    alert("Categoría registrada exitosamente.");
                    formCategoria.reset(); // Limpia el formulario
                    await mostrarCategorias(); // Actualiza la lista de categorías
                } else {
                    alert("No se pudo registrar la categoría. Intenta nuevamente.");
                }
            } catch (error) {
                console.error("Error al registrar la categoría:", error);
                alert("Ocurrió un error al registrar la categoría. Intenta nuevamente.");
            }
        });
    } else {
        console.error("El botón de guardar categoría no se encontró en el DOM.");
    }

    // Carga inicial de categorías al cargar la página
    await mostrarCategorias();
});
