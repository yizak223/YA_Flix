let counter=0;
const OPTIONS = {
    method: 'GET',
    headers: {
        accept: ' application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDMwZDdkNmE3NWVmMjUzYjE3MWQxMzE0ZTNiOGY4ZiIsInN1YiI6IjY1MTViNTEwOTNiZDY5MDEzOGZjNjFjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnXvPBDGXfiOwqal9-lzl2zqjV-mLbJGJhCTg3gX7Vo'
    }}
let favourite_movies = JSON.parse(localStorage.getItem('favourite')) || [];
const DISPLAY_BEFORE = document.querySelector('#container')
const FAVORITE_CONTAINER = document.querySelector('#listMovieSearch')
const FAVORITE_FIRST = document.querySelector('#firstMovie')
console.log(JSON.parse(localStorage.getItem('favourite')));
    const MOVIE_FETCH=(id_movie_first)=>{
      fetch(`https://api.themoviedb.org/3/movie/${id_movie_first}?language=en-US`, OPTIONS)
      .then(response => response.json())
      .then(movie => {
        console.log(movie)
        const firstId = movie.id;
        const isLiked = favourite_movies.includes(movie.id); // Check if the movie ID is liked
        const likeButtonClass = isLiked ? 'userLiked' : '';
        FAVORITE_FIRST.innerHTML+=`<div id='containerPage'>
          <div id='containerMovie'>
            <div id='containerContent'>
              <div id='secContainerContent'>
                <div id='titleContainer'>
                  <h1>${movie.title}</h1>
                  <span>Published: ${movie.release_date}</span> | ID: ${movie.id}
                </div>
                <div id='paragrphContainer'></div>
                <br>
                <h6>${movie.overview}</h6>
                <div id='containerTrailer${counter}'></div>
              </div>
            </div>
            <div id='containerImgDetails'>
              <div>
                <img src='http://image.tmdb.org/t/p/w500${movie.poster_path}'>
              </div>
              <div class='ContainerRateImdb' >
                  <span class='imdbRate'>${movie.vote_average} <i class="fa fa-imdb" aria-hidden="true"></i>
                  </span>
                  <button class='likeBtn ${likeButtonClass}'> <i class="fa fa-thumbs-up" aria-hidden="true"></i> like</button>
              </div>
            </div>
          </div>
        </div>`;
        const containerTrailer=document.querySelector(`#containerTrailer${counter}`)
        console.log(containerTrailer);
        const USER_LIKED = document.querySelectorAll('.likeBtn');
        USER_LIKED.forEach((btn, i) => {
          btn.addEventListener('click', () => {
            btn.classList.toggle('userLiked');
              const userConfirmed = confirm('Are you sure you want to remove the movie from your favorites?');
              if (userConfirmed) {
                favourite_movies.splice(i, 1);
                location.reload();
              } else {
                btn.classList.add('userLiked');
                return;
              }
            localStorage.setItem('favourite', JSON.stringify(favourite_movies));
          });
        });

      })
      .catch(err => console.error(err));
    }
if (favourite_movies.length > 0) {
    DISPLAY_BEFORE.innerHTML = ``
    favourite_movies.forEach((movie) => {
        MOVIE_FETCH(movie)  
    });
}
else {
    console.log(false);
}