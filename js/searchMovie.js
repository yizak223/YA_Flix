const OPTIONS = {
    method: 'GET',
    headers: {
        accept: ' application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDMwZDdkNmE3NWVmMjUzYjE3MWQxMzE0ZTNiOGY4ZiIsInN1YiI6IjY1MTViNTEwOTNiZDY5MDEzOGZjNjFjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnXvPBDGXfiOwqal9-lzl2zqjV-mLbJGJhCTg3gX7Vo'
    }
};
const BKG_IMG = document.querySelector('#backgImgContainer');


const FIRST_MOVIE_SEARCH = document.querySelector('#FIRSTmovieSEARCH')

const LIST_MOVIE_SEARCH = document.querySelector('#listMovieSearch')

const FETCH_MOVIE_SEARCH = (userSeach = 'batman') => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${userSeach}&include_adult=false&language=en-US&page=1`, OPTIONS)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const backdropPath = data.results[0].backdrop_path;
            const backgroundImageURL = `http://image.tmdb.org/t/p/w500${backdropPath}`;
            BKG_IMG.innerHTML+=`<img id='backgImg' src='${backgroundImageURL}'>`;
 
            

            // FIRST_MOVIE_SEARCH.innerHTML += '<h1 id="content">Hello</h1>';
        })
        .catch(err => console.error(err));
}
FETCH_MOVIE_SEARCH()

