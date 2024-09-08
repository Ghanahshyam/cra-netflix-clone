import React from 'react'
import Header from "../../Header/view/Header";
import useNowPlayingMovies from "../../../hooks/useNowPlayingMovies";
import MainContainer from "../../MainContainer/view/MainContainer";
import SecondaryContainer from "../../SecondaryContainer/view/SecondaryContainer";
import usePopularMovies from "../../../hooks/usePopularMovies";
import GPTSearch from "../../GPTSearch/view/GPTSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  const showGptSearch = useSelector(store => store.gpt?.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies();

  return (
    <>
      <Header />
      {showGptSearch ? (
        <GPTSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </>
  );
}

export default Browse