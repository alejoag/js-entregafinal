function simuladorCarrito() {
    const itemA = parseInt(prompt("Ingresa cuántas unidades del Item A compras: "));
    const itemB = parseInt(prompt("Ingresa cuántas unidades del Item B compras: "));
    const itemC = parseInt(prompt("Ingresa cuántas unidades del Item C compras: "));

    const precioA = 45;
    const precioB = 10;
    const precioC = 20;

    let totalitemA = 0;
    let totalitemB = 0;
    let totalitemC = 0;

    const totalProductos = itemA + itemB + itemC;

    // Calcular el total para el Item A
    for (let i = 0; i < itemA; i++) {
        totalitemA += precioA;
    }

    // Calcular el total para el Item B
    for (let i = 0; i < itemB; i++) {
        totalitemB += precioB;
    }

    // Calcular el total para el Item C
    for (let i = 0; i < itemC; i++) {
        totalitemC += precioC;
    }

    const precioTotal = totalitemA + totalitemB + totalitemC;
    let aplicarDescuento = false;
    let precioFinal;

    if (totalProductos >= 10) {
        precioFinal = precioTotal - (precioTotal * 0.25);
        aplicarDescuento = true;
    } else {
        precioFinal = precioTotal;
    }

    // Mostrar el resultado
    console.log("Total a pagar por el Item A: $" + totalitemA);
    console.log("Total a pagar por el Item B: $" + totalitemB);
    console.log("Total a pagar por el Item C: $" + totalitemC);
    console.log("Importe total de la compra: $" + precioTotal);

    if (aplicarDescuento) {
        console.log("Descuento aplicado: 25%");
        console.log("Importe total a pagar con descuento: $" + precioFinal);
    } else {
        console.log("No se aplican descuentos");
    }
}

// Llamada a la función
simuladorCarrito();
