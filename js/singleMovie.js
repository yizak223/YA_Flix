const singleMovieFetch = (movieId = 12) => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=bc1f09cc15ddc7d57d1d665f10e1e5a6&language=en-US&append_to_response=credits`)
    .then(response => {response.json()})
    .then(movieData => { console.log(movieData); })
    .catch(err => console.error(err))
}
singleMovieFetch()