// Centrado Body
const cuerpoContacto = document.body;
cuerpoContacto.style.textAlign = "center";

//Tomo dato titulo
const tituloContacto = document.getElementById('titulo');
tituloContacto.innerText = "Contacto";

// generacion de DIVs para descripcion de contacto

const divContacto = document.createElement('div');
divContacto.id = "datos";
cuerpoContacto.appendChild(divContacto);
const datosContacto =  ["Nombre : Matias Omar Garcia", "Direccion : Calle Siempre Viva 123", "1163589911"];

for (const datos of datosContacto){
    const li = document.createElement('li')
    li.innerHTML = `${datos}` ;
    cuerpoContacto.appendChild(li);
}






