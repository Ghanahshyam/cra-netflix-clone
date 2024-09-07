import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constant";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  
  const getPopularMovies = async () => {
    try {
      const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTIONS);
      const json = await data.json();
      dispatch(addPopularMovies(json.results));
    } catch(error) {
      console.log("error fetching ", error);
    }
  }

  useEffect(() => {
    getPopularMovies();
  },[]);
}

export default usePopularMovies;