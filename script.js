
const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";

const imgElement = document.getElementById("image");
const nameElement = document.getElementById("name");
const numberElement = document.getElementById("number");
const heightElement = document.getElementById("height");
const weightElement = document.getElementById("weight");
const typesElement = document.getElementById("types");
const buttonElement = document.getElementById("btnCargar");

async function fetchData(url) {

    try {

        let response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error de red: ${response.statusText}`);
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

        data.types.forEach((element) => {

            let newButton = document.createElement("button");

            newButton.classList.add(element.type.name);
            newButton.innerText = element.type.name;

            typesElement.appendChild(newButton);

        });

    } catch (error) {

        console.error(error);

    }

}

// Generar número aleatorio
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Cargar Pokémon al pulsar el botón
buttonElement.addEventListener("click", () => {

    let number = getRandomNumber(1, 152);

    fetchData(`${pokeAPI}${number}`);

});
