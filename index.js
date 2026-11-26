import { testData } from "./data.js";

// API
const APIKey = '5cf89770'
const BASEURL= `http://www.omdbapi.com/?apikey=${APIKey}`


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

		let result = [];

		for (let film of out) {
			const res = await fetch(`${BASEURL}&plot=short&i=${film.imdbID}`);
			const val = await res.json();
			const  {imdbID, Title, imdbRating, Runtime, Genre, Plot} = val;
			result.push({imdbID, Title, imdbRating, Runtime, Genre, Plot})
		}
		console.log(result);
	} catch(e) {
		console.error(e)
	}
}

getSearchData('spider man no way home');