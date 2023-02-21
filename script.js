let myTeamBtn = document.querySelector('#myTeam-btn')
let choosePokemonBtn = document.querySelector('#choosePokemon-btn')
let body = document.querySelector('body')

myTeamBtn.addEventListener('click', () => {
   createMyTeamPopOverlay()
})
// --------------------
choosePokemonBtn.addEventListener('click', async () => {
  const pokemonData = await getPokemonData()
  const popOverlayWhiteChoosePokemon = createChoosePokemonOverlay()
  renderPokemonData(pokemonData.results, popOverlayWhiteChoosePokemon)
})
// -------------------

function createMyTeamPopOverlay() {
   let popOverlayMyTeamBtn = document.createElement("div")
   let PopOverlayWhite = document.createElement("div")
   let myTeamHeader = document.createElement("h2")
   myTeamHeader.classList.add("myTeamHeader")
   myTeamHeader.innerText = 'Mitt Team'
   popOverlayMyTeamBtn.classList.add("PopOverlay-MyTeamBtn")
   PopOverlayWhite.classList.add("popOverlayWhite")

   body.append(popOverlayMyTeamBtn)
   popOverlayMyTeamBtn.append(PopOverlayWhite)
   PopOverlayWhite.append(myTeamHeader)

   PopOverlayWhite.addEventListener('click', (event) => {
      console.log('du klickade på den vita overlayen')
      event.stopPropagation()
   })
   popOverlayMyTeamBtn.addEventListener('click', () => {
      console.log('du klickade på den svarta overlayen')
      popOverlayMyTeamBtn.remove()
   })
}




async function getPokemonData() {
   const url = 'https://pokeapi.co/api/v2/pokemon/'
 
   console.log('Nu hämtar Jag data i från API')
   const response = await fetch(url)
   const data = await response.json()
   console.log('Nu VÄNTAR Jag på data i från API')
   
   console.log(' Nu borde jag ha fått datan och den ser ut såhär  : ' + JSON.stringify(data, null, 2))

   return data
 }
 function createChoosePokemonOverlay() {
   let popOverlayChoosePokemon = document.createElement("div")
   let popOverlayWhiteChoosePokemon = document.createElement("div")
   let chooseHeader = document.createElement("h2")
let inputElement = document.createElement("input");
inputElement.classList.add('input')
inputElement.setAttribute("type", "text");
inputElement.setAttribute("name", "myInput");
inputElement.placeholder = 'Search pokemon'

let selectBtn = document.createElement("button");
selectBtn.textContent = "Select";
selectBtn.classList.add("selectBtn");

let inputContainer = document.createElement("div");
inputContainer.classList.add("input-container");

inputContainer.appendChild(inputElement);

popOverlayWhiteChoosePokemon.appendChild(inputContainer);

   chooseHeader.innerText = "Välj pokemon"
   chooseHeader.classList.add("choose-header")
   popOverlayChoosePokemon.classList.add("popOverlay-choosePokemon")
   popOverlayWhiteChoosePokemon.classList.add("popOverlayWhite-choosePokemon")

   body.append(popOverlayChoosePokemon)
   popOverlayChoosePokemon.append(popOverlayWhiteChoosePokemon)
   popOverlayWhiteChoosePokemon.append(chooseHeader)

   popOverlayWhiteChoosePokemon.addEventListener("click", (event) => {
     console.log("du klickade Select knappen")
     event.stopPropagation()
   })
   popOverlayChoosePokemon.addEventListener("click", () => {
     console.log("du klickade på den svarta overlayen")
     popOverlayChoosePokemon.remove()
   })

   return popOverlayWhiteChoosePokemon
 }
function createCardSelectBTn(cardDiv) {
  let selectBtn = document.createElement('button');
  selectBtn.classList.add('selectBtn');
  selectBtn.textContent = 'Select';
  cardDiv.append(selectBtn);
} 

function renderPokemonData(pokemonData, popOverlayWhiteChoose) {
  if (pokemonData) {
    pokemonData.forEach(pokemon => {
      // ----------------------------- The search btn in choosePokemon Overlayen
      const inputElement = popOverlayWhiteChoose.querySelector('.input');
      inputElement.addEventListener('input', () => {
        const inputValue = inputElement.value.toLowerCase();
        const filteredPokemonData = pokemonData.filter(pokemon => pokemon.name.includes(inputValue));
        renderFilteredPokemonData(filteredPokemonData, popOverlayWhiteChoose);
      });
      

// -----------------------------Visar pokemon lista
      let cardDiv = document.createElement("div");
      let cardImg = document.createElement("img");
      let name = document.createElement("h4");
      let selectBtn = document.createElement("button");

      cardDiv.classList.add("myChooseteam-card");
      cardImg.classList.add("myChooseteam-image");
      name.classList.add("pokemonNametag");
      selectBtn.classList.add("selectBtn");
      selectBtn.textContent = "Select";

      cardImg.src = pokemon.sprites?.front_default || '';
      name.innerText = pokemon.name;
      
      popOverlayWhiteChoose.append(cardDiv);
      cardDiv.append(cardImg);
      cardDiv.append(name);
      cardDiv.append(selectBtn);

      selectBtn.addEventListener('click', () => {
          console.log('Du klickade på select knappen ');
      });
    });
  }
}
function renderFilteredPokemonData(pokemonData, popOverlayWhiteChoose) {
  // Clear the existing cards
  popOverlayWhiteChoose.querySelectorAll('.myChooseteam-card').forEach(card => card.remove());

  // Render the filtered results
  if (pokemonData) {
    pokemonData.forEach(pokemon => {
      // ----------------------------- The search btn in choosePokemon Overlayen
      const inputElement = popOverlayWhiteChoose.querySelector('.input');
      inputElement.addEventListener('input', () => {
        const inputValue = inputElement.value.toLowerCase();
        const filteredPokemonData = pokemonData.filter(pokemon => pokemon.name.includes(inputValue));
        renderFilteredPokemonData(filteredPokemonData, popOverlayWhiteChoose);
      });
      

// -----------------------------Visar NYA filltrerade pokemon lista
      let cardDiv = document.createElement("div");
      let cardImg = document.createElement("img");
      let name = document.createElement("h4");
      let selectBtn = document.createElement("button");

      cardDiv.classList.add("myChooseteam-card");
      cardImg.classList.add("myChooseteam-image");
      name.classList.add("pokemonNametag");
      selectBtn.classList.add("selectBtn");
      selectBtn.textContent = "Select";

      cardImg.src = pokemon.sprites?.front_default || '';
      name.innerText = pokemon.name;
      
      popOverlayWhiteChoose.append(cardDiv);
      cardDiv.append(cardImg);
      cardDiv.append(name);
      cardDiv.append(selectBtn);

      selectBtn.addEventListener('click', () => {
          console.log('Du klickade på select knappen ');
      });
    });
  }
}






