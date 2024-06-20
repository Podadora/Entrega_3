/////////////Centrado Body
const cuerpoProductos = document.body;
cuerpoProductos.style.textAlign = "center";

/////////////Cambio de titulo
const tituloProductos = document.getElementById('titulo');
tituloProductos.innerText = "Lista de Productos";

///////////// declaracion variable de precios base

let carrito = [];
let productos = [
    {
        descripcion: 'Queso',
        precio: 200,
        codigo: 1,
        
    },
    {
        descripcion: 'Leche',
        precio: 220,
        codigo: 2,
    },
    {
        descripcion: 'Yogurth',
        precio: 300,
        codigo: 3,

    },
    {
        descripcion: 'Yerba',
        precio: 330,
        codigo: 4,

    },
    {
        descripcion: 'Pan',
        precio: 500,
        codigo: 5,

    },
    {
        descripcion: 'Helado',
        precio: 870,
        codigo: 6,

    },
    {
        descripcion: 'Fideos',
        precio: 160,
        codigo: 7,

    },
    {
        descripcion: 'Jamon',
        precio: 450,
        codigo: 8,
    },
]

///////////// Muestra de Productos
const divProductos = document.createElement('main');
cuerpoProductos.appendChild(divProductos);
muestraProductos();


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
    const botonMas = document.createElement('button');
    botonMas.style.width = '2rem';
    botonMas.onclick = () => {
        let valor1 = document.getElementById(codigo);
        valor1.value ++;
    };
    botonMas.textContent = '+';
    divProductos.appendChild(botonMas);


// Input
    const input = document.createElement('input');
    input.style.width = '2rem';
    input.id = codigo;
    input.value = 0;
    divProductos.appendChild(input);


// Botones Menos
    const botonMenos = document.createElement('button');
    botonMenos.style.width = '2rem';
    botonMenos.onclick = () => {
        valor1 = document.getElementById(codigo);
        if (valor1.value <= 0 ){
            alert("Cantidad no puede ser menor a 0!");
            valor1.value = 0;
        }
        else
            valor1.value --;
    };
    botonMenos.textContent = '-';
    divProductos.appendChild(botonMenos);
}

// Boton Compra
const espacioBotonCompra = document.createElement('h2');
const botonCompra = document.createElement('button');
botonCompra.style.width = '4rem';
botonCompra.textContent = 'Comprar';
espacioBotonCompra.appendChild(botonCompra);
cuerpoProductos.appendChild(espacioBotonCompra);

// Boton Admin
const espacioBotonAdmin = document.createElement('h3');
const botonAdmin = document.createElement('button');
botonAdmin.textContent = 'Admin Mode';
espacioBotonAdmin.appendChild(botonAdmin);
cuerpoProductos.appendChild(espacioBotonAdmin);

//BotonCompra OnClick

botonCompra.onclick= () => {
    carrito = [];
    const limpiarResultado = document.getElementById ("resultado");
    limpiarResultado.remove();
    calculoGastos();
    botonAdmin.remove();

};

//BotonAdmin OnClick

botonAdmin.onclick= () => {
    botonAdmin.remove();
    divProductos.remove();
    botonCompra.remove();
    adminMode();
};

/////////////Funcion para calcular y mostrar los gastos

function calculoGastos(){
    const divCarrito = document.createElement('footer');
    divCarrito.id = "resultado";
    cuerpoProductos.appendChild(divCarrito);
    let gastos = 0;
    for (const product of productos){
        let as = document.getElementById(product.codigo);
        if (as.value > 0) {
            carrito.push(new Producto(as.value, product.descripcion, product.precio));
            gastos = product.precio * as.value + gastos;

        }
    }


    for (const compras of carrito) {
        const divCompras = document.createElement('p')
        divCompras.innerHTML = ` ${compras.nombre} -- Precio: $${compras.precio} // Cantidad: ${compras.cantidad} Subtotal : $${compras.precio*compras.cantidad}`;    
        divCarrito.appendChild(divCompras);
    }
    const gastoTotal = document.createElement('p');
    gastoTotal.innerHTML = `El total de su compra seria : $${gastos}`;
    divCarrito.appendChild(gastoTotal);
}

/////////////Funcion para loguear como admin

function adminMode(){

    tituloProductos.innerText = "Ingrese Usuario y Contraseña"
    const user = document.createElement('input');
    const pass = document.createElement('input');
    const aceptar = document.createElement('button');
    aceptar.style.width = '4rem';
    aceptar.textContent = "Aceptar";

    cuerpoProductos.appendChild(user);
    cuerpoProductos.appendChild(pass);
    cuerpoProductos.appendChild(aceptar);

    aceptar.onclick = () => {
        if (user.value == "admin" && pass.value == "admin"){
            modificacionLista();
            aceptar.remove();
            user.remove();
            pass.remove();
            tituloProductos.innerText = "Modificacion de Precios";

        }else alert("Datos incorrectos ( es admin admin)");
    }
}
/////////////Funcion para operar como admin

function modificacionLista (){
    const nuevoMain = document.createElement('main')
    cuerpoProductos.appendChild(nuevoMain);
    for (const variables of productos){
        
        const botonModificar = document.createElement('button');
        botonModificar.innerText = "Modificar";
        
        const botonEliminar = document.createElement('button');
        botonEliminar.innerText = ("Eliminar")
        
        const divisorProductos = document.createElement('p');
        const codigo = document.createElement('input');
        const precio = document.createElement('input');
        const descripcion = document.createElement('input');
        codigo.value = variables.codigo;
        precio.value = variables.precio;
        descripcion.value = variables.descripcion;
        console.log(variables.codigo);
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
    // Configuacion Boton salir Admin
    const botonSalirAdmin = document.createElement('button');
    botonSalirAdmin.innerText = "Salir Admin";
    cuerpoProductos.appendChild(botonSalirAdmin);
    botonSalirAdmin.onclick = () =>{
        nuevoMain.remove();
        divProductos.innerHTML = '';
        cuerpoProductos.appendChild(divProductos);
        botonSalirAdmin.remove();
        muestraProductos();
        cuerpoProductos.appendChild(botonCompra);
        cuerpoProductos.appendChild(botonAdmin);
        tituloProductos.innerText = "Lista de Productos";
    }

    
}

/////////////Constructor productos para carrito

class Producto {
    constructor(cantidad, nombre, precio) {
        this.cantidad = cantidad;
        this.nombre = nombre;
        this.precio = precio;
    }
}
