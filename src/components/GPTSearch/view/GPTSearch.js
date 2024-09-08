import React from 'react'
import GPTSeachBar from "../../GPTSearchBar/view/GPTSeachBar";
import GPTMoviesSuggestions from "../../GPTMoviesSuggestions/view/GPTMoviesSuggestions";

const GPTSearch = () => {
  return (
    <div>
      <GPTSeachBar />
      <GPTMoviesSuggestions />
    </div>
  )
}

export default GPTSearch