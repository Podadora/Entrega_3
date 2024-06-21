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
const botonCompra = crearBoton("Comprar");
espacioBotonCompra.appendChild(botonCompra);
cuerpo.appendChild(espacioBotonCompra);

// Boton Admin
const espacioBotonAdmin = document.createElement('h3');
const botonAdmin = crearBoton("Admin Mode");
espacioBotonAdmin.appendChild(botonAdmin);
cuerpo.appendChild(espacioBotonAdmin);

//BotonCompra OnClick
botonCompra.onclick= () => {
    cartSave('Carrito', JSON.stringify(carrito));
    botonAdmin.remove();
};

//BotonAdmin OnClick
botonAdmin.onclick= () => {
    botonAdmin.remove();
    divProductos.remove();
    botonCompra.remove();
    adminMode();
};

/////////////Constructor productos para carrito

class Producto {
    constructor(cantidad, nombre, precio, code) {
        this.cantidad = cantidad;
        this.nombre = nombre;
        this.precio = precio;
        this.code = code;
    }
}
