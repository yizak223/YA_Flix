const OPTIONS = {
    method: 'GET',
    headers: {
        accept: ' application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDMwZDdkNmE3NWVmMjUzYjE3MWQxMzE0ZTNiOGY4ZiIsInN1YiI6IjY1MTViNTEwOTNiZDY5MDEzOGZjNjFjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnXvPBDGXfiOwqal9-lzl2zqjV-mLbJGJhCTg3gX7Vo'
    }
};
const BKG_IMG = document.querySelector('#backgImgContainer');
const FIRST_MOVIE_SEARCH = document.querySelector('#FIRSTmovieSEARCH')

const FETCH_MOVIE_SEARCH = (userSeach = 'batman') => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${userSeach}&include_adult=false&language=en-US&page=1`, OPTIONS)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const firstMovie = data.results[0]
            const firstId = firstMovie.id
            BKG_IMG.innerHTML += `<img id='backgImg' src='http://image.tmdb.org/t/p/w500${data.results[0].backdrop_path}'>`
            FIRST_MOVIE_SEARCH.innerHTML += `<div id='containerPage'>
                                            <div id='containerMovie'> 
                                                <div id='containerContent'>
                                                    <div id='secContainerContent'>
                                                        <div id='titleContainer'>
                                                            <h1>${firstMovie.title}</h1>
                                                            <span>Published: ${firstMovie.release_date}</span> | ID: ${firstId}
                                                        </div>
                                                        <div id='paragrphContainer'> 
                                                           
                                                        </div>
                                                        <br>
                                                        <h6>${firstMovie.overview}</h6>
                                                        <div id='containerTrailer'></div>
                                                    </div>
                                                </div>    
                                                <div id='containerImgDetails'>
                                                    <img src='http://image.tmdb.org/t/p/w500${firstMovie.poster_path}'>
                                                    <div id='likeRate'>
                                                        <span id='rate'>Rate: ${firstMovie.vote_average} <i class="fa fa-star" aria-hidden="true"></i></span>
                                                        <button class='likeBtn'> <i class="fa fa-thumbs-up" aria-hidden="true"></i> like</button>
                                                    </div>
                                                </div> 
                                            </div><h4 id='titleMoreMovies'>More from this movie</h4>                                        
                                            <div  id="listMovieSearch"></div>
                                        </div>
`
            const LIST_MOVIE_SEARCH = document.querySelector('#listMovieSearch')
            const TRAILER_FETCH = (movie_id = 268) => {

                fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`, OPTIONS)
                    .then(response => response.json())
                    .then(trailer => {
                        console.log(trailer)
                        containerTrailer.innerHTML += ` <iframe width="550" height="315" src="https://www.youtube.com/embed/${trailer.results[0].key}" frameborder="0" allowfullscreen></iframe>
                                                `
                    })
            }
            TRAILER_FETCH(firstId)
            data.results.forEach(movie => {
                 LIST_MOVIE_SEARCH.innerHTML += `<div class='movieCard'>
                 <img src='http://image.tmdb.org/t/p/w500${movie.poster_path}'>
                 </div>`
                
            });
           
        })

        .catch(err => console.error(err));
}
FETCH_MOVIE_SEARCH()




const SEARCH_BTN = document.querySelector('#searchBTN')
const ID_MOVIE_USER = document.querySelector('#idMovieUser')

SEARCH_BTN.addEventListener('click', () => {
    FIRST_MOVIE_SEARCH.innerHTML = ``
    FETCH_MOVIE_SEARCH(ID_MOVIE_USER.value)
})

