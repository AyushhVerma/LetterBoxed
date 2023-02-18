import React, { useState, useEffect } from 'react';
import CardList from './CardList';
import watch from '../api/watchlistapi';
import movie from '../api/fetchmovieapi';
import { useParams } from 'react-router';

const WatchList = () => {
    const getWatch = watch.fetchWatchlist;
    const getMovie = movie.fetchMovieDetail;
    const [watchList, setWatchList] = useState([]);
    const usertoken = useParams().token;

    //const LOG = (...args) => console.log(...args);
    useEffect(() => {
        var list = [];
				getWatch(usertoken).then((res, data) => {
					for (var x of res) {
						getMovie(x).then((res, data) => {
							list.push({ title: res.title, release: res.release_date, image: `https://image.tmdb.org/t/p/w500${res.poster_path}`, id: res.id });
						})
					}
				})
        return () => {
            setWatchList(list);
        }
    }, []);

    return <CardList heading="Your Watchlist" listofmovies={watchList} forwatchlist={true}></CardList>;
};

export default WatchList;
