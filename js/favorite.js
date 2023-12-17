// <button class='showMoreDitails'>Show More</button>
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
// const FAVORITE_CONTAINER = document.querySelector('#container')
    const MOVIE_FETCH=(id_movie_first)=>{
      fetch(`https://api.themoviedb.org/3/movie/${id_movie_first}?language=en-US`, OPTIONS)
      .then(response => response.json())
      .then(movie => {
        console.log(movie)
        // const firstMovie = movie.results;
        // console.log(firstMovie);
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
      // if(i==0){
        MOVIE_FETCH(movie)
      //}
      // else{
      //   FETCH_MOVIE1(movie)
      // }    
    });

}
else {
    console.log(false);
}


  const FETCH_MOVIE1 = (idMovie) => {
        fetch(`https://api.themoviedb.org/3/movie/${idMovie}?language=en-US`, OPTIONS)
            .then(response => response.json())
            .then(movie => {
                console.log(movie)
                const isLiked = favourite_movies.includes(movie.id); // Check if the movie ID is liked
                const likeButtonClass = isLiked ? 'userLiked' : '';
                FAVORITE_CONTAINER.innerHTML += `
                            <div class='movieCardList'>
                                <img src='http://image.tmdb.org/t/p/w500${movie.poster_path}'> 
                                <div class='containerNameRateLike' >
                                     <span class='idMovieContainer'> ${movie.title}</span>
                                 <div class='ContainerRateImdb' >
                                     <span class='imdbRate'>${movie.vote_average} <i class="fa fa-imdb" aria-hidden="true"></i></span>
                                     <button class='likeBtn ${likeButtonClass}'> <i class="fa fa-thumbs-up" aria-hidden="true"></i> like</button>
                                    
                                 </div>
                             </div>

                       </div>
                       </div>`
          //       FAVORITE_CONTAINER.innerHTML += `<div class='movieCardList'>
          //   <img src='http://image.tmdb.org/t/p/w500${movie.poster_path}'>
          //   <button class='likeBtn ${likeButtonClass}'> <i class="fa fa-thumbs-up" aria-hidden="true"></i> like</button>
          //   <span class='idMovieContainer'>ID: ${movie.id}</span>
          // </div>`
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


// let favourite_movies = JSON.parse(localStorage.getItem('favourite')) || [];
// console.log(JSON.parse(localStorage.getItem('favourite')));
// const DISPLAY_BEFORE = document.querySelector('#container')
// const FAVORITE_CONTAINER = document.querySelector('#listMovieSearch')
// const FAVORITE_FIRST = document.querySelector('#firstMovie')
// const OPTIONS = {
//     method: 'GET',
//     headers: {
//         accept: ' application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDMwZDdkNmE3NWVmMjUzYjE3MWQxMzE0ZTNiOGY4ZiIsInN1YiI6IjY1MTViNTEwOTNiZDY5MDEzOGZjNjFjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnXvPBDGXfiOwqal9-lzl2zqjV-mLbJGJhCTg3gX7Vo'
//     }
// }
// const FETCH_MOVIE_FIRST = (movie, i) => {
//     fetch(`https://api.themoviedb.org/3/movie/${movie}?language=en-US`, OPTIONS)
//         .then(response => response.json())
//         .then(movie => {
//             console.log(movie)
//             const firstMovie = movie;
//             const firstId = firstMovie.id;
//             const isLiked = favourite_movies.includes(firstId);
//             const likeButtonClass = isLiked ? 'userLiked' : '';
//             FAVORITE_FIRST.innerHTML += `
//                 <div id='containerPage'>
//                 <div id='containerMovie'>
//                   <div id='containerContent'>
//                     <div id='secContainerContent'>
//                       <div id='titleContainer'>
//                         <h1>${firstMovie.title}</h1>
//                         <span>Published: ${firstMovie.release_date}</span> | ID: ${firstId}
//                       </div>
//                       <div id='paragrphContainer'></div>
//                       <br>
//                       <h6>${firstMovie.overview}</h6>
//                       <div id='containerTrailer'></div>
//                     </div>
//                   </div>
//                   <div id='containerImgDetails'>
//                     <div>
//                       <img src='http://image.tmdb.org/t/p/w500${firstMovie.poster_path}'>
//                     </div>
//                     <div class='ContainerRateImdb' >
//                         <span class='imdbRate'>${movie.vote_average} <i class="fa fa-imdb" aria-hidden="true"></i></span>
//                         <button class='likeBtn ${likeButtonClass}'> <i class="fa fa-thumbs-up" aria-hidden="true"></i> like</button>
//                     </div>
//                   </div><div id="listMovieSearch"></div>
//                 </div>
//               </div>`

//             const FIRST_LIKE_BTN = FAVORITE_FIRST.querySelector('.likeBtn');
//             FIRST_LIKE_BTN.addEventListener('click', () => {
//                 FIRST_LIKE_BTN.classList.toggle('userLiked');
//                 if (isLiked) {
//                     const movieIndex = favourite_movies.indexOf(firstId);
//                     if (movieIndex !== -1) {
//                         favourite_movies.splice(movieIndex, 1);
//                         console.log(favourite_movies);
//                         // Update the local storage
//                         localStorage.setItem('favourite', JSON.stringify(favourite_movies));

//                         // Check if there are remaining favorite movies
//                         if (favourite_movies.length > 0) {
//                             // Get the next movie from favorites
//                             const nextMovieId = favourite_movies[0];
//                             // Display the next movie in big way format
//                             FETCH_MOVIE_FIRST(nextMovieId, 0);
//                         }
//                     }
//                 } else {
//                     favourite_movies.push(firstId);
//                 }
//             });

//             const TRAILER_FETCH = (movie_id) => {
//                 fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`, OPTIONS)
//                     .then((response) => response.json())
//                     .then((trailer) => {
//                         console.log(trailer);
//                         containerTrailer.innerHTML += ` <iframe width="550" height="315" src="https://www.youtube.com/embed/${trailer.results[0].key}" frameborder="0" allowfullscreen></iframe>`;
//                     });
//             };

//             TRAILER_FETCH(firstId);
//         })
//         .catch(err => console.error(err));

// }
// const FETCH_MOVIE = (idMovie) => {
//     fetch(`https://api.themoviedb.org/3/movie/${idMovie}?language=en-US`, OPTIONS)
//         .then(response => response.json())
//         .then(movie => {
//             console.log(movie)

//             const isLiked = favourite_movies.includes(movie.id);
//             const likeButtonClass = isLiked ? 'userLiked' : '';
//             FAVORITE_CONTAINER.innerHTML += `
//             <div class='movieCardList'>
//                 <img src='http://image.tmdb.org/t/p/w500${movie.poster_path}'> 
//                 <div class='containerNameRateLike' >
//                         <span class='idMovieContainer'> ${movie.title}</span>
//                     <div class='ContainerRateImdb' >
//                         <span class='imdbRate'>${movie.vote_average} <i class="fa fa-imdb" aria-hidden="true"></i></span>
//                         <button class='likeBtn ${likeButtonClass}'> <i class="fa fa-thumbs-up" aria-hidden="true"></i> like</button>
//                         <button class='showMoreDitails'>Show More</button>
//                     </div>
//                 </div>
                
//           </div>
//           </div>`


//           const USER_LIKED = document.querySelectorAll('.likeBtn');
//           USER_LIKED.forEach((btn, i) => {
//             if (i>0) {
//             btn.addEventListener('click', () => {
//               btn.classList.toggle('userLiked');
//               const movieId = movie.id;
//               const movieIndex = favourite_movies.indexOf(movieId);
//               if (movieIndex === -1) {
//                 favourite_movies.push(movieId);
//               } else {
//                 const userConfirmed = confirm('Are you sure you want to remove the movie from your favorites?');
//                 if (userConfirmed) {
//                     favourite_movies.splice(movieIndex, 1);
//                     console.log(favourite_movies);
//                     // Update the local storage
//                     localStorage.setItem('favourite', JSON.stringify(favourite_movies));
//                     location.reload();
//                 }else {
//                     btn.classList.add('userLiked');
//                     return;
//                 }
//               }
//               localStorage.setItem('favourite', JSON.stringify(favourite_movies));
//             });
//         }
//           });

            // const USER_LIKED = document.querySelectorAll('.likeBtn');
            // USER_LIKED.forEach((btn, i) => {
            //     btn.addEventListener('click', () => {
            //         const movieId = movie.id;
            //         const movieIndex = favourite_movies.indexOf(movieId);
            //         if (movieIndex === -1) {
            //             // The movie is not in the favorites, so add it
            //             favourite_movies.push(movieId);
            //             btn.classList.add('userLiked');
            //         } else {
            //             // The movie is in the favorites, so remove it
            //             const userConfirmed = confirm('Are you sure you want to remove the movie from your favorites?');
            //             if (userConfirmed) {
            //                 favourite_movies.splice(movieIndex, 1);
            //                 console.log(favourite_movies);
            //                 // Update the local storage
            //                 localStorage.setItem('favourite', JSON.stringify(favourite_movies));
            //                 if (i === 0) {
            //                     // If it's the first movie, reload the page to remove it from display
            //                     location.reload();
            //                 } else {
            //                     // If it's not the first movie, remove it from the display
            //                     btn.closest('.movieCardList').remove();
            //                 }
            //             } else {
            //                 btn.classList.add('userLiked');
            //                 return;
            //             }
            //         }
            //     });
            // });

//         })

//         .catch(err => console.error(err));
// }

// if (favourite_movies.length > 0) {
//     console.log(true);
//     DISPLAY_BEFORE.innerHTML = ``

//     favourite_movies.forEach((movie, i) => {
//         if (i == 0) {
//             FETCH_MOVIE_FIRST(movie)
//         }
//         else {
//             FETCH_MOVIE(movie)
//         }

//     });
// }
// else {
//     console.log(false);
// }

// localStorage.setItem('favourite', JSON.stringify(favourite_movies));


