import movieapi from "./movieapi";

const fetchTrending = page => movieapi.get(`/trending/movie/week?api_key=${process.env.REACT_APP_API}&page=${page ?? 1}`);
const fetchTopRated = page => movieapi.get(`/movie/top_rated?api_key=${process.env.REACT_APP_API}&page=${page ?? 1}`);
const fetchPopular = page => movieapi.get(`/movie/popular?api_key=${process.env.REACT_APP_API}&page=${page ?? 1}`);
const fetchUpcoming = page => movieapi.get(`/movie/upcoming?api_key=${process.env.REACT_APP_API}&page=${page ?? 1}`);
const fetchMovieDetail = async (movie) => {
    const res = await movieapi.get(`/movie/${movie}?api_key=${process.env.REACT_APP_API}`);
    return res.data;
}
const fetchSimilar = async (movie) => {
    const res = await movieapi.get(`/movie/${movie}/similar?api_key=${process.env.REACT_APP_API}`);
    return res.data;
}
const fetchRecommendation = async (movie) => {
    const res = await movieapi.get(`/movie/${movie}/recommendations?api_key=${process.env.REACT_APP_API}`);
    return res.data;
}


export default {
    fetchTrending,
    fetchTopRated,
    fetchPopular,
    fetchUpcoming,
    fetchMovieDetail,
    fetchSimilar,
    fetchRecommendation
};