import { isInFilmObject, renderLoFilm } from "./utils.js";

// global vars
let localStorageData = JSON.parse(localStorage.getItem('movie-data'));

// Elements
const mainContent = document.getElementById('main-content');
const searchBtn = document.getElementById('searchMovie-btn');
const wacthListNav = document.getElementById('watchlist-nav');
const returnBtn = document.getElementById('search-btn');

if(localStorageData.length) {
	mainContent.innerHTML = renderLoFilm(localStorageData, localStorageData)
}

// Functions
function handleSearchBtClick() {
	localStorage.setItem('movie-data', JSON.stringify(localStorageData));
	goToIndexFile()
}

function goToIndexFile() {
	window.location.href = './index.html'
}

function handleGeneralClick(e) {
	const id = e.target.dataset.id;

	if(id) {
		if(isInFilmObject(localStorageData, id)) {
			localStorageData = localStorageData.filter(film=>film.imdbID !== id);
			console.log(localStorageData)
			if(!localStorageData.length) {
				mainContent.innerHTML = `
					<div class="default-content" id="watchlist-nav">
						<p class="defaul-p">Your watchlist is looking a little empty...</p>
						<button type="button" class="watch-btn" id="search-btn">
							<a href="./index.html" class="index-link">
								<img src="./assets/plus-icon.svg" alt="" class="watchlist-svg">
								Let’s add some movies!
							</a>
						</button>
					</div>
				`
			} else {
				mainContent.innerHTML = renderLoFilm(localStorageData,localStorageData)
			}
		}
	}
}

// Event
searchBtn.addEventListener('click', handleSearchBtClick);
wacthListNav.addEventListener('click', goToIndexFile);
document.addEventListener('click', handleGeneralClick);
console.log(returnBtn)
returnBtn.addEventListener('click', goToIndexFile)