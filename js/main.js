const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjNjNzViMWI2ZDUwMGNkMjgzZjU0MmU4ZTFlZDJkYSIsInN1YiI6IjVjMDNiNDQwMGUwYTI2NDg2YTA2ZjYwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pj6auQlw-VfPG6PenA6MbujH_SQk3Xr3LmD6H9WdH04'
    }
  };
  const title=document.querySelector('#title')
  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=3', options)
    .then(response => response.json())
    .then(data => 
       { console.log(data)
        data.results.forEach((movie,i) => {
            title.innerHTML+=`<h1>${i+1}.${movie.title} </h1> 
            <img src='http://image.tmdb.org/t/p/w500${movie.poster_path}'>
                                     `
        });
                }
        )
    .catch(err => console.error(err));

    