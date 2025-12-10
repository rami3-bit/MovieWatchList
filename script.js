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
			} else {                let filmList = '';

                // Iterera över varje film i data.Search
                data.Search.forEach(film => {
					
                    filmList += `
                            <div class="film-item">
								<div class="film-poster">
                                	<img src="${film.Poster}" alt="Poster of ${film.Title}" style="width: 100px;">
								</div>
								<div class="film-details">
                                	<h3>${film.Title}</h3>
                                	<p> ⭐ ${film.imdbRating}</p>
                                	<p>Length: ${film.Runtime}</p>
									<p>Add watchlist + </p>
                                	<p>Description: ${film.Plot}</p>
								</div>
                            </div>
							<hr>
                    `;
					document.getElementById("search-result").innerHTML = filmList;
                });
			}
	})
})
