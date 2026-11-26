import { testData } from "./data.js";

// API
const APIKey = '5cf89770';
const BASEURL= `http://www.omdbapi.com/?apikey=${APIKey}`;

// Global variable
let fetchedData = [];
let localStorageData = [];

// DOM element
const mainContent = document.getElementById('main-content')
const form = document.getElementById('form');

// Functions
async function getSearchData(title) {
	try {
		const parameters = {
			method: 'GET',
			header: {
				'Content-type': 'application/json'
			}
		}

		const res = await fetch(`${BASEURL}&s=${encodeURIComponent(title)}`, parameters);
			
		const data = await res.json();
		const out = data.Search;
		fetchedData = [];

		for (let film of out) {
			try {
				
				const res = await fetch(`${BASEURL}&plot=short&i=${film.imdbID}`);
				const val = await res.json();
				console.log(val.Response);
				if(!val.Response) continue;
				const  {imdbID, Title, imdbRating, Runtime, Genre, Plot, Poster} = val;
				const filmObj = {imdbID, Title, imdbRating, Runtime, Genre, Plot, Poster};
				fetchedData.push(filmObj);
				if(fetchedData.length === 1) {
					mainContent.innerHTML = renderFilm(filmObj);
				} else {
					mainContent.innerHTML += renderFilm(filmObj);
				}
			} catch (e) {
				console.error(e)
			}
		}
	} catch(e) {
		console.error(e)
	}
}

function renderFilm(film) {
	return `
		 <section class="film" id='${film.imdbID}'>
			<img src="${film.Poster}" class="poster">
			<div class="film-info">
				<div class="title-rating">
					<h2 class="title">${film.Title}</h2>
					<p class="rating"><img src="./assets/star-icon.svg"/>${film.imdbRating}</p>
				</div>
				<div class="additional-info">
					<p class="duration">${film.Runtime}</p>
					<p class="type">${film.Genre}</p>
					<button type="button" class="watch-btn" data-id='${film.imdbID}'>
						<img src="./assets/plus-icon.svg" data-id='${film.imdbID}' alt="" class="watchlist-svg">
						Watchlist
					</button>
				</div>
				<p class="description">
					${film.Plot}
				</p>
			</div>
		 </section>
		 <hr>
	`
}

function handleSubmit(e) {
	e.preventDefault();

	const formData = new FormData(form);
	getSearchData(formData.get('search-value'));
}

function handleWatchListClick(e) {
	const val = e.target.dataset.id;
	if(val) {
		const filmObj = fetchedData.filter(el=>el.imdbID === val)[0];
		if(localStorageData.length > 0) {
			const IdList = localStorageData.map(el=>el.imdbID);
			if(!IdList.includes(val)) {
				console.log('Added!')
				localStorageData.push(filmObj);
			}
		} else {
			localStorageData.push(filmObj);
			console.log("Added!")
		}
	}
}

// Event listener
form.addEventListener('submit', handleSubmit);
mainContent.addEventListener('click', handleWatchListClick)