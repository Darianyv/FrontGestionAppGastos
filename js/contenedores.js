function mostrarDatos(tipo) {
    const contenedores = {
        gastos: "contenedorGastos",
        categorias: "contenedorCategorias",
        ingresos: "contenedorIngresos",
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
                <h5 class="card-title">Ejemplo ${tipo}</h5>
                <p class="card-text">Descripción: Este es un ejemplo de ${tipo}</p>
                <p class="card-text">Valor: $100</p>
            </div>
        </div>
    `;
}

// Eventos para cada botón
document.getElementById("GuardarGastos").addEventListener("click", () => mostrarDatos("gastos"));
document.getElementById("GuardarCategoria").addEventListener("click", () => mostrarDatos("categorias"));
document.getElementById("GuardarIngreso").addEventListener("click", () => mostrarDatos("ingresos"));
document.getElementById("GuardarAhorro").addEventListener("click", () => mostrarDatos("ahorros"));
