let favourite_movies = JSON.parse(localStorage.getItem('favourite')) || [];
console.log(JSON.parse(localStorage.getItem('favourite')));
const DISPLAY_BEFORE = document.querySelector('#container')
const FAVORITE_CONTAINER=document.querySelector('#listMovieSearch')
const OPTIONS = {
    method: 'GET',
    headers: {
        accept: ' application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDMwZDdkNmE3NWVmMjUzYjE3MWQxMzE0ZTNiOGY4ZiIsInN1YiI6IjY1MTViNTEwOTNiZDY5MDEzOGZjNjFjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnXvPBDGXfiOwqal9-lzl2zqjV-mLbJGJhCTg3gX7Vo'
    }
}
const FETCH_MOVIE = (idMovie) => {
    fetch(`https://api.themoviedb.org/3/movie/${idMovie}?language=en-US`, OPTIONS)
        .then(response => response.json())
        .then(movie => {
            console.log(movie)
            const isLiked = favourite_movies.includes(movie.id); 
            const likeButtonClass = isLiked ? 'userLiked' : '';
            FAVORITE_CONTAINER.innerHTML += `<div class='movieCardList'>
            <img src='http://image.tmdb.org/t/p/w500${movie.poster_path}'> 
            <span class='idMovieContainer'> ${movie.title}</span>
            <button class='likeBtn ${likeButtonClass}'> <i class="fa fa-thumbs-up" aria-hidden="true"></i> like</button>
          </div>`
 
            const USER_LIKED = document.querySelectorAll('.likeBtn');
            USER_LIKED.forEach((btn, i) => {
                btn.addEventListener('click', () => {
                    btn.classList.toggle('userLiked');
                    const movieId = movie.id;
                    const movieIndex = favourite_movies.indexOf(movieId);
                    if (movieIndex === -1) {
                        favourite_movies.push(movieId);
                    } else {
                        const userConfirmed = confirm('Are you sure you want to remove the movie from your favorites?');
                        if (userConfirmed) {
                            favourite_movies.splice(movieIndex, 1);
                            
                            location.reload();
                        } else {
                            btn.classList.add('userLiked');
                            return;
                        }
                    }
                    localStorage.setItem('favourite', JSON.stringify(favourite_movies));
                });
            });
        })

        .catch(err => console.error(err));
}

if (favourite_movies.length > 0) {
    console.log(true);
    DISPLAY_BEFORE.innerHTML = ``
    favourite_movies.forEach((movie) => {
        FETCH_MOVIE(movie)
    });
}
else {
    console.log(false);
}




