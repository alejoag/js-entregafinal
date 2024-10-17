// Definimos los productos como objetos
const productos = [
    { nombre: 'Item A', precio: 45 },
    { nombre: 'Item B', precio: 10 },
    { nombre: 'Item C', precio: 20 }
];

// Usamos un método de búsqueda para obtener el producto por su atributo nombre
function obtenerProducto(nombre) {
    return productos.find(producto => producto.nombre === nombre);
}

// Función para calcular el total por cada producto
function calcularTotalProducto(unidades, producto) {
    return unidades * producto.precio;
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

// Funcion del carrito
function simuladorCarrito() {
    // Obtener valores desde los inputs
    const itemA = parseInt(document.getElementById("itemA").value) || 0;
    const itemB = parseInt(document.getElementById("itemB").value) || 0;
    const itemC = parseInt(document.getElementById("itemC").value) || 0;

    // Guardar las cantidades en el carrito (en localStorage)
    const carrito = { itemA, itemB, itemC };
    guardarCarrito(carrito);

    // Calcular el total de cada producto
    const totalItemA = calcularTotalProducto(itemA, obtenerProducto('Item A'));
    const totalItemB = calcularTotalProducto(itemB, obtenerProducto('Item B'));
    const totalItemC = calcularTotalProducto(itemC, obtenerProducto('Item C'));

    // Calcular totales
    const totalProductos = itemA + itemB + itemC;
    const precioTotal = totalItemA + totalItemB + totalItemC;

    let aplicarDescuento = false;
    let precioFinal;

    // Aplicar descuento si el total de productos es mayor o igual a 10
    if (totalProductos >= 10) {
        precioFinal = precioTotal - (precioTotal * 0.25);
        aplicarDescuento = true;
    } else {
        precioFinal = precioTotal;
    }

    // Mostrar los resultados
    mostrarResultado(totalItemA, totalItemB, totalItemC, precioTotal, aplicarDescuento, precioFinal);
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

// Event listener para el botón
document.getElementById("calcularTotal").addEventListener("click", simuladorCarrito);

// Cargar valores iniciales al cargar la página
window.addEventListener("load", cargarValoresIniciales);