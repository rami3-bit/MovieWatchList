

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
                                <h3>${film.Title}</h3>
                                <p> ⭐ ${film.imdbRating}</p>
                                <p>Length: ${film.Runtime}</p>
                                <button class="add-watchlist-btn"> Add watchlist + </button>
                                <p>Description: ${film.Plot}</p>
                            </div>
                        </div>
                        <hr>
                    `;
                });
                document.getElementById("search-result").
				innerHTML = filmList;
			//lägga till watchlist
				document.querySelectorAll(".add-watchlist-btn").forEach(btn => {
					btn.addEventListener("click", function() {
						const watchList = {}
						
                        console.log("clicked")
					
					})
				})
            });
		}
	})
})
