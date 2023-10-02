const MOVIE_ID_CONTAINER = document.querySelector('#movieByIdContainer')
const BACKG_IMG = document.querySelector('#backgImgContainer')


const MOVIE_ID_FETCH = (movie_id = 11) => {
    fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=bc1f09cc15ddc7d57d1d665f10e1e5a6&language=en-US&append_to_response=credits`)
        .then(response => response.json())
        .then(movieData => {
            console.log(movieData)
            BACKG_IMG.innerHTML += `<img id='backgImg' src='http://image.tmdb.org/t/p/w500${movieData.backdrop_path}'>`
            MOVIE_ID_CONTAINER.innerHTML += `<div id='containerMovie'> 
                                                    <div id='containerContent'>
                                                        <div id='secContainerContent'>
                                                            <div id='titleContainer'>
                                                                <h1>${movieData.original_title}</h1>
                                                                <span>Year: ${movieData.release_date.substring(0, 4)}</span> | Time: ${movieData.runtime}minutes
                                                            </div>
                                                            <div id='paragrphContainer'> 
                                                                <span>Directed By: ${movieData.credits.crew[0].name}</span>
                                                            </div>
                                                            <br>
                                                            <h6>${movieData.overview}</h6>
                                                            <div id='containerTrailer'></div>
                                                        </div>
                                                    </div>    
                                                    <div id='containerImgDetails'>
                                                        <img src='http://image.tmdb.org/t/p/w500${movieData.poster_path}'>
                                                        <div id='likeRate'>
                                                            <span id='rate'>Rate: ${movieData.vote_average} <i class="fa fa-star" aria-hidden="true"></i></span>
                                                            <button class='likeBtn'> <i class="fa fa-thumbs-up" aria-hidden="true"></i> like</button>
                                                        </div>
                                                    </div>
                                            </div>`
            const LIKE_BTNS = document.querySelectorAll('.likeBtn');
            console.log(LIKE_BTNS);

            LIKE_BTNS.forEach(likeBtn  => {
                addEventListener('click', () => {
                    likeBtn.classList.toggle("userLiked");
                });
            })
        })
}
// <span>Language: ${movieData.spoken_languages[0].name}</span>

const OPTIONS = {
    method: 'GET',
    headers: {
        accept: ' application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDMwZDdkNmE3NWVmMjUzYjE3MWQxMzE0ZTNiOGY4ZiIsInN1YiI6IjY1MTViNTEwOTNiZDY5MDEzOGZjNjFjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnXvPBDGXfiOwqal9-lzl2zqjV-mLbJGJhCTg3gX7Vo'
    }
};
const TRAILER_FETCH = (movie_id = 11) => {
    fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`, OPTIONS)
        .then(response => response.json())
        .then(trailer => {
            console.log(trailer)
            containerTrailer.innerHTML += ` <iframe width="550" height="315" src="https://www.youtube.com/embed/${trailer.results[0].key}" frameborder="0" allowfullscreen></iframe>
        `
        })
}

MOVIE_ID_FETCH()
TRAILER_FETCH()
