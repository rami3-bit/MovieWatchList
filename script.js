document.getElementById("search-btn").addEventListener("click", function() {
	const searchBar = document.getElementById("search-bar").value

	if (searchBar) { 
        document.querySelector("article").style.display = "none";
    }

fetch(`http://www.omdbapi.com/?t=${searchBar}&apikey=270adad6`)
	.then(res => res.json())
	.then(data =>  {
			console.log(data)
					const film = `
				<h3>Title: ${data.title}</h3>
				<p>Year: ${data.year}</p>
				<p>Rated: ${data.rated}</p>
				<p>Released: ${data.released}</p>
				<p>Runtime: ${data.runtime}</p>
			`
			
	})
})
