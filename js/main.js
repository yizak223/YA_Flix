const OPTIONS = {
  method: 'GET',
  headers: {
    accept: ' application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDMwZDdkNmE3NWVmMjUzYjE3MWQxMzE0ZTNiOGY4ZiIsInN1YiI6IjY1MTViNTEwOTNiZDY5MDEzOGZjNjFjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnXvPBDGXfiOwqal9-lzl2zqjV-mLbJGJhCTg3gX7Vo'
  }
};
const MOVIE_LIST = document.querySelector('#moviesList')

const FETCH_MOVIES = (numPage=1 , time = `day`) => {
  fetch(`https://api.themoviedb.org/3/trending/movie/${time}?language=en-US&page=${numPage}`, OPTIONS)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    data.results.forEach((movie) => {
      MOVIE_LIST.innerHTML += `<div class='movieCard'>
                                <img src='http://image.tmdb.org/t/p/w500${movie.poster_path}'>
                                <p>${movie.original_title} </p>
                                </div>`})
  })
  .catch(err => console.error(err));
}
FETCH_MOVIES()
const PAGINTION_BTN=document.querySelectorAll('.paginationBtn')


let numPageUser=1;
let paginationUser='day';


PAGINTION_BTN.forEach(BTN => {
  BTN.addEventListener('click',()=>{ 
      MOVIE_LIST.innerHTML=``
      numPageUser=BTN.textContent
      FETCH_MOVIES(numPageUser,paginationUser )
      PAGINTION_BTN.forEach((btn) => {
        btn.classList.remove('clicked');
      })
      BTN.classList.add('clicked')
})});

const INPT_PAGE=document.querySelector('#inptPage')
INPT_PAGE.addEventListener('change',()=>{
  MOVIE_LIST.innerHTML=`` 
  numPageUser=INPT_PAGE.value
  FETCH_MOVIES(numPageUser,paginationUser )
})

const SET_DAY=document.querySelector('#setDay')
const SET_WEEK=document.querySelector('#setWeek')



SET_DAY.addEventListener('click',()=>{
  MOVIE_LIST.innerHTML=`` 
  paginationUser='day'
    FETCH_MOVIES(numPageUser , 'day') 
    PAGINTION_BTN.forEach((btn) => {
      btn.classList.remove('clicked');
    })
    PAGINTION_BTN[numPageUser-1].classList.add('clicked')

})

SET_WEEK.addEventListener('click',()=>{
  MOVIE_LIST.innerHTML=`` 
  paginationUser='week'
  FETCH_MOVIES(numPageUser , paginationUser) 
  PAGINTION_BTN.forEach((btn) => {
    btn.classList.remove('clicked');
  })
  PAGINTION_BTN[numPageUser-1].classList.add('clicked')
})
