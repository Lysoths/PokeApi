const body = document.querySelector("body");
const container = document.querySelector(".container");
const input = document.querySelector("input");

const pokeId = 151;

const getPokemon = async () => {
  for (let i = 1; i <= pokeId; i++) {
    await pokemonGet(i);
  }
};

const pokemonGet = async (id) => {
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let res = await fetch(url);
  let data = await res.json();
  createPokemonBox(data);
};

const createPokemonBox = (pokemon) => {
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, "0");
  const imageId = pokemon.id;
  const height = pokemon.height;

  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("box");
  pokemonEl.innerHTML = ` 
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${imageId}.svg"
                alt="">           
                <p class="name">${name}</p>
                <p class="id">#${id}</p>
            `;
  container.appendChild(pokemonEl);
};

getPokemon();

input.addEventListener("input", () => {
  const allPokeBox = document.querySelectorAll(".box");
  const pokeNames = document.querySelectorAll(".name");
  const search = input.value.toLowerCase();

  pokeNames.forEach((pokeNames) => {
    pokeNames.parentElement.style.display = "block";
    if (!pokeNames.innerHTML.toLowerCase().includes(search)) {
      pokeNames.parentElement.style.display = "none";
    }
  });
});
