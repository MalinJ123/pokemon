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
	let popOverlayMyTeamBtn = document.createElement("div");
	let popOverlayWhite = document.createElement("div");
	let myTeamHeader = document.createElement("h2");
	myTeamHeader.classList.add("myTeamHeader");
	myTeamHeader.innerText = "Mitt Team";
	popOverlayMyTeamBtn.classList.add("PopOverlay-MyTeamBtn");
	popOverlayWhite.classList.add("popOverlayWhite");

	body.append(popOverlayMyTeamBtn);
	popOverlayMyTeamBtn.append(popOverlayWhite);
	popOverlayWhite.append(myTeamHeader);

  // skapa HTML för där de valda pokemonsen skall ligga
  myTeam.forEach(pokemon => {
    console.log(pokemon);
    let pokemonCard = document.createElement('article');
    pokemonCard.innerText = pokemon.name;
    popOverlayWhite.append(pokemonCard);
  });

	popOverlayWhite.addEventListener("click", (event) => {
		console.log("du klickade på den vita overlayen");
		event.stopPropagation();
	});
	popOverlayMyTeamBtn.addEventListener("click", () => {
		console.log("du klickade på den svarta overlayen");
		popOverlayMyTeamBtn.remove();
	});
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
		// console.log("du klickade choose VITA overlay knappen")
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

			createCardSelectBTn(cardDiv);
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

// function displaySelectedPokemon(popOverlayWhite) {
// 	if (selectedPokemon) {
// 		const newPokemonDiv = document.createElement("div");
// 		newPokemonDiv.classList.add("pokemon");
// 		const newPokemonImg = document.createElement("img");
// 		newPokemonImg.src = selectedPokemon.sprites;
// 		const newPokemonName = document.createElement("h5");
// 		newPokemonName.innerText = selectedPokemon.name;
// 		const newChangeNameBtn = document.querySelector("button");
// 		newChangeNameBtn.classList.add("changeNameBtn");
// 		newChangeNameBtn.placeholder = "Change name";

// 		newPokemonDiv.append(newPokemonImg, newPokemonName, newChangeNameBtn);
// 		popOverlayWhite.append(newPokemonDiv);

// 		const copiedSelectedPokemon = { ...selectedPokemon };
// 		myTeam.push(copiedSelectedPokemon); // add the copied object to the myTeam array

// 		console.log(
// 			"CopiedSelectedPokemon ser ut såhär i den nya listan",
// 			copiedSelectedPokemon
// 		);
// 		console.log("myTeam ser ut såhär", myTeam);
// 	} else {
// 		console.log("No pokemon selected");
// 	}
// }

const selectBtn = document.querySelector("#selectBtn");

// selectBtn.addEventListener("click", () => {
// 	displaySelectedPokemon(popOverlayWhite); // pass popOverlayWhite to the displaySelectedPokemon function
// });

//varför visas inte pokemonen i mitt team . . .
//Behöver jag spara i loakl storage?

//  Skulle kunna hämta results.Url
// och så skickar man ett request för hämta den pokemonen och så lägger man till den i den nya card diven.
