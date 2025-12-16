document.getElementById("search-btn").addEventListener("click", function() {
	const searchBar = document.getElementById("search-bar").value

	if (searchBar) { 
        document.getElementById("explore").style.display = "none";
    } 

fetch(`https://www.omdbapi.com/?s=${searchBar}&type=movie&apikey=270adad6`)
	.then(res => res.json())
	.then(data =>  {
			console.log(data)

			if (data.Response === "False") {
				document.getElementById("search-result").innerHTML = `<p>${data.Error}</p>`;
			} else {                

  // Gör API-anrop för varje film för att få FULL data
            const promises = data.Search.map(film => 
                fetch(`https://www.omdbapi.com/?i=${film.imdbID}&apikey=270adad6`)
                    .then(res => res.json())
            );

            // Vänta på ALLA svar innan du visar HTML
            Promise.all(promises).then(films => {
				 
                let filmList = '';

                films.forEach(film => {
					const posterUrl = film.Poster !== "N/A" ? film.Poster : "https://dummyimage.com/300x450/cccccc/969696?text=No+Poster";
                    filmList += `
                        <div class="film-item">
                            <div class="film-poster">
                                <img class="film-poster-img" src="${posterUrl}" alt="Poster of ${film.Title}" style="width: 100px;" onerror="this.src='https://dummyimage.com/300x450/cccccc/969696?text=No+Poster'">
                            </div>

                            <div class="film-details">
                                <h3>
									${film.Title}
								</h3>
                                <p>
								 	⭐${film.imdbRating}
								 </p>
                                <p>
									Length: ${film.Runtime}
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
									Description: ${film.Plot}
								</p>
                            </div>
                        </div>
                        <hr>
                    `;
                });
                document.getElementById("search-result").innerHTML = filmList;

// lägg till toast-container en gång
let toast = document.getElementById("toast");
if (!toast) {
    const el = document.createElement("div");
    el.id = "toast";
    document.body.appendChild(el);
}

				document.querySelectorAll(".add-watchlist-btn").forEach(btn => {
                    btn.addEventListener("click", function() {
                        const watchListObj = {
                            imdbID: this.dataset.id,
                            title: this.dataset.title,
                            poster: this.dataset.poster,
                            rating: this.dataset.rating,
                            runtime: this.dataset.runtime,
                            plot: this.dataset.plot,
                        };

                        const key = "WatchListKey";
                        const list = JSON.parse(localStorage.getItem(key)) || [];
                        const exists = list.some(f => f.imdbID === watchListObj.imdbID);

                        const t = document.getElementById("toast");
                        if (exists) {
                            t.textContent = `${watchListObj.title} already in watchlist`;
                            t.classList.add("show");
                            setTimeout(() => t.classList.remove("show"), 2000);
                            return; // stoppa så inget sparas
                        }

                        list.push(watchListObj);
                        localStorage.setItem(key, JSON.stringify(list));
                        t.textContent = `${watchListObj.title} added to watchlist`;
                        t.classList.add("show");
                        setTimeout(() => t.classList.remove("show"), 2000);
                    });
                });
            });
		}
	})
})
