function muestraProductos(){
    for (const producto of productos){
        const li = document.createElement('li');
        li.innerHTML = `Nombre: ${producto.descripcion} -- Precio: $${producto.precio} // CODIGO: ${producto.codigo} `;    
        divProductos.appendChild(li);
        botonesCompra(producto.codigo);
    }
}


        /////////////Funcion para generar botones de productos
function botonesCompra (codigo){
    //Botones Mas
        const botonMas = crearBoton("+",2);
        botonMas.onclick = () => {
            limpiarDiv("resultado")
            sumarCarrito(codigo,1);
            calculoGastos();
        };
        divProductos.appendChild(botonMas);
    // Botones Menos
        const botonMenos = crearBoton("-",2);
        botonMenos.onclick = () => {
            limpiarDiv("resultado")
            const comparacion = carrito.find(t => t.code === codigo);
            !comparacion == undefined ? alert("Cantidad no puede ser menor a 0!") : restarCarrito(codigo,1);
            calculoGastos();
        };
        divProductos.appendChild(botonMenos);
}

/////////////Funcion agregar a carrito

function sumarCarrito (indice, cantidad){
    const productoASumar = productos.find(p => p.codigo === indice);
    const carritoItemSumar = carrito.find(itemSuma => itemSuma.code === indice);
    carritoItemSumar ? carritoItemSumar.cantidad += cantidad : carrito.push(new Producto(cantidad, productoASumar.descripcion, productoASumar.precio, productoASumar.codigo));
}
////////////Funcion restar carrito
function restarCarrito (indice, cantidad){
    const productoARestar = productos.find(q => q.codigo === indice);
    const carritoItemRestar = carrito.find(itemResta => itemResta.code === productoARestar.codigo);
    !carritoItemRestar ? alert("Cantidad no puede ser menor a 0") : carritoItemRestar && carritoItemRestar.cantidad == 1 ? ((carrito = carrito.filter(obj => obj.code !== productoARestar.codigo))) : carritoItemRestar.cantidad -= cantidad;
}


/////////////Funcion para guardar carrito a localStorage
const cartSave = (key,value) => {localStorage.setItem(key,value)}

/////////////Funcion para cargar carrito a localStorage

function cartLoad() {
    const cartData = localStorage.getItem('Carrito');
    return cartData ? JSON.parse(cartData) : [];
}

/////////////Funcion para calcular y mostrar los gastos

function calculoGastos(){
    const divCarrito = document.getElementById('resultado');
    cuerpo.appendChild(divCarrito);
    let gastos = 0;

    for (const compras of carrito) {
        const divCompras = document.createElement('p');
        divCompras.innerHTML = ` ${compras.nombre} -- Precio: $${compras.precio} // Cantidad: ${compras.cantidad} Subtotal : $${compras.precio*compras.cantidad}`;    
        divCarrito.appendChild(divCompras);
        gastos += (compras.precio*compras.cantidad);
    }
    const gastoTotal = document.createElement('p');
    gastoTotal.innerHTML = `El total de su compra seria : $${gastos}`;
    divCarrito.appendChild(gastoTotal);
}

/////////////Modificacion de Precios

function modificacionLista (){
    const nuevoMain = document.getElementById('main')
    for (const variables of productos){
        const botonModificar = crearBoton("Modificar");
        const botonEliminar = crearBoton("Eliminar");
        const divisorProductos = document.createElement('p');
        const codigo = crearInput("",4);
        const precio = crearInput("",4);
        const descripcion = crearInput("",4);
        codigo.value = variables.codigo;
        precio.value = variables.precio;
        descripcion.value = variables.descripcion;
        divisorProductos.appendChild(codigo);
        divisorProductos.appendChild(precio);
        divisorProductos.appendChild(descripcion);
        divisorProductos.appendChild(botonModificar);
        divisorProductos.appendChild(botonEliminar);
        divisorProductos.id = variables.codigo;
        nuevoMain.appendChild(divisorProductos);
// Configuacion Boton Modificar Item
        botonModificar.onclick = () => {
            const indexModificar = productos.findIndex(obj => obj.descripcion === variables.descripcion);
            if (indexModificar !== -1) {
                productos[indexModificar].codigo = codigo.value;
                productos[indexModificar].precio = precio.value;
                productos[indexModificar].descripcion = descripcion.value;
                alert("Modificacion Guardada correctamente");
            }
        }

        
// Configuacion Boton eliminar ITEM
        botonEliminar.onclick = () => {
            nuevoMain.remove();
            const indexBorrar = productos.findIndex(obj => obj.descripcion === variables.descripcion);
            if (indexBorrar !== -1) {
                productos.splice(indexBorrar, 1);
            }
            modificacionLista ();
        }
    }
    // Boton para agregar Items
    const botonAgregar = crearBoton("Agregar",4);
    cuerpo.appendChild(botonAgregar);
    botonAgregar.onclick = () => {
        const botonModificarNew = crearBoton("Modificar");
        botonModificarNew.disabled = true;
        const botonEliminarNew = crearBoton("Eliminar");
        const divisorProductos = document.createElement('p');
        const codigo = crearInput("",4);
        const precio = crearInput("",4);
        const descripcion = crearInput("",4);
        descripcion.disabled = true;
        precio.disabled = true;
        codigo.onchange  = () => {
            const nuevoProducto = productos.findIndex(c => c.codigo === parseInt(codigo.value));
            console.log(codigo.value)
            console.log(nuevoProducto)
            if (nuevoProducto !== -1){
                alert ("Codigo ya existe")
            }productos.push({
                descripcion: '',
                precio: 0,
                codigo: parseInt(codigo.value),
                })
                descripcion.disabled = false;
                precio.disabled = false;
                botonModificarNew.disabled = false;
        }
        botonModificarNew.onclick = () => {
            const productoAModificar = productos.findIndex(d => d.codigo === parseInt(codigo.value))
            productos[productoAModificar].descripcion = descripcion.value;
            productos[productoAModificar].precio = parseInt(precio.value);
            console.log(productos);
        }
        divisorProductos.appendChild(codigo);
        divisorProductos.appendChild(precio);
        divisorProductos.appendChild(descripcion);
        divisorProductos.appendChild(botonModificarNew);
        divisorProductos.appendChild(botonEliminarNew);
        nuevoMain.appendChild(divisorProductos);
        botonAgregar.disabled = true;
    }
    // Configuacion Boton salir Admin
    const botonSalirAdmin = crearBoton("Salir Admin");
    cuerpo.appendChild(botonSalirAdmin);
    botonSalirAdmin.onclick = () =>{
        limpiarDiv("main");
        divProductos.innerHTML = '';
        cuerpo.appendChild(divProductos);
        botonSalirAdmin.remove();
        botonAgregar.remove();
        muestraProductos();
        cuerpo.appendChild(botonCompra);
        cuerpo.appendChild(botonAdmin);
        tituloProductos.innerText = "Lista de Productos";
        limpiarDiv("resultado")
    }
}



function adminMode(){

    tituloProductos.innerText = "Ingrese Usuario y Contraseña"
    const user = crearInput("",4);
    const pass = crearInput("",4);
    const aceptar = crearBoton("Aceptar", 4);

    cuerpo.appendChild(user);
    cuerpo.appendChild(pass);
    cuerpo.appendChild(aceptar);

    aceptar.onclick = () => {
        if (user.value == "" && pass.value == ""){
            modificacionLista();
            aceptar.remove();
            user.remove();
            pass.remove();
            tituloProductos.innerText = "Modificacion de Precios";

        }else alert("Datos incorrectos ( es admin admin)");
    }
}

/////////////Funcion para crear botones
function crearBoton(texto,rem){
    const botonProvisorio = document.createElement('button')
    botonProvisorio.textContent = texto;
    botonProvisorio.style.width = rem + "rem";
    return botonProvisorio
}

function crearInput(texto,rem){
    const botonProvisorio = document.createElement('input')
    botonProvisorio.textContent = texto;
    botonProvisorio.style.width = rem + "rem";
    return botonProvisorio
}

function limpiarDiv(parametro){
    const limpiarDivision = document.getElementById (parametro);
    if (limpiarDivision) {limpiarDivision.innerHTML = ''; }
}