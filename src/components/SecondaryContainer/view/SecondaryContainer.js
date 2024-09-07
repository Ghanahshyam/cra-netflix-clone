import React from 'react'
import MovieList from "../../MovieList/view/MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies);
  return (
    movies.nowPlayingMovies && (
      <div className="w-screen bg-black">
        <div className="-mt-40 pl-12 relative z-20">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Tranding"} movies={movies.popularMovies} />
          <MovieList title={"Popular"} movies={movies.popularMovies} />
        </div>
      </div>

      /* MovieList
      Tranding 
        MovieCard * n
      Populor
        MovieCard * n
      Critically Acclaimed
        MovieCard * n
      horror 
        MovieCard * n
    */
    )
  );
}

export default SecondaryContainer