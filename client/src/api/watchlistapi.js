import dbapi from "./dbapi";

const addToWatchlist = (usertoken, param_id) => dbapi.post("/movie-in-watchlist", {
    user_id: usertoken,
    movie_id: param_id
});

const fetchWatchlist = async (token) => {
    const res = await dbapi.get(`/watchlist/${token}`);
    return res.data;
}

const deleteFromWatchlist = (usertoken, param_id) => dbapi.delete('/movie-in-watchlist', {
    data: {
        user_id: usertoken,
        movie_id: param_id
    }
});

export default {
    addToWatchlist,
    fetchWatchlist,
    deleteFromWatchlist
};