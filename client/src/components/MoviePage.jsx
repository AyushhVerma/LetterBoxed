import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useParams } from "react-router";
import watch from '../api/watchlistapi';
import movie from '../api/fetchmovieapi';

const MoviePage = () => {

  const movie_id = Number(useParams().id);
  const addWatch = watch.addToWatchlist;
  const delWatch = watch.deleteFromWatchlist;
  const getWatch = watch.fetchWatchlist;
  const getMovie = movie.fetchMovieDetail;
  const getSimilar = movie.fetchSimilar;
  const getRecommendation = movie.fetchRecommendation;
  const [backdrop_path, setBackdrop] = useState();
  const [watchList, setWatchList] = useState([]);
  const [poster_path, setPoster] = useState();
  const [description, setDescription] = useState();
  const [watchLink, setWatchLink] = useState();
  const [genres, setGenres] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [recommendationMovies, setRecommendationMovies] = useState([]);
  const [isPresent, setIsPresent] = useState(false);
  const usertoken = localStorage.getItem('user')?.slice(1, -1);

  const handleWatchList = () => {
    if (!usertoken) {
      window.location.href = '/login';
    } else {
      if (!isPresent) { addWatch(usertoken, movie_id); setIsPresent(true); }
      else { delWatch(usertoken, movie_id); setIsPresent(false); }
      getWatch(usertoken).then((res, data) => {
        setWatchList(res);
      });
    }
  }

  useEffect(() => {
    var callApi = true;
    if (callApi) {
      getWatch(usertoken).then((res, data) => {
        setWatchList(res);
        if (res.find((x) => x === movie_id)) {
          setIsPresent(true);
        }
      });
      getMovie(movie_id).then((res, data) => {
        setBackdrop(`https://image.tmdb.org/t/p/w500${res.backdrop_path}`);
        setPoster(`https://image.tmdb.org/t/p/w500${res.poster_path}`);
        setDescription(res.overview);
        setWatchLink(res.homepage);
        setGenres(res.genres);
        setIsPresent(watchList.find((x) => x.id === movie_id) !== undefined);
      })
      getSimilar(movie_id).then((res, data) => {
        setSimilarMovies(() => {
          return res.results.map(x => {
            return {
              title: x.title,
              release: x.release_date,
              image: `https://image.tmdb.org/t/p/w500${x.poster_path}`,
              id: x.id
            }
          })
        });
      });
      getRecommendation(movie_id).then((res, data) => {
        setRecommendationMovies(() => {
          return res.results.map(x => {
            return {
              title: x.title,
              release: x.release_date,
              image: `https://image.tmdb.org/t/p/w500${x.poster_path}`,
              id: x.id
            }
          })
        });
      });
    }
    return () => {
      callApi = false;
    }
  }, [movie_id]);

  return (
    <>
      <div className="movie">
        <img className="backdrop" src={`https://image.tmdb.org/t/p/original/${backdrop_path}`} alt="Backdrop" />
        <div className="movie-info">
          <img className="poster" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="Poster" />
          <div className="info">
            <p className="description">{description}</p>
            {watchLink ? <a className="watch-link" target="_blank " href={watchLink}>Watch now</a> : <></>}
            {!isPresent ? <button onClick={handleWatchList} className="add-to-watchlist-button">Add to Watchlist</button> : <button onClick={handleWatchList} className="add-to-watchlist-button">Remove from watchlist</button>}<br />
          </div>
        </div>
      </div>
      <h3 className="genres-title">Genres:</h3>
      <ul className="genres-list">
        {genres.map(genre => (
          <li key={genre.id} className="genre">{genre.name}</li>
        ))}
      </ul>
      <h3 className="similar-movies-title">Similar movies:</h3>
      <div className="similar-movies">
        {similarMovies.map(movie => (
          <Card key={movie.id} id={movie.id} title={movie.title} image={movie.image} release={movie.release} />
        ))}
      </div>
      <h3 className="similar-movies-title">Recommendation movies:</h3>
      <div className="similar-movies">
        {recommendationMovies.map(movie => (
          <Card key={movie.id} id={movie.id} title={movie.title} image={movie.image} release={movie.release} />
        ))}
      </div>
    </>

  );
};

export default MoviePage;
