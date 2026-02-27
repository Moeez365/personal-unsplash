import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import ImageShow from "../components/ImageShow";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("name"));
  const navigate = useNavigate();
  const [responseData, setResponseData] = useState([]);
  const [page, setPage] = useState(1);

  const searchImages = async (search) => {
    try {
      const res = await axios.get(
        `https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_CLIENT_ID}&page=${page}&query=${search.split("-").join(" ")}`,
      );
      setResponseData(prev => [...prev, ...res.data.results]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    if (e.key == "Enter" && search) {
      navigate(`/search?name=${search}`);
      searchImages(search);
    }
  };

  useEffect(() => {
    searchImages(search);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const pageSize = document.documentElement.scrollHeight;
      const scrollSize =
        window.innerHeight + document.documentElement.scrollTop;
      if (pageSize <= scrollSize) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mt-15 -z-40">
      <div className="h-18 bg-[url(/gradiend-bg.svg)] bg-no-repeat bg-cover flex flex-col items-center px-3 md:px-8">
        <input
          onKeyDown={handleSearch}
          defaultValue={search.split("-").join(" ")}
          onChange={(e) => setSearch(e.target.value.split(" ").join("-"))}
          placeholder="Enter any keyword"
          type="text"
          className="shadow-xl shadow-[#00000038] mt-14 py-4 px-4 border rounded-lg w-full md:w-xl border-(--primary-color) outline-0 bg-(--white-color) mx-3 sm:mx-8"
        />
      </div>
      <ImageShow responseData={responseData} />
    </div>
  );
};

export default Search;
