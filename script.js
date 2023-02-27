let myTeamBtn = document.querySelector("#myTeam-btn");
let choosePokemonBtn = document.querySelector("#choosePokemon-btn");
let body = document.querySelector("body");

// ---------------------------
let popOverlayWhite = null;
// ----------------------------

let pokemonData = null; // objekt med { results }
// let selectedPokemon = null; // den valda pokemonnen
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
		pokemonData.results[0].sprites,
		pokemonData.results[0].abilities
	);
});

// // för varje abilities 
// pokemon.abilities.forEach(pokemon => {
// 	let newAbilities = document.createElement('legend')

// 	newAbilities.textContent = pokemon.ability.name
// 	cardDiv.append(newAbilities)
// });

function createMyTeamPopOverlay() {
	// Only create the overlay if there are pokémon in the team
	if (myTeam.length > 0) {
		let popOverlayMyTeam = document.createElement("div");
		let popOverlayWhite = document.createElement("div");
		let myTeamHeader = document.createElement("h2");
		myTeamHeader.classList.add("myTeamHeader");
		myTeamHeader.innerText = "Mitt Team";
		popOverlayMyTeam.classList.add("popOverlay-MyTeam");
		popOverlayWhite.classList.add("popOverlayWhite");

		body.append(popOverlayMyTeam);
		popOverlayMyTeam.append(popOverlayWhite);
		popOverlayWhite.append(myTeamHeader);

		// For each pokemon that are selected. Create new card/button and move to myTeam.
		myTeam.forEach((pokemon, index) => {
			const newPokemonCard = document.createElement("div");
			const newPokemonImg = document.createElement("img");
			const newPokemonName = document.createElement("h4");
			const newAbility = document.createElement("h6");

			const newChangeNameBtn = document.createElement("button");
			const newNameInput = document.createElement("input");
			newChangeNameBtn.classList.add("changeNameBtn");
			const newRemoveBtn = document.createElement("button");
			newPokemonCard.classList.add("pokemon");
			newRemoveBtn.classList.add("removeBtn");
			newAbility.classList.add("ability");

			newChangeNameBtn.innerText = "Rename";
			newNameInput.classList.add("nameInput");
			newNameInput.type = "text";
			newNameInput.value = pokemon.name;
			newNameInput.style.display = "none";

			newRemoveBtn.innerText = "Remove";
			newPokemonName.innerText = pokemon.name;
			newPokemonImg.src = pokemon.sprites;

			const newUpBtn = document.createElement("button");
			newUpBtn.innerText = "Up";
			newUpBtn.classList.add("upBtn");

			const newDownBtn = document.createElement("button");
			newDownBtn.innerText = "Down";
			newDownBtn.classList.add("downBtn");

			newPokemonCard.append(
				newPokemonName,
				newPokemonImg,
				newAbility,
				newChangeNameBtn,
				newNameInput
			);

			//   lägg till abilitys här
			newPokemonImg.src = pokemon.sprites;
			newPokemonName.innerText = pokemon.name;
			newAbility.innerText = pokemon.abilities;

			newChangeNameBtn.addEventListener("click", (event) => {
				event.stopPropagation();
				newPokemonName.style.display = "none";
				newChangeNameBtn.style.display = "none";
				newNameInput.style.display = "inline-block";
				newNameInput.focus();
			});

			newNameInput.addEventListener("blur", (event) => {
				event.stopPropagation();
				newPokemonName.innerText = newNameInput.value;
				pokemon.name = newPokemonName.innerText;
				newPokemonName.style.display = "inline-block";
				newChangeNameBtn.style.display = "inline-block";
				newNameInput.style.display = "none";
			});

			newRemoveBtn.addEventListener("click", () => {
				myTeam.splice(index, 1); // Remove pokemon from array
				newPokemonCard.remove(); // Remove pokemon card from overlay
			});

			newUpBtn.addEventListener("click", (event) => {
				event.stopPropagation();
				if (index > 0) {
					// Move the pokemon card up in the array
					const temp = myTeam[index];
					myTeam[index] = myTeam[index - 1];
					myTeam[index - 1] = temp;

					// Move the pokemon card up in the DOM
					const prevPokemonCard = newPokemonCard.previousSibling;
					popOverlayWhite.insertBefore(
						newPokemonCard,
						prevPokemonCard
					);
				}
			});

			newDownBtn.addEventListener("click", (event) => {
				event.stopPropagation();
				if (index < myTeam.length - 1) {
					// Move the pokemon card down in the array
					const temp = myTeam[index];
					myTeam[index] = myTeam[index + 1];
					myTeam[index + 1] = temp;
					// --------------------   // Move the pokemon card down in the DOM
					const nextPokemonCard = newPokemonCard.nextSibling;
					popOverlayWhite.insertBefore(
						nextPokemonCard,
						newPokemonCard
					);
				}
			});

			newPokemonCard.append(
				newPokemonName,
				newPokemonImg,
				newAbility,
				newChangeNameBtn,
				newNameInput,
				newUpBtn,
				newDownBtn,
				newRemoveBtn
			);
			popOverlayWhite.append(newPokemonCard);

			popOverlayWhite.addEventListener("click", (event) => {
				event.stopPropagation();
			});

			popOverlayMyTeam.addEventListener("click", () => {
				console.log("du klickade på den svarta overlayen");
				popOverlayMyTeam.remove();
			});
		});
	} // Show an error message if the team is empty
	else {
		// create popup div element
		const popup = document.createElement("div");
		popup.classList.add("popup");
		popup.textContent = "Your team is empty!";

		// append popup to body
		document.body.appendChild(popup);

		// remove popup after 3 seconds
		setTimeout(() => {
			popup.remove();
		}, 3000);
	}
}

// ---------------



function addPokemonToTeam(pokemon) {
	if (myTeam.length <= 9) {
		myTeam.push(pokemon);

	} else if (myTeam.length === 3) {
		myTeam.push(pokemon);
		
		// create h2 element for selected champions
		const h2Selected = document.createElement("h2");
		h2Selected.textContent = "The selected champions";
		
		// create h2 element for reserve team
		const h2Reserve = document.createElement("h2");
		h2Reserve.textContent = "Reserve";
		
		// append headers and divs to body
		popOverlayWhite.appendChild(h2Selected);
		popOverlayWhite.appendChild(h2Reserve);
	} else {
		// create popup div element
		const popup = document.createElement("div");
		popup.classList.add("popup");
		popup.textContent = "You can only have 3 champions and 7 in reserve!";

		// append popup to body
		document.body.appendChild(popup);

		// remove popup after 3 seconds
		setTimeout(() => {
			popup.remove();
		}, 3000);
	}

	return;
}



// // //   inte mer än 3 i myteam
// function addPokemonToTeam(pokemon) {
// 	console.log("Test");

// 	if (myTeam.length <= 8) {
// 		myTeam.push(pokemon);
// 	} else if (myTeam.length > 8) {
// 		// create popup div element
// 		const popup = document.createElement("div");
// 		popup.classList.add("popup");
// 		popup.textContent = "You can only have 6 reserve pokemon !";
	
	

// 		// append popup to body
// 		document.body.appendChild(popup);

// 		// remove popup after 3 seconds
// 		setTimeout(() => {
// 			popup.remove();
// 		}, 3000);
// 	}

// 	return;
// }

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
		const pokemonUrl = pokemon.url;
		const pokemonResponse = await fetch(pokemonUrl);
		let responseData = await pokemonResponse.json();

		// Om du vill ha shiny byt på två ställen i koden
		// pokemon.sprites = responseData.sprites.front_shiny;
		pokemon.sprites = responseData.sprites.front_default;

		// för varje ability
		// console.log(
		// 	"Abilities för varje pokemon. ",
		// 	pokemon,
		// 	responseData.abilities
		// );
		pokemon.abilities = ''
		responseData.abilities.forEach(object => {
			console.log('Object is:', object)
			// let newAbility = document.createElement('legend')
			// newAbility.textContent = pokemon.ability.name
			// document.body.append(newAbility)
			pokemon.abilities += object.ability.name
		});


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
	body.addEventListener("click", () => {
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
		// addPokemonToTeam(pokemon)
		// console.log(pokemon)
	});

	return selectBtn;
}

function renderPokemonData(pokemonData, popOverlayWhiteChoose) {
	if (pokemonData) {
		let filteredPokemon = pokemonData;
		const inputElement = popOverlayWhiteChoose.querySelector(".input");
		inputElement.addEventListener("input", () => {
			const inputValue = inputElement.value.toLowerCase();
			filteredPokemon = pokemonData.filter((pokemon) =>
				pokemon.name.includes(inputValue)
			);
			/*
			renderFilteredPokemonData(
				filteredPokemonData,
				popOverlayWhiteChoose
			);
			*/
		});

		filteredPokemon.forEach((pokemon) => {
			// -----------------------------Visar pokemon lista
			let cardDiv = document.createElement("div");
			let cardImg = document.createElement("img");
			let name = document.createElement("h4");
			let ability = document.createElement("h6");

			let selectBtn = document.createElement("button");

			cardDiv.classList.add("myChooseteam-card");
			cardImg.classList.add("myChooseteam-image");
			name.classList.add("pokemonNametag");
			ability.classList.add("ability");
			selectBtn.classList.add("selectBtn");
			selectBtn.textContent = "Select";

			cardImg.src = pokemon.sprites;
			// ability = responseData.abilities;
			// ability.innerText = 'test'

			name.innerText = pokemon.name;
			// pokemon.sprites = responseData.sprites.front_shiny;
			pokemon.sprites = responseData.sprites.front_default;

			// console.log("Här är någoting med bilden ", pokemon.sprites);

			popOverlayWhiteChoose.append(cardDiv);
			cardDiv.append(name);
			cardDiv.append(cardImg);
			cardDiv.append(ability);
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
	} else if (pokemonData) {
		pokemonData.forEach((pokemon) => {
			cardDiv.addEventListener("click", () => {
				console.log("du klickade på en pokemon");
				selectedPokemon = pokemon;
			});

			createCardSelectBtn(cardDiv);
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
		let ability = document.createElement("h6");

		let selectBtn = document.createElement("button");

		cardDiv.classList.add("myChooseteam-card");
		cardImg.classList.add("myChooseteam-image");
		name.classList.add("pokemonNametag");
		selectBtn.classList.add("selectBtn");
		ability.classList.add("ability");
		selectBtn.textContent = "Select";

		// console.log('detta är vad pokemon ability är ', pokemon.ability)
		ability.innerText = pokemon.abilities;
		name.innerText = pokemon.name;
		cardImg.src = pokemon.sprites;
		// console.log('Kontrollera vad en pokemon är: ', pokemon)
		// console.log("Kontrollera renderfunktionen:", name.innerText, cardImg.src);

		popOverlayWhiteChoose.append(cardDiv);
		cardDiv.append(name);
		cardDiv.append(cardImg);
		cardDiv.append(ability);
		cardDiv.append(selectBtn);

		// --------------------------------------------------------------------------------------------------

		// Den här Click funktionen fungerar.
		selectBtn.addEventListener("click", () => {
			console.log("Du klickade på select knappen ", pokemon);
			//myTeam.push(pokemon);
			console.log("Anropar addPokemon");
			addPokemonToTeam(pokemon);
			console.log("POKEMON: " + pokemon);
		});
	});
}
