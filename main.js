var API_KEY='api_key=100f170ca1c91c1b6ffc9a21393bd2e9';
var BASE_URL='https://api.themoviedb.org/3';

var API_URL='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=100f170ca1c91c1b6ffc9a21393bd2e9';
//BASE_URL +'/discover/movie?sort_by=popularity.desc&' + API_KEY;

var IMG_URL="https://image.tmdb.org/t/p/w500";
var searchURL=BASE_URL + '/search/movie?'+ API_KEY; 

// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=100f170ca1c91c1b6ffc9a21393bd2e9
// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=100f170ca1c91c1b6ffc9a21393bd2e9

const main=document.getElementById("main");
const form=document.getElementById("form");
const search=document.getElementById("search");

function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data);
        showMovies(data.results);
    })
}


function showMovies(movies){
    main.innerHTML="";
    movies.forEach(movie => {
        const {poster_path,title, vote_average, overview}=movie;
        const movieEl=document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML=`
        <img src="${IMG_URL + poster_path}" alt="${title}"/>
        <div class="movie.info">
            <h3>"${title}"<h3>
            <span class="${getClassByRate(vote_average)}"> ${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview:</h3>
            "${overview}"
        </div>`
        main.appendChild(movieEl);
    });
}
getMovies(API_URL);
function getClassByRate(vote){
    if(vote >= 8){
        return "green";
    } else if (vote >= 5){
        return "orange";
    }else{
        return "red";
    }
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm=search.value;
    if (searchTerm){
        getMovies(searchURL + '&query=' + searchTerm);
    }else {
        getMovies(API_URL);
    }
});
