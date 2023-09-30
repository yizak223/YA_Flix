const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjNjNzViMWI2ZDUwMGNkMjgzZjU0MmU4ZTFlZDJkYSIsInN1YiI6IjVjMDNiNDQwMGUwYTI2NDg2YTA2ZjYwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pj6auQlw-VfPG6PenA6MbujH_SQk3Xr3LmD6H9WdH04'
    }
  };
  const moviesList=document.querySelector('#moviesList')

const fetchMovies=(numPage=1)=>{ fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${numPage}`, options)
    .then(response => response.json())
    .then(data => 
       { console.log(data)
        data.results.forEach((movie,i) => {
          moviesList.innerHTML+=`<div class='movieCard'>
            <img src='http://image.tmdb.org/t/p/w500${movie.poster_path}'>
            <p>${movie.title} </p>
            </div>
                                     `
        });
                }
        )
    .catch(err => console.error(err));
}
fetchMovies(4)

    