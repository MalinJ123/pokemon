
// Variabels from DOM element
let myTeamBtn = document.querySelector('#myTeam-btn')
let choosePokemonBtn = document.querySelector('#choosePokemon-btn')
let body = document.querySelector('body')

// LÄGG FUNKTIONERNA HÄR
myTeamBtn.addEventListener('click', () => {
   createMyTeamPopOverlay()
} )
choosePokemonBtn.addEventListener('click', async () =>{
   createChoosePokemonOverlay()
   getPokemonData ()
   renderPokemonData(data)
})
// const data = await getPokemonData ()


function createMyTeamPopOverlay(){
   let popOverlayMyTeamBtn = document.createElement("div")
   let PopOverlayWhite = document.createElement("div")
   let myTeamHeader = document.createElement("h2")
   myTeamHeader.classList.add("myTeamHeader")
   myTeamHeader.innerText = 'Mitt Team'
   popOverlayMyTeamBtn.classList.add("PopOverlay-MyTeamBtn")
   PopOverlayWhite.classList.add("popOverlayWhite")
  

   body.append(popOverlayMyTeamBtn);
   popOverlayMyTeamBtn.append(PopOverlayWhite);
   PopOverlayWhite.append(myTeamHeader);

   PopOverlayWhite.addEventListener('click', (event) => {
      console.log('du klickade på den vita overlayen')
      event.stopPropagation();
   })
   popOverlayMyTeamBtn.addEventListener('click', () => {
      console.log('du klickade på den svarta overlayen')
      popOverlayMyTeamBtn.remove();
   }) 
}
function createChoosePokemonOverlay() {
   let popOverlayChoosePokemon = document.createElement("div");
   let popOverlayWhiteChoosePokemon = document.createElement("div");
   let chooseHeader = document.createElement("h2");
   chooseHeader.innerText = "Välj pokemon";
   chooseHeader.classList.add("choose-header");
   popOverlayChoosePokemon.classList.add("popOverlay-choosePokemon");
   popOverlayWhiteChoosePokemon.classList.add("popOverlayWhite-choosePokemon");
 
   body.append(popOverlayChoosePokemon);
   popOverlayChoosePokemon.append(popOverlayWhiteChoosePokemon);
   popOverlayWhiteChoosePokemon.append(chooseHeader);
 
   // fetch Pokemon data from the API
   fetch("https://pokeapi.co/api/v2/pokemon")
     .then(response => response.json())
     .then(data => {
       // render the Pokemon data as cards
       renderPokemonData(data.results);
     });
 
   popOverlayWhiteChoosePokemon.addEventListener("click", event => {
     console.log("du klickade på den vita overlayen");
     event.stopPropagation();
   });
   popOverlayChoosePokemon.addEventListener("click", () => {
     console.log("du klickade på den svarta overlayen");
     popOverlayChoosePokemon.remove();
   });
 }

// kan man skapa imge src ? 
function createPokemonCard (){
   let cardDiv = document.querySelector("div")
   let cardImge = document.querySelector("img")
   cardDiv.classList.add("myteam-card")
   cardImge.classList.add("myteam-imge")

   popOverlayWhite.append(cardDiv)
   cardDiv.append(cardImge)
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

 function renderPokemonData() {
   const parentElement = document.querySelector("pokemon-cards");
   forEach(pokemon => {
     // create the card element
     const card = document.createElement("div");
     card.classList.add("myteam-card");

    // create the name element
     const name = document.createElement("h4");
     name.classList.add("pokemonNametag");

     // create the image element
     const image = document.createElement("img");
     image.classList.add("myteam-imge");
     image.src = pokemon.sprites.front_default;
 
      // creata list element
      let list = document.querySelector('ul')
      let li = document.querySelector('li')
      list.classList.add('choose-list')
      li.classList.add('li-element')


     // append the elements to the card and the card to the parent element
       parentElement.appendChild(card.ul);
      //  card.appendChild(name);
      //  card.appendChild(image);
      //  card.append(ul);
       ul.append(li);
   
   });


 }





/* 1. Jag behöver en function för knappen "Mitt Team" 
-	Den knappen ska ha en addeventlistener 'click', som öppnar upp en overlay view. Som stoppar propagation. 
-	I mitt team, fylls på med lägg till knappen ifrån välj team. 
-	Varje "card" ska ha en [Byt namn] knapp 
-	Varje "card" ska ha en [ta bort ] knapp brevid sig. 



   2. Jag behöver en function för knappen "Välj pokemon" 
-	Den knappen ska ha en addeventlistener 'click', som öppnar upp en overlay view. Som stoppar propagation. 
-	Det ska finnas ett input-fält där man kan söka i api:et efter pokemonen. 
-	Knappen ska också async fetch () ifrån ApI URL:https://pokeapi.co/ 
-	Den hämtade datan ska kunna skapa en list element och skrivas ut
- 	CreateElement li och img? I css ska alla pokemon ha en dotted border. 
-	Som kan lista upp alla pokemon i en lista med bilder

-	Det ska finnas en knapp i varje (pokemon-card) där det står [ lägg till ] 
-	När man trycker på [ lägg till ] behövs en eventlistener och en funktion där man kan lägga pokemonen i Mitt Team. 
   */
 

