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

  const toNavigate = (search) =>{
     navigate(`/search?name=${search}`);
           searchImages(search);
  }

  const handleSearch = (e) => {
    if (e.key == "Enter" && search) {
     toNavigate(search)
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
    <div className="mt-15 relative">
      <div className="sticky top-15">
        <div className="bg-[url(/gradiend-bg.svg)] bg-cover bg-center h-16" />
        <div className="-mt-6 full flex justify-center">
          <div className="flex bg-(--white-color) items-center justify-center h-15 w-full mx-4 md:w-xl border border-(--primary-color) rounded-lg shadow-xl shadow-[#00000017]">
            <input
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              defaultValue={search}
              type="text"
              placeholder="Enter any keyword"
              className="py-4 px-4 h-full w-full rounded-l-lg outline-0"
            />
            <span
              className="px-4 border-l h-full rounded-r-lg flex items-center border-(--primary-color) cursor-pointer"
              onClick={() => toNavigate(search)}
            >
              <img src="/Search.svg" alt="" />
            </span>
          </div>
        </div>
      </div>
      <ImageShow responseData={responseData} />
    </div>
  );
};

export default Search;
