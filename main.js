let productos = [];

// Cargar productos desde el archivo JSON
async function cargarProductos() {
    try {
        const response = await fetch('productos.json');
        if (!response.ok) throw new Error('Error al cargar los productos');
        productos = await response.json();
    } catch (error) {
        console.error(error);
        sweetAlertError('No se pudieron cargar los productos. Intenta de nuevo más tarde.');
    }
}

// Función para mostrar un SweetAlert de error
function sweetAlertError(mensaje) {
    swal({
        title: "Error",
        text: mensaje,
        icon: "error",
        button: "Aceptar",
    });
}

// Función para mostrar un SweetAlert de éxito
function sweetAlertSuccess(mensaje) {
    swal({
        title: "Éxito",
        text: mensaje,
        icon: "success",
        button: "Aceptar",
    });
}

// Función para calcular el total por cada producto
function calcularTotalProducto(unidades, precio) {
    return unidades * precio;
}

// Guardar en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Recuperar del localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : { itemA: 0, itemB: 0, itemC: 0 };
}

// Función para limpiar el carrito
function limpiarCarrito() {
    // Reiniciar los valores a cero
    document.getElementById("itemA").value = 0;
    document.getElementById("itemB").value = 0;
    document.getElementById("itemC").value = 0;

    // Limpiar el localStorage
    localStorage.removeItem('carrito');

    // Limpiar el contenido de los resultados
    document.getElementById("resultado").innerHTML = '';

    // Mostrar mensaje de éxito
    sweetAlertSuccess("El carrito ha sido limpiado.");
}

// Función del carrito
function simuladorCarrito() {
    const itemA = parseInt(document.getElementById("itemA").value) || 0;
    const itemB = parseInt(document.getElementById("itemB").value) || 0;
    const itemC = parseInt(document.getElementById("itemC").value) || 0;

    // Validar entradas
    if (itemA <= 0 && itemB <= 0 && itemC <= 0) {
        sweetAlertError("Debes agregar al menos un producto al carrito.");
        return;
    }

    // Guardar las cantidades en el carrito (en localStorage)
    const carrito = { itemA, itemB, itemC };
    guardarCarrito(carrito);

    // Calcular el total de cada producto
    const totalItemA = calcularTotalProducto(itemA, obtenerPrecio('Item A'));
    const totalItemB = calcularTotalProducto(itemB, obtenerPrecio('Item B'));
    const totalItemC = calcularTotalProducto(itemC, obtenerPrecio('Item C'));

    // Calcular totales
    const totalProductos = itemA + itemB + itemC;
    const precioTotal = totalItemA + totalItemB + totalItemC;

    let precioFinal = precioTotal;
    let aplicarDescuento = false;

    // Aplicar descuento si el total de productos es mayor o igual a 10
    if (totalProductos >= 10) {
        precioFinal -= (precioFinal * 0.25);
        aplicarDescuento = true;
    }

    // Mostrar los resultados
    mostrarResultado(totalItemA, totalItemB, totalItemC, precioTotal, aplicarDescuento, precioFinal);
    sweetAlertSuccess("Carrito actualizado con éxito.");
}

// Función para obtener el precio de un producto
function obtenerPrecio(nombre) {
    const producto = productos.find(producto => producto.nombre === nombre);
    return producto ? producto.precio : 0;
}

// Función para mostrar los resultados
function mostrarResultado(totalItemA, totalItemB, totalItemC, precioTotal, aplicarDescuento, precioFinal) {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `
        <p>Total a pagar por el Item A: $${totalItemA}</p>
        <p>Total a pagar por el Item B: $${totalItemB}</p>
        <p>Total a pagar por el Item C: $${totalItemC}</p>
        <p>Importe total de la compra: $${precioTotal}</p>
        ${aplicarDescuento 
            ? `<p>Descuento aplicado: 25%</p><p>Importe total a pagar con descuento: $${precioFinal}</p>` 
            : `<p>No se aplican descuentos</p>`}
    `;
}

// Cargar los valores del carrito desde localStorage al cargar la página
function cargarValoresIniciales() {
    const carrito = cargarCarrito();
    document.getElementById("itemA").value = carrito.itemA;
    document.getElementById("itemB").value = carrito.itemB;
    document.getElementById("itemC").value = carrito.itemC;
}

// Event listener para el botón de calcular total
document.getElementById("calcularTotal").addEventListener("click", simuladorCarrito);

// Event listener para el botón de limpiar carrito
document.getElementById("limpiarCarrito").addEventListener("click", limpiarCarrito);

// Cargar productos y valores iniciales al cargar la página
window.addEventListener("load", async () => {
    await cargarProductos();
    cargarValoresIniciales();
});
