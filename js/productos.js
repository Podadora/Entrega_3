/////////////Cambio de titulo
const tituloProductos = document.getElementById('titulo');
tituloProductos.innerText = "Lista de Productos";

///////////// declaracion variable de precios base

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

///////////// Main de Muestra de Productos
const divProductos = document.createElement('main');
cuerpo.appendChild(divProductos);
muestraProductos();





// Boton Compra
const espacioBotonCompra = document.createElement('h2');
const botonCompra = document.createElement('button');
botonCompra.style.width = '4rem';
botonCompra.textContent = 'Comprar';
espacioBotonCompra.appendChild(botonCompra);
cuerpo.appendChild(espacioBotonCompra);

// Boton Admin
const espacioBotonAdmin = document.createElement('h3');
const botonAdmin = document.createElement('button');
botonAdmin.textContent = 'Admin Mode';
espacioBotonAdmin.appendChild(botonAdmin);
cuerpo.appendChild(espacioBotonAdmin);

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



/////////////Funcion para loguear como admin

function adminMode(){

    tituloProductos.innerText = "Ingrese Usuario y Contraseña"
    const user = document.createElement('input');
    const pass = document.createElement('input');
    const aceptar = document.createElement('button');
    aceptar.style.width = '4rem';
    aceptar.textContent = "Aceptar";

    cuerpo.appendChild(user);
    cuerpo.appendChild(pass);
    cuerpo.appendChild(aceptar);

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



/////////////Constructor productos para carrito

class Producto {
    constructor(cantidad, nombre, precio) {
        this.cantidad = cantidad;
        this.nombre = nombre;
        this.precio = precio;
    }
}
