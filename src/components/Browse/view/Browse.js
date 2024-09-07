import React from 'react'
import Header from "../../Header/view/Header";
import useNowPlayingMovies from "../../../hooks/useNowPlayingMovies";
import MainContainer from "../../MainContainer/view/MainContainer";
import SecondaryContainer from "../../SecondaryContainer/view/SecondaryContainer";
import usePopularMovies from "../../../hooks/usePopularMovies";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  return (
    <>
      <Header />
      <MainContainer />
      <SecondaryContainer />
      {/* 
        MainContainer
          - VideoInBackground
          - VideoTitle
        SecodaryContainer
          - MovieList * n
            - cards * n
      */}
    </>
  )
}

export default Browse