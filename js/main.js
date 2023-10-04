const OPTIONS = {
  method: 'GET',
  headers: {
    accept: ' application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDMwZDdkNmE3NWVmMjUzYjE3MWQxMzE0ZTNiOGY4ZiIsInN1YiI6IjY1MTViNTEwOTNiZDY5MDEzOGZjNjFjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnXvPBDGXfiOwqal9-lzl2zqjV-mLbJGJhCTg3gX7Vo'
  }
};
const MAIN_MOVIE=document.querySelector('#mainMovie')
const MOVIE_LIST = document.querySelector('#moviesList')
let favourite_movies = JSON.parse(localStorage.getItem('favourite')) || []; // Initialize from local storage
const array_favorite=[]
const FETCH_MOVIES = (numPage = 1, time = `day`) => {
  fetch(`https://api.themoviedb.org/3/trending/movie/${time}?language=en-US&page=${numPage}`,OPTIONS)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      data.results.forEach((movie) => {
        const isLiked = favourite_movies.includes(movie.title); // Check if the movie is liked
        const likeButtonClass = isLiked ? 'userLiked' : ''; // Apply 'userLiked' class if liked
        MOVIE_LIST.innerHTML += `<div class='movieCardList'>
        <img src='http://image.tmdb.org/t/p/w500${movie.poster_path}'>
        <button class='likeBtn ${likeButtonClass}'> <i class="fa fa-thumbs-up" aria-hidden="true"></i> like</button>
        <span class='idMovieContainer'>ID: ${movie.id}</span>
      </div>`;})
      const USER_LIKED = document.querySelectorAll('.likeBtn')
      USER_LIKED.forEach((btn,i) => {
        btn.addEventListener('click',()=>{
            btn.classList.toggle("userLiked"); 
            const movieTitle = data.results[i].title;
            // if (typeof favourite === 'defined') {
            //   localStorage.setItem('favouriteee',JSON.stringify(favourite_movies))
            // } 
            const movieIndex = favourite_movies.indexOf(movieTitle);
            if (movieIndex === -1) {
              favourite_movies.push(movieTitle); // Not in liked list, add it
            } else {
              favourite_movies.splice(movieIndex, 1); // Already in liked list, remove it
            }
            localStorage.setItem('favourite', JSON.stringify(favourite_movies));
        })  
      });
    })
    .catch(err => console.error(err));
}
console.log(localStorage.getItem('favourite'));
console.log(JSON.parse(localStorage.getItem('favourite')));
// console.log(JSON.parse(localStorage.getItem('favouriteee')));
// localStorage.clear();

FETCH_MOVIES()
const PAGINTION_BTN = document.querySelectorAll('.paginationBtn')
let numPageUser = 1;
let paginationUser = 'day';

PAGINTION_BTN.forEach(BTN => {
  BTN.addEventListener('click', () => {
    MOVIE_LIST.innerHTML = ``
    numPageUser = BTN.textContent
    FETCH_MOVIES(numPageUser, paginationUser)
    PAGINTION_BTN.forEach((btn) => {
      btn.classList.remove('paginationBtnActive');
    })
    BTN.classList.add('paginationBtnActive')
  })
});

// const INPT_PAGE = document.querySelector('#inptPage')
// INPT_PAGE.addEventListener('change', () => {
//   MOVIE_LIST.innerHTML = ``
//   numPageUser = INPT_PAGE.value
//   FETCH_MOVIES(numPageUser, paginationUser)
// })

const SET_DAY = document.querySelector('#setDay')
const SET_WEEK = document.querySelector('#setWeek')



SET_DAY.addEventListener('click', () => {
  SET_DAY.classList.add('clickdBTNpopularActive')
  SET_WEEK.classList.remove('clickdBTNpopularActive')
  MOVIE_LIST.innerHTML = ``
  paginationUser = 'day'
  FETCH_MOVIES(numPageUser, 'day')
  PAGINTION_BTN.forEach((btn) => {
    btn.classList.remove('paginationBtnActive');
  })
  PAGINTION_BTN[numPageUser - 1].classList.add('paginationBtnActive')

})

SET_WEEK.addEventListener('click', () => {
  SET_WEEK.classList.add('clickdBTNpopularActive')
  SET_DAY.classList.remove('clickdBTNpopularActive')
  MOVIE_LIST.innerHTML = ``
  paginationUser = 'week'
  FETCH_MOVIES(numPageUser, paginationUser)
  PAGINTION_BTN.forEach((btn) => {
    btn.classList.remove('paginationBtnActive');
  })
  PAGINTION_BTN[numPageUser - 1].classList.add('paginationBtnActive')
})

const BTN_SPACE=document.querySelector('#btnSpace')
const TARGET_ELEMENT=document.querySelector('#targetElement')
const targetElementPosition = TARGET_ELEMENT.getBoundingClientRect().top;
BTN_SPACE.addEventListener('click',function(){
  window.scrollTo({
  top: targetElementPosition-50,
  behavior: 'smooth'
})
})
// function updateButtonStyles() {
//   const USER_LIKED = document.querySelectorAll('.likeBtn');
//   USER_LIKED.forEach((btn, i) => {
//     const movieTitle = data.results[i].title;
//     if (favourite_movies.includes(movieTitle)) {
//       btn.classList.add('userLiked'); // Add the 'userLiked' class
//     } else {
//       btn.classList.remove('userLiked'); // Remove the 'userLiked' class
//     }
//   });
// }
// window.addEventListener('load', () => {
//   updateButtonStyles();
// });


