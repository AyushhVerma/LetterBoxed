import axios from 'axios';

var userwatchlist = [];
var user = localStorage.getItem('user');

if (user !== undefined) {
    const token = user.slice(1, -1);
    axios.get(`http://localhost:4444/watchlist/${token}`)
    .then((response, data) => {
        var movie_ids = response.data;
        movie_ids.forEach((movie, index) => {
            axios.get(`https://api.themoviedb.org/3/movie/${movie}?api_key=281ad8fbc00879b34a6cdad1d5613359`)
            .then((response, data) => {
                var movie_data = response.data;
                userwatchlist.push({
                    id: movie_data.id,
                    title: movie_data.title,
                    image: `https://image.tmdb.org/t/p/w500${movie_data.poster_path}`,
                    release: movie_data.release_date
                })
            })
            .catch(e => console.log(e))
        })
    })
    .catch(err => console.log(err));
}

export default userwatchlist;
