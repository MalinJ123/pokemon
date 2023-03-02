let myTeamBtn = document.querySelector("#myTeam-btn");
let choosePokemonBtn = document.querySelector("#choosePokemon-btn");
let body = document.querySelector("body");
let popOverlayWhite = null;
// ----------------------------

let pokemonData = null; // objekt med { results }
let filteredPokemonData = [];
let selectedPokemonIndex = -1;
// let selectedPokemon = null; // den valda pokemonnen
let myTeam = []; // här lägger du till pokemons till laget

myTeamBtn.addEventListener("click", () => {
	createMyTeamPopOverlay();
});
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

//HÄR SKAPAS INNEHÅLLET I MYTEAM I CARDSEN
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

		myTeam.forEach((pokemon, index) => {
			const pokemonId = `pokemon-${index}`; // create a unique identifier
			const newPokemonCard = document.createElement("div");
			const newPokemonImg = document.createElement("img");
			const newPokemonName = document.createElement("h5");
			const newChangeNameBtn = document.createElement("button");
			const newNameInput = document.createElement("input");
			const newRemoveBtn = document.createElement("button");
			const newUpBtn = document.createElement("button");
			const newDownBtn = document.createElement("button");

			// bind the unique identifier to the name element
			// newPokemonName.id = pokemonId;
			const nameId = `name-${index}`;
			newPokemonName.id = nameId;

			//  List for abilities
			let newAbilityList = document.createElement("ul");
			pokemon.abilities.forEach((object) => {
				console.log("object", object);
				const newAbilityItem = document.createElement("li");
				newAbilityItem.textContent = object.ability.name;
				newAbilityList.appendChild(newAbilityItem);
			});

			newChangeNameBtn.classList.add("changeNameBtn");
			newRemoveBtn.classList.add("removeBtn");
			newPokemonCard.classList.add("pokemon");
			newChangeNameBtn.innerText = "Rename";
			newNameInput.classList.add("nameInput");
			newNameInput.type = "text";
			newNameInput.value = "";
			newNameInput.style.display = "none";

			newChangeNameBtn.dataset.pokemonId = pokemonId;
			newPokemonCard.append(
				newPokemonImg,
				newPokemonName,
				newChangeNameBtn,
				newNameInput,
				newRemoveBtn,
				newUpBtn,
				newDownBtn
			);

			newRemoveBtn.innerText = "Remove";
			newPokemonName.innerText = pokemon.name;
			newPokemonImg.src = pokemon.sprites;

			newUpBtn.innerText = "Up";
			newUpBtn.classList.add("upBtn");

			newDownBtn.innerText = "Down";
			newDownBtn.classList.add("downBtn");

			newPokemonCard.append(
				newAbilityList,
				newPokemonName,
				newPokemonImg,
				newChangeNameBtn,
				newNameInput,
				newRemoveBtn,
				newUpBtn,
				newDownBtn
			);
			// console.log('här är denna ',pokemon.abilities);

			newPokemonImg.src = pokemon.sprites;
			newPokemonName.innerText = pokemon.name;

			newChangeNameBtn.addEventListener("click", (event) => {
				event.stopPropagation();
				selectedPokemonIndex = index;
				newPokemonCard.classList.add("selected");
				newPokemonName.style.display = "none";
				newChangeNameBtn.style.display = "none";
				newNameInput.style.display = "inline-block";
				newNameInput.focus();
			});

			newNameInput.addEventListener("blur", (event) => {
				event.stopPropagation();
				if (selectedPokemonIndex !== -1) {
					// check if a pokemon is selected
					// Create a new Pokemon object with the updated name
					const updatedPokemon = {
						...myTeam[selectedPokemonIndex],
						name: newNameInput.value,
					};
					// Replace the original Pokemon object in the myTeam array with the updated one
					myTeam[selectedPokemonIndex] = updatedPokemon;
					newPokemonName.innerText = updatedPokemon.name; // update the name displayed on the card
					newPokemonName.style.display = "inline-block";
					newChangeNameBtn.style.display = "inline-block";
					newNameInput.style.display = "none";
					newPokemonCard.classList.remove("selected"); // remove the CSS class from the selected card
					selectedPokemonIndex = -1; // reset the selected pokemon index
				}
			});

			newRemoveBtn.addEventListener("click", () => {
				myTeam.splice(index, 1);
				newPokemonCard.remove();
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

			// Så här skapas Pokemon cardet i MY TEAM
			newPokemonCard.append(
				newPokemonName,
				newPokemonImg,
				newAbilityList,
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
// DEN HÄR FUNKTIONEN HÄMTAR DATA IFRÅN API:ET
async function getPokemonData() {
	// sätt limit i url till 1000, så hämtar du fler pokemon. Offset ex = 5, då byter den ut 5 (plockar ut 5 pokemon efter 5.e plats )
	const url = "https://pokeapi.co/api/v2/pokemon?limit=200&offset=0";

	console.log("Nu hämtar Jag data i från API");
	const response = await fetch(url);
	const data = await response.json();

	// Problem: forEach väntar inte tills alla funktioner är färdiga
	let numberComplete = 0;
	data.results.forEach(async (pokemon) => {
		const pokemonUrl = pokemon.url;
		const pokemonResponse = await fetch(pokemonUrl);
		let onePokemon = await pokemonResponse.json();

		// Om du vill ha shiny byt på två ställen i koden
		pokemon.sprites = onePokemon.sprites.front_shiny;

		// pokemon.sprites = responseData.sprites.front_default;
		pokemon.abilities = onePokemon.abilities;
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
// NÅGOT MED SELECTED KNAPPEN
function renderFilteredPokemonData(filteredPokemons, popOverlayWhiteChoose) {
	// Clear the existing cards
	popOverlayWhiteChoose
		.querySelectorAll(".myChooseteam-card")
		.forEach((card) => card.remove());

	if (filteredPokemons) {
		pokemonCardDiv(filteredPokemons, popOverlayWhiteChoose);
	} else if (filteredPokemons) {
		filteredPokemons.forEach((pokemon) => {
			cardDiv.addEventListener("click", () => {
				console.log("du klickade på en pokemon");
				selectedPokemon = pokemon;
			});

			createCardSelectBtn(cardDiv);
		});
	}
}
// // HÄR SKAPAS ELEMENTEN I CHOOSEN OCH I VARJE ELEMENT FINNS EN SELECTBUTTON
function pokemonCardDiv(pokemonsToRender, popOverlayWhiteChoose) {
	const inputElement = popOverlayWhiteChoose.querySelector(".input");
	console.log(pokemonData.results);
	inputElement.addEventListener("keyup", () => {
		let inputValue = inputElement.value.toLowerCase();
		console.log(inputValue);

		let filteredPokemonData = pokemonData.results.filter(
			(pokemon) => pokemon.name.toLowerCase().indexOf(inputValue) !== -1
		);
		console.log(pokemonData);
		renderFilteredPokemonData(filteredPokemonData, popOverlayWhiteChoose);
	});

	pokemonsToRender.forEach((pokemon) => {
		let cardDiv = document.createElement("div");
		let cardImg = document.createElement("img");
		let name = document.createElement("h5");
		let abilityList = document.createElement("ul");

		pokemon.abilities.forEach((object) => {
			const abilityItem = document.createElement("li");
			abilityItem.textContent = object.ability.name;
			abilityList.appendChild(abilityItem);
		});

		let selectBtn = document.createElement("button");
		cardDiv.classList.add("myChooseteam-card");
		cardImg.classList.add("myChooseteam-image");
		name.classList.add("pokemonNametag");
		selectBtn.classList.add("selectBtn");
		selectBtn.textContent = "Select";

		name.innerText = pokemon.name;
		cardImg.src = pokemon.sprites;

		popOverlayWhiteChoose.append(cardDiv);
		cardDiv.append(name);
		cardDiv.append(cardImg);
		cardDiv.append(abilityList);
		cardDiv.append(selectBtn);

		selectBtn.addEventListener("click", () => {
			addPokemonToTeam(pokemon);
		});
	});
}
function addPokemonToTeam(pokemon) {
	if (myTeam.length < 1200) {
		myTeam.push(pokemon);

		// Check if the added Pokemon is one of the first three in the array
		if (myTeam.length <= 3) {
			const popup = document.createElement("div");
			popup.classList.add("popup");
			popup.textContent = "You have selected this Pokemon to the team!";

			document.body.appendChild(popup);

			setTimeout(() => {
				popup.remove();
			}, 1000);
		} else {
			const popup = document.createElement("div");
			popup.classList.add("popup");
			popup.textContent = "This Pokemon will be a reserve.";

			document.body.appendChild(popup);

			setTimeout(() => {
				popup.remove();
			}, 1000);
		}
	}

	return;
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
	});

	return selectBtn;
}
