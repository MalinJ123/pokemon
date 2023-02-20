
// Variabels from DOM element
let myTeamBtn = document.querySelector('#myTeam-btn')
let choosePokemonBtn = document.querySelector('#choosePokemon-btn')
let body = document.querySelector('body')


myTeamBtn.addEventListener('click', () => {
   createMyTeamPopOverlay()
} )

choosePokemonBtn.addEventListener('click', () =>{
   creatChoosePokemonOverlay()
})

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

function creatChoosePokemonOverlay(){

   let popOverlayChoosePokemon = document.createElement("div")
   let PopOverlayWhiteChoosePokemon = document.createElement("div")

   popOverlayChoosePokemon.classList.add("popOverlay-choosePokemon")
   PopOverlayWhiteChoosePokemon.classList.add("popOverlayWhite-choosePokemon")

   body.append(popOverlayChoosePokemon);
   popOverlayChoosePokemon.append(PopOverlayWhiteChoosePokemon)

   PopOverlayWhiteChoosePokemon.addEventListener('click', (event) => {
      console.log('du klickade på den vita overlayen')
      event.stopPropagation();
   })
   popOverlayChoosePokemon.addEventListener('click', () => {
      console.log('du klickade på den svarta overlayen')
      popOverlayChoosePokemon.remove();
   }) 

}

// function removeOverlay(){
//    closeOverlayBtn.addEventListener('click', () => {
//    console.log('Du klickade på knappen')
//    popOverlayMyTeamBtn.remove(); // remove the parent overlay
// })}

// PopOverlayWhite.style.display: none;


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
 

