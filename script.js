document.getElementById("search-btn").addEventListener("click", function() {
	const searchBar = document.getElementById("search-bar").value

	if (searchBar) { 
        document.getElementById("explore").style.display = "none";
    } 

fetch(`http://www.omdbapi.com/?s=${searchBar}&type=movie&apikey=270adad6`)
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
                            <img src="${film.Poster}" alt="Poster of ${film.Title}" style="width: 100px;">
                            <h3>Title: ${film.Title}</h3>
                            <p>Year: ${film.Year}</p>
                        </div>
                    `;
                });

                // Sätt in hela listan av filmer i search-result elementet
                document.getElementById("search-result").innerHTML = filmList;
			}
	})
})
