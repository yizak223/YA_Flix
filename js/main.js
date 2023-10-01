const options = {
    method: 'GET',
    headers: {
      accept:' application/json',
      Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDMwZDdkNmE3NWVmMjUzYjE3MWQxMzE0ZTNiOGY4ZiIsInN1YiI6IjY1MTViNTEwOTNiZDY5MDEzOGZjNjFjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnXvPBDGXfiOwqal9-lzl2zqjV-mLbJGJhCTg3gX7Vo' 
      }
  };
  const moviesList=document.querySelector('#moviesList')

const fetchMovies=(numPage=1,time=`day`)=>{ fetch(`https://api.themoviedb.org/3/trending/movie/${time}?language=en-USpage=${numPage}`, options)
    .then(response => response.json())
    .then(data => 
       { console.log(data)
        data.results.forEach((movie) => {
          moviesList.innerHTML+=`<div class='movieCard'>
                                <img src='http://image.tmdb.org/t/p/w500${movie.poster_path}'>
                                <p>${movie.title} </p>
                                </div>`})})
    .catch(err => console.error(err));
}
fetchMovies(4,'week')

    