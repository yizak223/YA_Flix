
const OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDMwZDdkNmE3NWVmMjUzYjE3MWQxMzE0ZTNiOGY4ZiIsInN1YiI6IjY1MTViNTEwOTNiZDY5MDEzOGZjNjFjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnXvPBDGXfiOwqal9-lzl2zqjV-mLbJGJhCTg3gX7Vo'
    }
};

fetch('https://api.themoviedb.org/3/search/movie?query=batman&include_adult=false&language=en-US&page=1', OPTIONS)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
const BKG_IMG = document.querySelector('#backgImgContainer');
const FIRST_MOVIE_SEARCH = document.querySelector('#FIRSTmovieSEARCH')
const MOVIE_BY_ID = document.querySelector('#movieByIdContainer')

const FETCH_MOVIE_SEARCH = (userSeach, numpage = 1) => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${userSeach}&include_adult=false&language=en-US&page=${numpage}`, OPTIONS)
        .then(response => response.json())
        .then(data => {
            if (data.total_results == 0) {
                BKG_IMG.innerHTML = `<img id='backgImg' src='https://www.wpoven.com/blog/wp-content/uploads/2022/09/error-404.png'>`
                MOVIE_BY_ID.innerHTML = `<div id='wrongId'><h1>This movie number does not exist</h1>
                                              <button><h2>Search for another<h2></button></div>`
            }
            else {
                console.log(data);
                const firstMovie = data.results[0]
                const firstId = firstMovie.id
                BKG_IMG.innerHTML = `<img id='backgImg' src='http://image.tmdb.org/t/p/w500${data.results[0].backdrop_path}'>`
                FIRST_MOVIE_SEARCH.innerHTML = `<div id='containerPage'>
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
                                                <div id="btnPage">
                                                <button class="paginationBtn">1</button>
                                                <button class="paginationBtn">2</button>
                                                <button class="paginationBtn">3</button>
                                                <button class="paginationBtn">4</button>
                                                <button class="paginationBtn">5</button>
                                            </div>
                                            </div>`

                const LIST_MOVIE_SEARCH = document.querySelector('#listMovieSearch')
                const TRAILER_FETCH = (movie_id) => {

                    fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`, OPTIONS)
                        .then(response => response.json())
                        .then(trailer => {
                            console.log(trailer)
                            containerTrailer.innerHTML += ` <iframe width="550" height="315" src="https://www.youtube.com/embed/${trailer.results[0].key}" frameborder="0" allowfullscreen></iframe>`
                        })
                }
                TRAILER_FETCH(firstId)
                data.results.forEach(movie => {
                    LIST_MOVIE_SEARCH.innerHTML += `<div class='movieCard'>
                     <img src='http://image.tmdb.org/t/p/w500${movie.poster_path}' onerror="this.src='https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg';">
                     <button class='likeBtn'> <i class="fa fa-thumbs-up" aria-hidden="true"></i> like</button>
                     <span class='idMovieContainer'>ID: ${movie.id}</span>
                     </div>`

                });
                const USER_LIKED = document.querySelectorAll('.likeBtn')
                USER_LIKED.forEach((btn) => {
                    btn.addEventListener('click',()=>{
                        btn.classList.toggle("userLiked"); 
                    })  
                  });
                const MORE_MOVIES=document.querySelector('#titleMoreMovies')
                MORE_MOVIES.addEventListener('click',()=>{
                    FETCH_MOVIE_SEARCH(ID_MOVIE_USER.value, ++numpage)
                })
                const PAGINTION_BTN = document.querySelectorAll('.paginationBtn')
                PAGINTION_BTN.forEach(BTN => {
                    BTN.addEventListener('click', () => {
                        let numPageUser = BTN.textContent
                        FETCH_MOVIE_SEARCH(ID_MOVIE_USER.value, numPageUser)
                        console.log(1);
                        PAGINTION_BTN.forEach((btn) => {
                            btn.classList.remove('paginationBtnActive');
                            console.log(2);
                        })
                        console.log(3);
                        BTN.classList.add('paginationBtnActive')
                    })
                })
            }
        })

        .catch(err => console.error(err));
}


// MOVIE_BY_ID.innerHTML = ``
// FIRST_MOVIE_SEARCH.innerHTML = ``
// FETCH_MOVIE_SEARCH('BATMAN')

const SEARCH_BTN = document.querySelector('#searchBTN')
const ID_MOVIE_USER = document.querySelector('#idMovieUser')

SEARCH_BTN.addEventListener('click', () => {
    MOVIE_BY_ID.innerHTML = ``
    FIRST_MOVIE_SEARCH.innerHTML = ``
    FETCH_MOVIE_SEARCH(ID_MOVIE_USER.value)
})




