let myTeamBtn = document.querySelector("#myTeam-btn");
let choosePokemonBtn = document.querySelector("#choosePokemon-btn");
let body = document.querySelector("body");

// ---------------------------
let popOverlayWhite = null;
// ----------------------------

let pokemonData = null; // objekt med { results }
let selectedPokemon = null; // den valda pokemonnen
let myTeam = []; // här lägger du till pokemons till laget

myTeamBtn.addEventListener("click", () => {
	createMyTeamPopOverlay();
});
// --------------------
choosePokemonBtn.addEventListener("click", async () => {
	// Hämta all information
	pokemonData = await getPokemonData();
	console.log(
		"Hämtade data från API. En pokemon är: ",
		pokemonData.results[0],
		pokemonData.results[0].sprites
	);
});
// -------------------



function createMyTeamPopOverlay() {
  let popOverlayMyTeamBtn = document.createElement("div")
  let popOverlayWhite = document.createElement("div")
  let myTeamHeader = document.createElement("h2")
  myTeamHeader.classList.add("myTeamHeader")
  myTeamHeader.innerText = "Mitt Team"
  popOverlayMyTeamBtn.classList.add("PopOverlay-MyTeamBtn")
  popOverlayWhite.classList.add("popOverlayWhite")

  body.append(popOverlayMyTeamBtn)
  popOverlayMyTeamBtn.append(popOverlayWhite)
  popOverlayWhite.append(myTeamHeader)

  myTeam.forEach((pokemon, index) => {
      const newPokemonCard = document.createElement("div")
      const newPokemonImg = document.createElement("img")
      const newPokemonName = document.createElement("h6")

      const newChangeNameBtn = document.createElement("button")
      const newNameInput = document.createElement("input")
      newChangeNameBtn.classList.add("changeNameBtn")
      const newRemoveBtn = document.createElement("button")
      newPokemonCard.classList.add("pokemon")
      newRemoveBtn.classList.add("removeBtn")

      newChangeNameBtn.innerText = "Rename"
      newNameInput.classList.add("nameInput")
      newNameInput.type = "text"
      newNameInput.value = pokemon.name
      newNameInput.style.display = "none"

   
      newRemoveBtn.innerText = "Remove"
      newPokemonName.innerText = pokemon.name;
      newPokemonImg.src = pokemon.sprites


      newPokemonCard.append(newPokemonName, newPokemonImg, newChangeNameBtn, newNameInput);
      newPokemonImg.src = pokemon.sprites
      newPokemonName.innerText = pokemon.name;

      newChangeNameBtn.addEventListener("click", (event) => {
          event.stopPropagation();
          newPokemonName.style.display = "none"
          newChangeNameBtn.style.display = "none"
          newNameInput.style.display = "inline-block"
          newNameInput.focus();
      });

      newNameInput.addEventListener("blur", (event) => {
        event.stopPropagation();
          newPokemonName.innerText = newNameInput.value
          newPokemonName.style.display = "inline-block"
          newChangeNameBtn.style.display = "inline-block"
          newNameInput.style.display = "none"
      });

      newRemoveBtn.addEventListener("click", () => {
        myTeam.splice(index, 1) // Remove pokemon from array
        newPokemonCard.remove()// Remove pokemon card from overlay
      });

      
      newPokemonCard.append(newPokemonName, newPokemonImg, newChangeNameBtn, newRemoveBtn); // Add new remove button to pokemon card
      popOverlayWhite.append(newPokemonCard)
    });
  };
  popOverlayWhite.addEventListener("click", (event) => {
      event.stopPropagation();
  
  });
  popOverlayMyTeamBtn.addEventListener("click", () => {
    popOverlayMyTeamBtn.remove();
  
  });

  


function addPokemonToTeam(pokemon) {
  if (myTeam.length >= 3) {
    console.log('You can only have 3 pokemon on your team!')
    return;
  }
  
  myTeam.push(pokemon);

}








async function getPokemonData() {
	// sätt limit i url till 1000, så hämtar du fler pokemon. Offset ex = 5, då byter den ut 5 (plockar ut 5 pokemon efter 5.e plats )
	const url = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";

	console.log("Nu hämtar Jag data i från API");
	const response = await fetch(url);
	const data = await response.json();
	//  datan är ett objekt med results
	console.log("Nu VÄNTAR Jag på data i från API");

	console.log(" Nu borde jag ha fått datan och den ser ut såhär  :", data);

	// Problem: forEach väntar inte tills alla funktioner är färdiga
	let numberComplete = 0;
	data.results.forEach(async (pokemon) => {
		// console.log(' Här är vi inne i foreach och tittar på varje pokemon', pokemon)

		const pokemonUrl = pokemon.url;
		const pokemonResponse = await fetch(pokemonUrl);
		let responseData = await pokemonResponse.json();
		// console.log('Här är resultatet på responsedata', responseData.sprites)

		pokemon.sprites = responseData.sprites.front_shiny;
		// pokemon.sprites är en bildlänk
		numberComplete++;
		if (numberComplete === data.results.length) {
				const popOverlayWhiteChoosePokemon = createChoosePokemonOverlay();
		
			renderFilteredPokemonData(
				data.results,
				popOverlayWhiteChoosePokemon
			);
		}
	});

	return data;
}
// Returnerar det vita elementet som är i mitten av overlayen
function createChoosePokemonOverlay() {
	let popOverlayChoosePokemon = document.createElement("div");
	let popOverlayWhiteChoosePokemon = document.createElement("div");
	let chooseHeader = document.createElement("h2");
	let inputElement = document.createElement("input");

	inputElement.classList.add("input");
	inputElement.setAttribute("type", "text");
	inputElement.setAttribute("name", "myInput");
	inputElement.placeholder = "Search pokemon";

	let selectBtn = document.createElement("button");
	selectBtn.textContent = "Select";
	selectBtn.classList.add("selectBtn");

	let inputContainer = document.createElement("div");
	inputContainer.classList.add("input-container");

	inputContainer.appendChild(inputElement);

	popOverlayWhiteChoosePokemon.appendChild(inputContainer);

	chooseHeader.innerText = "Välj pokemon";
	chooseHeader.classList.add("choose-header");
	popOverlayChoosePokemon.classList.add("popOverlay-choosePokemon");
	popOverlayWhiteChoosePokemon.classList.add("popOverlayWhite-choosePokemon");

	body.append(popOverlayChoosePokemon);
	popOverlayChoosePokemon.append(popOverlayWhiteChoosePokemon);
	popOverlayWhiteChoosePokemon.append(chooseHeader);

	popOverlayWhiteChoosePokemon.addEventListener("click", (event) => {
			event.stopPropagation();
	});
	popOverlayChoosePokemon.addEventListener("click", () => {
		console.log("du klickade på den svarta overlayen");
		popOverlayChoosePokemon.remove();
	});

	return popOverlayWhiteChoosePokemon;
}

function createCardSelectBtn(cardDiv) {
	let selectBtn = document.createElement("button");
	selectBtn.classList.add("selectBtn");
	selectBtn.textContent = "Select";

	selectBtn.addEventListener("click", () => {
		popOverlayWhite.appendChild(cardDiv);
		cardDiv.style.display = "block";
	});

	return selectBtn;
}

function renderPokemonData(pokemonData, popOverlayWhiteChoose) {
	if (pokemonData) {
		pokemonData.forEach((pokemon) => {
			const inputElement = popOverlayWhiteChoose.querySelector(".input");
			inputElement.addEventListener("input", () => {
				const inputValue = inputElement.value.toLowerCase();
				const filteredPokemonData = pokemonData.filter((pokemon) =>
					pokemon.name.includes(inputValue)
				);
				renderFilteredPokemonData(
					filteredPokemonData,
					popOverlayWhiteChoose
				);
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

			cardImg.src = pokemon.sprites;
			// pokemon.sprites är en bildlänk

			name.innerText = pokemon.name;
			pokemon.sprites = responseData.sprites.front_shiny;

			console.log("Här är någoting med bilden ", pokemon.sprites);

			popOverlayWhiteChoose.append(cardDiv);
			cardDiv.append(cardImg);
			cardDiv.append(name);
			cardDiv.append(selectBtn);

		
		});
	}
}

function renderFilteredPokemonData(pokemonData, popOverlayWhiteChoose) {
	// Clear the existing cards
	popOverlayWhiteChoose
		.querySelectorAll(".myChooseteam-card")
		.forEach((card) => card.remove());

	if (pokemonData) {
		pokemonCardDiv(pokemonData, popOverlayWhiteChoose);
		// createCardSelectBTn(cardDiv);
	} else if (pokemonData) {
		pokemonData.forEach((pokemon) => {
			// ...
			cardDiv.addEventListener("click", () => {
				console.log("du klickade på en pokemon");
				selectedPokemon = pokemon;
			});

			createCardSelectBtn(cardDiv);
			// ...
		});
	}
}

function pokemonCardDiv(pokemonData, popOverlayWhiteChoose) {
	// Detta görs en gång
	console.log("pokemonCardDiv: pokemonData är:", pokemonData);
	const inputElement = popOverlayWhiteChoose.querySelector(".input");
	//  console.log('Finns det någon input? ', inputElement)
	inputElement.addEventListener("input", () => {
		const inputValue = inputElement.value.toLowerCase();
		const filteredPokemonData = pokemonData.filter((pokemon) =>
			pokemon.name.includes(inputValue)
		);
		renderFilteredPokemonData(filteredPokemonData, popOverlayWhiteChoose);
	});

	pokemonData.forEach((pokemon) => {
		// Detta görs flera gånger (1 per pokemon)
		// ----------------------------- The search btn in choosePokemon Overlayen

		let cardDiv = document.createElement("div");
		let cardImg = document.createElement("img");
		let name = document.createElement("h5");
		let selectBtn = document.createElement("button");

		cardDiv.classList.add("myChooseteam-card");
		cardImg.classList.add("myChooseteam-image");
		name.classList.add("pokemonNametag");
		selectBtn.classList.add("selectBtn");
		selectBtn.textContent = "Select";

		name.innerText = pokemon.name;
		cardImg.src = pokemon.sprites;
		// console.log('Kontrollera vad en pokemon är: ', pokemon)
		// console.log("Kontrollera renderfunktionen:", name.innerText, cardImg.src);

		popOverlayWhiteChoose.append(cardDiv);
		cardDiv.append(name);
		cardDiv.append(cardImg);
		cardDiv.append(selectBtn);

    // Den här Click funktionen fungerar. 
		selectBtn.addEventListener("click", () => {
			console.log("Du klickade på select knappen ", pokemon);
			myTeam.push(pokemon);
		});
	});
} //pokemonCardDiv


const selectBtn = document.querySelector("#selectBtn");



// Någon idée för hur jag kan få rad 104 att fungera? 
//När Jag är i "mitt team" så kan jag ej klicka på svarta overlayen för att stänga / måste ladda om 
// När man laddar om försvinner de valda pokemonen. 