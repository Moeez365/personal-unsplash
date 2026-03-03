import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleClick = (e) => {
    if (e.key == "Enter" && search || e.type == "click" && search) {
      navigate("search?name=" + search.split(" ").join("-"));
    }
  };

  return (
    <div className="h-screen min-h-72 text-(--text-color)">
      <div className="lg:bg-[url(/hero-image.png)] bg-cover bg-center h-full">
        <div className="flex flex-col text-(--text-color) h-full items-center justify-center gap-4 mx-3 sm:mx-8">
          <h1 className="text-4xl font-bold text-wrap text-center">Search</h1>
          <p className="text-md text-wrap text-center">
            Search high-resolution images from Unsplash
          </p>
          <div className="flex bg-(--white-color) items-center h-15 w-full mx-4 md:w-xl border border-(--primary-color) rounded-lg shadow-xl shadow-[#00000017]">
            <input
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleClick}
              type="text"
              placeholder="Enter any keyword"
              className="py-4 px-4 h-full w-full rounded-l-lg outline-0"
            />
            <span
              className="px-4 border-l h-full rounded-r-lg flex items-center border-(--primary-color) cursor-pointer"
              onClick={handleClick}
            >
              <img src="/Search.svg" alt="" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
