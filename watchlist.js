//class film-item är filmens container

const WatshlistContainer = document.getElementById("watchlist-container")

watchlist = JSON.parse(localStorage.getItem("WatchListKey")) || [];
console.log(watchlist)
let filmList = ''

watchlist.forEach(film => {
					
					const posterUrl = film.poster !== "N/A" ? film.poster : "https://dummyimage.com/300x450/cccccc/969696?text=No+Poster";
                    filmList += `
                        <div class="film-item">
                            <div class="film-poster">
                                <img class="film-poster-img" src="${posterUrl}" alt="Poster of ${film.title}" style="width: 100px;" onerror="this.src='https://dummyimage.com/300x450/cccccc/969696?text=No+Poster'">
                            </div>

                            <div class="film-details">
                                <h3>
									${film.title}
								</h3>
                                <p>
								 	⭐${film.rating}
								 </p>
                                <p>
									Length: ${film.runtime}
								</p>
                                <button class="add-watchlist-btn"
									data-id="${film.imdbID}"
  									data-title="${film.Title}"
  									data-poster="${posterUrl}"
  									data-rating="${film.imdbRating}"
  									data-runtime="${film.Runtime}"
  									data-plot="${film.Plot}">
  									Add +
								</button>
                                <p>
									Description: ${film.plot}
								</p>
                            </div>
                        </div>
                        <hr>
                    `;
                });
                WatshlistContainer.
				innerHTML = filmList;
			