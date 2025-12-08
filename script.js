document.getElementById("search-btn").addEventListener("click", function() {
	const searchBar = document.getElementById("search-bar").value
fetch(`http://www.omdbapi.com/?t=${searchBar}&apikey=270adad6`)
	.then(res => res.json())
	.then(data =>  {
			console.log(data)
					const film = `
				Title: ${data.title}
				Year: ${data.year}
				Rated: ${data.rated}
				Released: ${data.released}
				Runtime: ${data.runtime}
			`
	})
})
