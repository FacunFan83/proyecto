const msj_bienvenida = "Bienvenido al Carrito de Compras."
const mensaje1 = "Valor del Producto: $ 15.000. Ingrese la cantidad de articulos que desea agregar. Máximo 10 unidades"
const mensaje2 = "Ingrese la cantidad de cuotas en la que desea abonar. Máximo 12 cuotas"
const precio = 15000
let subtotalCompra
const listaArticulos = []
const carritoCompra = []

class Articulo {
    constructor (codigoArticulo, nombreArticulo, precioArticulo, categoriaArticulo, stockArticulo) {
        this.codigo = codigoArticulo;
        this.nombre = nombreArticulo;
        this.precio = precioArticulo;
        this.categoria = categoriaArticulo;
        this.stock = stockArticulo
        this.vendidos = 0
    }
    descargarStock(cantidad) {
        this.stock -= cantidad
    }
}

function bienvenida() {
    alert(msj_bienvenida)
    const articulo1 = new Articulo(1, "Producto 1", 15000, "Categoria A", 10)
    const articulo2 = new Articulo(12, "Producto 2", 8900, "Categoria A", 5)
    const articulo3 = new Articulo(15, "Producto 3", 12500, "Categoria B", 12)
    const articulo4 = new Articulo(21, "Producto 4", 7000, "Categoria A", 2)
    
    listaArticulos.push (articulo1)
    listaArticulos.push (articulo2)
    listaArticulos.push (articulo3)
    listaArticulos.push (articulo4)

    // console.log(listaArticulos)

}

function mostrarProductos() {
    // let repertir
    do {
        let elejirProducto = parseInt(prompt(construirMensaje()))
        const productoSeleccionado = listaArticulos.filter((qry) => qry.codigo === elejirProducto)
        if (elejirProducto === 0) {
            previsualizar()
            repetir = false
        } else if (productoSeleccionado.length === 0) {
            alert ("El producto elegido no existe o no hay Stock")
            repetir = true
        } else {
            cantidadCompra (productoSeleccionado[0])
            repetir = true
        }
    } while (repetir)
}

function cantidadCompra (obj) {
    // PREGUNTA AL USUARIO LA CANTIDAD DE ARTICULOS QUE QUIERE COMPRAR
    do {
        let cantidad = parseInt(prompt(`Ingrese una cantidad a comprar (maximo ${obj.stock} unidades)`))
        if (cantidad > 0 && cantidad <= obj.stock) {
            obj.descargarStock(cantidad)
            obj.vendidos = cantidad
            let existe = false
            let i
            for (i=0; i < carritoCompra.length; i++) {
                if (carritoCompra[i].codigo === obj.codigo) {
                    existe = true
                    break
                }
            }
            if (existe) {
                console.log(carritoCompra[i])
                carritoCompra[i].vendidos += cantidad
                console.log(carritoCompra[i].vendidos, cantidad)
            } else {
                carritoCompra.push (obj)
                console.log(obj.vendidos)
            }
            
            repertir = false
        } else {
            alert("Se ingresó una cantidad inválida")
            repertir = true
        }
    } while (repertir)

}

function construirMensaje()  {
    // CONSTRUYE MENSAJE CON LISTA DE PRODUCTOS CON STOCK
    let mensaje = "Seleccione un Articulo \n "
    for (const producto of listaArticulos) {
        if (producto.stock > 0) {
            mensaje += `Articulo (${producto.codigo}) - Producto: ${producto.nombre} \n Precio: $${producto.precio} \n `
        }
    }
    mensaje += "(0) Para finalizar compra"
    return mensaje
}


function previsualizar () {
    // mostrar en patanlla la compra para confirmar o modificar
    do {
        let opcion = parseInt(prompt(mensajePrevisualizar()))

        if (opcion === 1) {
            // CONFIRMACIÓN DE LA COMPRA
            repetir = false

        } else if (opcion === 2) {
            // MODIFICACIÓN DE LA COMPRA

            repetir = false
        } else {
            // INGRESO NO VÁLIDO
            repetir = true
        }
    } while (repetir)
}

function mensajePrevisualizar() {
    // DEFINIR EL MENSAJE CON LA LISTA DE PRODUCTOS SELECCIONADOS
    let mensaje = "Articulos Seleccionados: \n"
    for (const producto of carritoCompra) {
        let subtotal = producto.vendidos * producto.precio
        mensaje += `Producto ${producto.nombre} - Cantidad: ${producto.vendidos} - Subtotal: $${subtotal} \n`
    }
    mensaje += "Ingrese [1] para continuar - [2] para modificar"
    return mensaje
}



function cuotas() {
    do {
        let cantCuotas = parseInt(prompt(mensaje2))
        let cuotasValida = (cantCuotas > 0 && cantCuotas <= 12)
        if (cuotasValida) {
            let valorCuota = calcularCuotas(precio, cantCuotas)
            alert("Ud. deberá pagar "+cantCuotas+" cuotas de $ "+valorCuota)
            repetirBucle = false
        } else {repetirBucle = true}
    } while (repetirBucle)
}
function subtotal(cantidad, precio) {
    subtotalCompra = cantidad * precio
}

function calcularCuotas(precio, cuotas) {
    let valorCuota = subtotalCompra / cuotas
    return valorCuota
}
bienvenida()
mostrarProductos()
