let form = document.querySelector('form');
let moviecontainer = document.querySelector('.movie-container');
let inputBox = document.querySelector('input[type="text"]');

// Fetch movie information from the API
const getmovieinfo = async (moviename) => {
    let apikey = "85bc3fcc";
    let url = `http://www.omdbapi.com/?apikey=${apikey}&t=${moviename}`;
    let response = await fetch(url);
    let data = await response.json();
    showmovie(data, moviename);
}

// Show movie details in the UI
const showmovie = (data, moviename) => {
    // Clear previous movie details
    moviecontainer.innerHTML = '';

    if (data.Response === "False") {
        moviecontainer.innerHTML = `
            <div class="error-message">
                <h2>Sorry, "${moviename}" not found.</h2>
            </div>
        `;
    } else {
        const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;
        // Split genres into an array
        const genres = Genre.split(',').map(genre => genre.trim());
        const moviedetail = document.createElement('div');
        moviedetail.classList.add('movie-details');
        moviedetail.innerHTML = `
            <div class="movie-poster">
                <img src="${Poster}" alt="${Title}">
            </div>
            <div class="movie-info">
                <h2>${Title}</h2
                <p><span class="rating">&#11088; ${imdbRating}</span></p>
                <p>${genres.map(genre => `<span class="genre-box">${genre}</span>`).join(' ')}</p>
                <p><strong>Released:</strong> ${Released}</p>
                <p><strong>Runtime:</strong> ${Runtime}</p>
                <p><strong>Actors:</strong> ${Actors}</p>
                <p><strong>Plot:</strong> ${Plot}</p>
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
