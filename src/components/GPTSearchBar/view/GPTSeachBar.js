import React from "react";
import { BG_IMG } from "../../../utils/constant";
import lang from "../../../utils/languageConstants";
import { useSelector } from "react-redux";

const GPTSeachBar = () => {
  const selectedLang = useSelector(store => store.config?.lang)
  return (
    <>
      <div className="absolute -z-10">
        <img alt="bg-image" src={BG_IMG} />
      </div>
      <div className="pt-[10%] flex justify-center">
        <form className="w-1/2 bg-black grid grid-cols-12">
          <input
            type="text"
            className="p-4 m-4 col-span-9"
            placeholder={lang[selectedLang].gptSearchPlaceHolder}
          />
          <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg">
            {" "}
            {lang[selectedLang].search}
          </button>
        </form>
      </div>
    </>
  );
};

export default GPTSeachBar;
