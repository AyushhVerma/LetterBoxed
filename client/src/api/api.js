// import dbapi from '';

// // api calls to server for database query and moviedb query


// const api = {
//     addMovieToWatchlist: (usertoken, param_id) => {
//         var response = dbapi.post(`/movie-in-watchlist`, { user_id: usertoken, movie_id: param_id }).catch(err => console.log(err));
//         return response.data;
//     },
//     deleteMovieFromWatchlist: (usertoken, param_id) => {
//         const response = axios.delete(`/movie-in-watchlist`, { data: { user_id: usertoken, movie_id: param_id } }).catch(err => console.log(err));
//         return response.data;
//     },
//     getMovieById: (movie) => {
//         var response = axios.get(`https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.REACT_APP_API}`).catch(err => console.log(err));
//         var similar_res = axios.get(`https://api.themoviedb.org/3/movie/${movie}/similar?api_key=${process.env.REACT_APP_API}&language=en-US&page=1`).catch(err => console.log(err));
//         return { data : response.data, similar: similar_res.data };
//     },
//     fetchWatchList: () => {
//         var user = localStorage.getItem('user').slice(1, -1);
//         const res = axios.get(`/watchlist/${user}`).catch(e => console.log(e));
//         return res.data;
//     },
//     fetchTrendingMovies: async (page) => {
//         const response = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API}&page=${page}`).catch(err => console.log(err))
//         return formData(response);
//     },
//     fetchPopularMovies: async (page) => {
//         const response = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API}&page=${page}`).catch(err => console.log(err))
//         return formData(response);
//     },
//     fetchTopRatedMovies: async (page) => {
//         const response = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API}&page=${page}`).catch(err => console.log(err))
//         return formData(response);
//     },
//     fetchUpcomingMovies: async (page) => {
//         const response = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API}`).catch(err => console.log(err))
//         consoleformData(response));
//     }
// }

// export default api;