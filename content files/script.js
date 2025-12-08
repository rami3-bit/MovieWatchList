fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=270adad6`)
	.then(res => res.json())
	.then(data => console.log(data))