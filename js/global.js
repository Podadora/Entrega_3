// Centrado de Body
const cuerpo = document.body;
cuerpo.style.textAlign = "center";
cuerpo.style.backgroundColor = '#c2c2c2';
//asignacion Titulo
const titulo = document.getElementById('titulo');
// Carrito
let carrito = [];

// Nav bar
const cabecera = document.getElementById('header');
const navegacion = document.createElement('navbar');
const nav = document.createElement('nav');
const ul = document.createElement('ul');


cabecera.appendChild(navegacion);
navegacion.appendChild(nav);
nav.appendChild(ul);
navegacion.className = 'navbar';

const links = ["Index", "Productos", "Contacto"];

// Generacion de navegacion

for (const link of links) {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${link.toLowerCase()}.html" >${link}</a>`
    ul.appendChild(li);
}