// Definimos los productos como objetos
const productos = [
    { nombre: 'Item A', precio: 45 },
    { nombre: 'Item B', precio: 10 },
    { nombre: 'Item C', precio: 20 }
];

// Usamos un metodo de busqueda para obtener el producto por su atributo nombre
function obtenerProducto(nombre) {
    return productos.find(producto => producto.nombre === nombre);
}

// Funcion para calcular el total por cada producto
function calcularTotalProducto(unidades, producto) {
    return unidades * producto.precio;
}

// Funcion del carrito (basado en la preentrega 1)
function simuladorCarrito() {
    const itemA = parseInt(document.getElementById("itemA").value);
    const itemB = parseInt(document.getElementById("itemB").value);
    const itemC = parseInt(document.getElementById("itemC").value);

    const totalItemA = calcularTotalProducto(itemA, obtenerProducto('Item A'));
    const totalItemB = calcularTotalProducto(itemB, obtenerProducto('Item B'));
    const totalItemC = calcularTotalProducto(itemC, obtenerProducto('Item C'));

    const totalProductos = itemA + itemB + itemC;
    const precioTotal = totalItemA + totalItemB + totalItemC;

    let aplicarDescuento = false;
    let precioFinal;

    if (totalProductos >= 10) {
        precioFinal = precioTotal - (precioTotal * 0.25);
        aplicarDescuento = true;
    } else {
        precioFinal = precioTotal;
    }

    mostrarResultado(totalItemA, totalItemB, totalItemC, precioTotal, aplicarDescuento, precioFinal);
}

// Funcion para mostrar los resultados
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

// Event listener para el botón
document.getElementById("calcularTotal").addEventListener("click", simuladorCarrito);

