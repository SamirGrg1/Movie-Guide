let form = document.querySelector('form');
let moviecontainer = document.querySelector('.movie-container');
let inputBox = document.querySelector('input[type="text"]');

// Fetch movie information from the API
const getmovieinfo = async (moviename) => {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=7390c31e7d4f58c4b9afbc61a12f010e&query=${moviename}`;
    let response = await fetch(url);
    let data = await response.json();
    showmovie(data, moviename);
}

// Show movie details in the UI
const showmovie = (data, moviename) => {
    // Clear previous movie details
    moviecontainer.innerHTML = '';

    if (data.total_results === 0) {
        moviecontainer.innerHTML = `
            <div class="error-message">
                <h2>Sorry, "${moviename}" not found.</h2>
            </div>
        `;
    } else {
        const movie = data.results[0]; // Assuming you want the first result
        const { title, vote_average, genre_ids, release_date, runtime, overview, poster_path } = movie;
        const genres = genre_ids.join(', '); // You may want to map this to names based on another API call
        const moviedetail = document.createElement('div');
        moviedetail.classList.add('movie-details');
        moviedetail.innerHTML = `
            <div class="movie-poster">
                <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
            </div>
            <div class="movie-info">
                <h2>${title}</h2>
                <p><span class="rating">&#11088; ${vote_average}</span></p>
                <p><strong>Genres:</strong> ${genres}</p>
                <p><strong>Released:</strong> ${release_date}</p>
                <p><strong>Runtime:</strong> ${runtime ? runtime + ' min' : 'N/A'}</p>
                <p><strong>Overview:</strong> ${overview}</p>
            </div>
        `;
        moviecontainer.appendChild(moviedetail);
    }
}

// Add event listener to the form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const moviename = inputBox.value;
    if (moviename) {
        getmovieinfo(moviename);
        inputBox.value = ''; // Clear the input box after submitting
    }
});


const toggleButton = document.getElementById('dark-mode-toggle'); // The dark mode toggle button
const body = document.body;
let cur="light";
let icon=document.querySelector('#icon');


toggleButton.addEventListener("click",()=>{
    if(cur=="light"){
        body.classList.add('dark-mode');
        cur="dark";
        icon.src="sun.png";
    }else{
        body.classList.remove('dark-mode');
        cur="light";
        icon.src="moon.png";
    } 
});