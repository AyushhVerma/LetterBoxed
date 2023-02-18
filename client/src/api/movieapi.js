import axios from 'axios';

const movieapi = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
});

export default movieapi;