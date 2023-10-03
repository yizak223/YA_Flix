const OPTIONS = {
    method: 'GET',
    headers: {
        accept: ' application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDMwZDdkNmE3NWVmMjUzYjE3MWQxMzE0ZTNiOGY4ZiIsInN1YiI6IjY1MTViNTEwOTNiZDY5MDEzOGZjNjFjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnXvPBDGXfiOwqal9-lzl2zqjV-mLbJGJhCTg3gX7Vo'
    }
};
const MOVIE_ID_CONTAINER = document.querySelector('#movieByIdContainer')
const BACKG_IMG = document.querySelector('#backgImgContainer')

const MOVIE_ID_FETCH = (movie_id = 5) => {
    fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=bc1f09cc15ddc7d57d1d665f10e1e5a6&language=en-US&append_to_response=credits`)
        .then(response => response.json())
        .then(movieData => {
            if(movieData.success==false){
                BACKG_IMG.innerHTML += `<img id='backgImg' src='https://cdn.w600.comps.canstockphoto.co.il/%D7%91%D7%95%D7%9C-%D7%A9%D7%9C-%D7%92%D7%95%D7%9E%D7%99-%D7%9C%D7%90-%D7%A7%D7%99%D7%99%D7%9D-%D7%A6%D7%99%D7%95%D7%A8_csp40308695.jpg'>`
                MOVIE_ID_CONTAINER.innerHTML=`<div id='wrongId'><h1>This movie number does not exist</h1>
                                              <button><h2>Search for another<h2></button></div>`
            }
            console.log(movieData)
            BACKG_IMG.innerHTML += `<img id='backgImg' src='http://image.tmdb.org/t/p/w500${movieData.backdrop_path}'>`
            MOVIE_ID_CONTAINER.innerHTML += `<div id='containerPage'>
                                                <div id='containerMovie'> 
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
                                                </div><h1>CREW</h1>
                                               <div id="containerActors"></div> 
                                                <i class="fa fa-arrow-left arrowsClicked" aria-hidden="true"></i>
                                                <i class="fa fa-arrow-right arrowsClicked" aria-hidden="true"></i>
                                                </div>`
            const CONTAINER_ACTORS = document.querySelector('#containerActors')
            movieData.credits.crew.forEach((actor,i) => {
                if(i>1){
                    CONTAINER_ACTORS.innerHTML+=`<div class='cardActor'>
                                                
                                            <div class='containerImg'><img class='profileActor' src='http://image.tmdb.org/t/p/w500${actor.profile_path}' onerror="this.src='https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg';"></div>
                                            <p>${actor.name} <br>Role: ${actor.job}</p>
                                           </div> `
                }
                
            })

            const LIKE_BTNS = document.querySelectorAll('.likeBtn');
            LIKE_BTNS.forEach(likeBtn => {
                likeBtn.addEventListener('click', () => {
                    likeBtn.classList.toggle("userLiked");
                });
            })
        })
        .catch(err => console.error(err));
}
const TRAILER_FETCH = (movie_id = 5) => {

    fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`, OPTIONS)
        .then(response => response.json())
        .then(trailer => {
            console.log(trailer)
            containerTrailer.innerHTML += ` <iframe width="550" height="315" src="https://www.youtube.com/embed/${trailer.results[0].key}" frameborder="0" allowfullscreen></iframe>
        `
        })
}
const SEARCH_BTN=document.querySelector('#searchBTN')
const ID_MOVIE_USER=document.querySelector('#idMovieUser')

SEARCH_BTN.addEventListener('click',()=>{
    MOVIE_ID_CONTAINER.innerHTML=``
    MOVIE_ID_FETCH(ID_MOVIE_USER.value)
    TRAILER_FETCH(ID_MOVIE_USER.value)
})



// fetch(`https://api.themoviedb.org/3/movie/11/credits?language=en-US`, OPTIONS)
//     .then(response => response.json())
//     .then(player => { console.log(player); })
//     .catch(err => console.error(err));