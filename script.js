const pokemonNumberInput = document.getElementById("pokemonNumber");
const searchButton = document.getElementById("searchButton");
const pokemonCard = document.getElementById("pokemonCard");
const errorMessage = document.getElementById("errorMessage");

searchButton.addEventListener("click", async () => {
    const pokemonNumber = pokemonNumberInput.value;

    if (!pokemonNumber) {
        errorMessage.textContent = "Please enter a valid Pokemon number.";
        pokemonCard.innerHTML = "";
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
        const data = await response.json();

        errorMessage.textContent = "";

        const pokemonName = data.name;
        const pokemonTypes = data.types.map((type) => type.type.name).join(", ");
        const pokemonHeight = (data.height / 10).toFixed(1);
        const pokemonWeight = (data.weight / 10).toFixed(1);
        const pokemonImage = data.sprites.front_default;

        const cardHTML = `
            <div class="pokemon-info">
                <h2>${pokemonName}</h2>
                <p>Type(s): ${pokemonTypes}</p>
                <p>Height: ${pokemonHeight} m</p>
                <p>Weight: ${pokemonWeight} kg</p>
                <img src="${pokemonImage}" alt="${pokemonName}">
            </div>
        `;

        pokemonCard.innerHTML = cardHTML;
    } catch (error) {
        errorMessage.textContent = "Pokemon not found. Please enter a valid Pokemon number.";
        pokemonCard.innerHTML = "";
    }
});
