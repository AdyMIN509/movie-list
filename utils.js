export function renderFilm(film, lsStorage = []) {
	
	const addClass = (lsStorage.map(el=>el.imdbID)).includes(film.imdbID) ? 'active' : '';

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
						<img src="./assets/plus-icon.svg" data-id='${film.imdbID}' alt="" class="watchlist-svg ${addClass}">
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

export function isInFilmObject(filmObjList,id) {
	return filmObjList.map(el=>el.imdbID).includes(id);
}

export function renderLoFilm(films, lsStorage = []) {
	return films.map(el=>renderFilm(el, lsStorage)).join('')
}