import { React, useEffect, useState } from 'react';
import CardList from './CardList';
import Pagination from './Pagination';
import useApi from "../hooks/useApi";
import movie from '../api/fetchmovieapi';


const Home = () => {
  const LOG = (...args) => {
    console.log(...args);
  }

  const getTrending = useApi(movie.fetchTrending);
  const getTopRated = useApi(movie.fetchTopRated);
  const getPopular = useApi(movie.fetchPopular);
  const getUpcoming = useApi(movie.fetchUpcoming);

  const [tn_page, set_tn_page] = useState(1);
  const [pp_page, set_pp_page] = useState(1);
  const [tr_page, set_tr_page] = useState(1);
  const [uc_page, set_uc_page] = useState(1);

  const formData = (data, tag) => {
    var list = [];
    data = data.data;
    data.results.forEach((movie) => {
      var appendObj = {
        title: movie.title ?? movie.name ?? movie.original_title,
        release: movie.release_date,
        id: movie.id,
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      };
      list.push(appendObj);
    })
    return list;
  };

  const pageSet = (data) => {
    var data = data.data;
    return [data.page, data.total_pages];
  }

  const handleChange = (tag, page) => {
    var setters = [set_tr_page, set_pp_page, set_uc_page, set_tn_page];
    setters.at(Number(tag))(page);
  };

  useEffect(() => { getTrending.request(tn_page); }, [tn_page]);
  useEffect(() => { getTopRated.request(tr_page); }, [tr_page]);
  useEffect(() => { getPopular.request(pp_page); }, [pp_page]);
  useEffect(() => { getUpcoming.request(uc_page); }, [uc_page]);

  return (
    <>
      {getTopRated?.data ? <>
        <CardList heading="Top Rated Movies" forwatchlist={false} listofmovies={formData(getTopRated, 0)}></CardList>
        <Pagination handlePageChange={handleChange} pagehelp={pageSet(getTopRated)} tag={1}></Pagination></> : <></>}
      {getPopular?.data ? <><CardList heading="Popular Movies" forwatchlist={false} listofmovies={formData(getPopular, 1)}></CardList>
        <Pagination handlePageChange={handleChange} pagehelp={pageSet(getPopular)} tag={2}></Pagination></> : <></>}
      {getUpcoming?.data ? <><CardList heading="Upcoming Movies" forwatchlist={false} listofmovies={formData(getUpcoming, 2)}></CardList>
        <Pagination handlePageChange={handleChange} pagehelp={pageSet(getUpcoming)} tag={3}></Pagination></> : <></>}
      {getTrending?.data ? <><CardList heading="Trending Movies" forwatchlist={false} listofmovies={formData(getTrending, 3)}></CardList>
        <Pagination handlePageChange={handleChange} pagehelp={pageSet(getTrending)} tag={4}></Pagination></> : <></>}
    </>
  )
};

export default Home;