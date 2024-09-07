import React from 'react';
import { useSelector } from "react-redux";
import VideoBackground from "../../VideoBackground/view/VideoBackground";
import VideoTitle from "../../VideoTitle/view/VideoTitle";

const MainContainer = () => {
  const movies = useSelector(store => store.movies?.nowPlayingMovies);

  if (!movies) return; // Early return

  const mainMovie = movies[1] || null;
  const { original_title, overview, id} = mainMovie;
  
  return (
    <>
      <VideoTitle title={original_title} overview={overview}/>
      <VideoBackground movieId={id}/>
    </>

  )
}

export default MainContainer;