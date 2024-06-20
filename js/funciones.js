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

/////////////Funcion para calcular y mostrar los gastos

function calculoGastos(){
    const divCarrito = document.createElement('footer');
    divCarrito.id = "resultado";
    cuerpo.appendChild(divCarrito);
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


function modificacionLista (){
    const nuevoMain = document.createElement('main')
    cuerpo.appendChild(nuevoMain);
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
    cuerpo.appendChild(botonSalirAdmin);
    botonSalirAdmin.onclick = () =>{
        nuevoMain.remove();
        divProductos.innerHTML = '';
        cuerpo.appendChild(divProductos);
        botonSalirAdmin.remove();
        muestraProductos();
        cuerpo.appendChild(botonCompra);
        cuerpo.appendChild(botonAdmin);
        tituloProductos.innerText = "Lista de Productos";
    }

    
}