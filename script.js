
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

        listaElement.innerHTML = "";

        data.results.forEach(async (pokemon) => {

            // Obtener los detalles de cada Pokémon
            let respuesta = await fetch(pokemon.url);
            let detalles = await respuesta.json();

            // Crear elementos HTML
            let nuevoPokemon = document.createElement("li");

            let enlace = document.createElement("a");
            enlace.href = pokemon.url;
            enlace.innerText = pokemon.name;
            enlace.target = "_blank";

            let imagen = document.createElement("img");
            imagen.src = detalles.sprites.front_default;
            imagen.alt = pokemon.name;

            let altura = document.createElement("p");
            altura.innerText = `Altura: ${detalles.height / 10} m`;

            let peso = document.createElement("p");
            peso.innerText = `Peso: ${detalles.weight / 10} kg`;

            // Introducir elementos en la lista
            nuevoPokemon.appendChild(enlace);
            nuevoPokemon.appendChild(imagen);
            nuevoPokemon.appendChild(altura);
            nuevoPokemon.appendChild(peso);

            listaElement.appendChild(nuevoPokemon);

        });

        urlSiguiente = data.next;
        urlAnterior = data.previous;

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
