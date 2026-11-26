import { testData } from "./data.js";
import { renderFilm } from "./utils.js";

// API
const APIKey = '5cf89770';
const BASEURL= `https://www.omdbapi.com/?apikey=${APIKey}`;

// Global variable
let fetchedData = [];
let localStorageData = [];

// DOM element
const mainContent = document.getElementById('main-content')
const form = document.getElementById('form');
const myWatchListBtn = document.getElementById('myWatchList-btn');
const addBtn = document.getElementById('add-btn');

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
				mainContent.innerHTML += renderFilm(film);
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
	const status = e.target.dataset.status;
	if(val) {
		if(status === 'true'){
			const filmObj = fetchedData.filter(el=>el.imdbID === val)[0];
			if(localStorageData.length > 0) {
				const IdList = localStorageData.map(el=>el.imdbID);
				if(!IdList.includes(val)) {
					localStorageData.push(filmObj);
				}
			} else {
				localStorageData.push(filmObj);
			}
		} else {
			localStorageData = localStorageData.filter(el=>el.imdbID !== val);
		}
		e.target.dataset.status = status === 'false' ? 'true' : 'false';
		document.querySelector(`img[data-id='${val}']`).classList.toggle('active');
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