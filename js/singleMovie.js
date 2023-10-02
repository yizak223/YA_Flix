const MOVIE_ID_CONTAINER = document.querySelector('#movieByIdContainer')
const BACKG_IMG = document.querySelector('#backgImgContainer')


const MOVIE_ID_FETCH = (movie_id = 11) => {
    fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=bc1f09cc15ddc7d57d1d665f10e1e5a6&language=en-US&append_to_response=credits`)
        .then(response => response.json())
        .then(movieData => {
            console.log(movieData)
            BACKG_IMG.innerHTML += `<img id='backgImg' src='http://image.tmdb.org/t/p/w500${movieData.backdrop_path}'>`
            MOVIE_ID_CONTAINER.innerHTML += `<div id='containerMovie'> 
                                                <div id='contentContainer'>
                                                    <h1>${movieData.original_title}</h1>
                                                    <span>Year: ${movieData.release_date.substring(0,4)}</span> | Time: ${movieData.runtime}minutes
                                                </div>
                                                <img src='http://image.tmdb.org/t/p/w500${movieData.poster_path}'>
                                            </div>`
        })
}
MOVIE_ID_FETCH()