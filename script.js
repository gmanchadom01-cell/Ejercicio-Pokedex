
const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";

const imgElement = document.getElementById("image");
const nameElement = document.getElementById("name");
const numberElement = document.getElementById("number");
const heightElement = document.getElementById("height");
const weightElement = document.getElementById("weight");
const typesElement = document.getElementById("types");
const button1Element = document.getElementById("btnCargar");
const inputElement = document.getElementById("pokemonName");
const button2Element = document.getElementById("btnBuscar");
const mensajeElement = document.getElementById("mensaje");


async function fetchData(url) {

    try {

        mensajeElement.innerText = "Cargando...";

        let response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Pokemon no encontrado`);
        }

        let data = await response.json();

        imgElement.src = data.sprites.front_default;

        // Mostrar nombre e identificador
        nameElement.innerText = data.name;
        numberElement.innerText = `#${data.id}`;

        // Mostrar altura y peso
        heightElement.innerText = `Altura: ${data.height / 10} m`;
        weightElement.innerText = `Peso: ${data.weight / 10} kg`;

        // Mostrar tipos
        typesElement.innerHTML = "";

        mensajeElement.innerText = "";

        let types = data.types;

        types.forEach((element) => {

            let newButton = document.createElement("button");

            newButton.classList.add(element.type.name);
            newButton.innerText = element.type.name;

            typesElement.appendChild(newButton);

        });

    } catch (error) {

        mensajeElement.innerText = "No se ha encontrado el Pokémon";

        console.error(error);

    }

}

// Generar número aleatorio
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Cargar Pokémon al pulsar el botón
button1Element.addEventListener("click", () => {

    let number = getRandomNumber(1, 152);

    fetchData(`${pokeAPI}${number}`);

});

button2Element.addEventListener("click", () => {

    let nombre = inputElement.value.trim().toLowerCase();

    // Comprobar si el campo está vacío
    if (nombre === "") {

        mensajeElement.innerText = "Es necesario introducir un nombre";

    } else {

        fetchData(`${pokeAPI}${nombre}`);

    }

});

// MI PRIMERA POKEDEX

const listaElement = document.getElementById("listaPokemon");
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

// URL inicial
const urlInicial = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";

let urlSiguiente = null;
let urlAnterior = null;

// Cargar lista de Pokémon
async function cargarLista(url) {

    try {

        let response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error al cargar los Pokémon");
        }

        let data = await response.json();

        // Vaciar la lista anterior
        listaElement.innerHTML = "";

        // Recorrer los resultados
        data.results.forEach((pokemon) => {

            let nuevoPokemon = document.createElement("li");

            let enlace = document.createElement("a");

            enlace.href = pokemon.url;
            enlace.innerText = pokemon.name;
            enlace.target = "_blank";

            nuevoPokemon.appendChild(enlace);

            listaElement.appendChild(nuevoPokemon);

        });

        // Guardar las URLs de navegación
        urlSiguiente = data.next;
        urlAnterior = data.previous;

        // Mostrar u ocultar botones
        btnSiguiente.style.display = urlSiguiente ? "block" : "none";
        btnAnterior.style.display = urlAnterior ? "block" : "none";

    } catch (error) {

        console.error(error);

    }

}

// Botón siguiente
btnSiguiente.addEventListener("click", () => {

    if (urlSiguiente) {
        cargarLista(urlSiguiente);
    }

});

// Botón anterior
btnAnterior.addEventListener("click", () => {

    if (urlAnterior) {
        cargarLista(urlAnterior);
    }

});

// Cargar primeros 10 Pokémon
cargarLista(urlInicial);
/*Mi primera Pokedex
Objetivo: recorrer un array de resutados obtenido mediantes AJAX.
Endpoint: https://pokeapi.co/api/v2/pokemon?limit=10&offset=0

1. Añade un boton siguiente que obtendra los siguientes 10
2. Recorre el array results de la respuesta
4. Muestra los nombres en una lista HTML, con un elemento por Pokemon
5. Convierte cada nombre en un enlace que abraa la URL de detalle proporcionada por la API

Practicas: arrays, forEach(), listas y creacion de elementos HTML

Ampliacion: Implementar boton anterior que solo saldra si hay registros anteriores*/