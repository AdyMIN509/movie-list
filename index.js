import { isInFilmObject, renderFilm } from "./utils.js";

// API
const APIKey = '5cf89770';
const BASEURL= `https://www.omdbapi.com/?apikey=${APIKey}`;

// Global variable
let fetchedData = [];
let localStorageData = JSON.parse(localStorage.getItem('movie-data')) || [];

// DOM element
const mainContent = document.getElementById('main-content')
const form = document.getElementById('form');
const myWatchListBtn = document.getElementById('myWatchList-btn');

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

		mainContent.innerHTML = '';

		for (let film of out) {
			try {
				
				const res = await fetch(`${BASEURL}&plot=short&i=${film.imdbID}`);
				const val = await res.json();
				if(val.Response === 'False') continue;
				const  {imdbID, Title, imdbRating, Runtime, Genre, Plot, Poster} = val;
				const filmObj = {imdbID, Title, imdbRating, Runtime, Genre, Plot, Poster};
				fetchedData.push(filmObj);
				mainContent.innerHTML += renderFilm(film, localStorageData);
			} catch (e) {
				console.error(e)
			}
		}
	} catch(e) {
		console.error(e)
	}
}

function handleSubmit(e) {
	e.preventDefault();

	const formData = new FormData(form);
	getSearchData(formData.get('search-value'));
}

function handleWatchListClick(e) {
	const val = e.target.dataset.id;
	const imgElement = document.querySelector(`img[data-id='${val}']`);
	if(val) {
		const filmObj = fetchedData.filter(el=>el.imdbID === val)[0];
		if(isInFilmObject(localStorageData, val)) {
			localStorageData = localStorageData.filter(el => el.imdbID !== val);
		} else {
			localStorageData.unshift(filmObj)
		};
		imgElement.classList.toggle('active');
	}
}

function handleMyWatchListClick() {
	localStorage.setItem('movie-data', JSON.stringify(localStorageData));
	window.location.href = './movieList.html';
}

// Event listener
form.addEventListener('submit', handleSubmit);
mainContent.addEventListener('click', handleWatchListClick);
myWatchListBtn.addEventListener('click', handleMyWatchListClick);