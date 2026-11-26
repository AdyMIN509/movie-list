import { renderLoFilm } from "./utils.js";

// global vars
let lsData = JSON.parse(localStorage.getItem('movie-data'));

// Elements
const mainContent = document.getElementById('main-content');

console.log(lsData)
if(lsData) {
	console.log(lsData)
	mainContent.innerHTML = renderLoFilm(lsData, lsData)
}