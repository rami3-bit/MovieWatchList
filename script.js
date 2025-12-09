document.getElementById("search-btn").addEventListener("click", function() {
	const searchBar = document.getElementById("search-bar").value

	if (searchBar) { 
        document.getElementById("explore").style.display = "none";
    }

fetch(`http://www.omdbapi.com/?t=${searchBar}&apikey=270adad6`)
	.then(res => res.json())
	.then(data =>  {
			console.log(data)

					const film = `
				<img src="${data.Poster}" alt="Poster of ${data.Title}" />
				<h3>Title: ${data.Title}</h3>
				<p>Year: ${data.Year}</p>
				<p>Rated: ${data.Rated}</p>
				<p>Released: ${data.Released}</p>
				<p>Runtime: ${data.Runtime}</p>
			`
			document.getElementById("search-result").innerHTML = film
console.log(film)
	})
})
