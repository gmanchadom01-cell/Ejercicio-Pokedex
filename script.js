
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
/*Pokemon no encontrado
Objetivo: gestionar correctamente los errores de las peticiones de busqueda
Punto de partida: Buscador del ejercicio 02

1. Comprueba el valor de response.ok despues de realizar la peticion
2. Si la API responde con un error, muestra Pokemon no encontrado
3. Utiliza try-catch para controlar errores de red o problemas al procesar la respuesta
4. Mientras se espera la respuesta, muestra un texto Cargando...
5. Al terminar, retira el mensaje de carga y muestra el resultado o error correspondiente

Practicas: estados HTTP, response.ok, try-catch y estados de carga

Comprobacion: Prueba con Pikachu, un nombre inexistente y simulando una desconexion desde las herramientas de desarrollador*/