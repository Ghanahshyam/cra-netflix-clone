import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  
  const dispatch = useDispatch();
  
  const getNowPlayignMovies = async () => {
    try {
      const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTIONS);
      const json = await data.json();
      dispatch(addNowPlayingMovies(json.results));
    } catch(error) {
      console.log("error fetching getNowPlayignMovies", error);
    }
  }

  useEffect(() => {
    getNowPlayignMovies();
  },[]);
}

export default useNowPlayingMovies;