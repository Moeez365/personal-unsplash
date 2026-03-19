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

  const searchImages = async (search, page) => {
    try {
      if (!page) {
        // When this function is called from the toNavigate function, no page parameter is passed,
        // therefore the default page is 1.
        // Before fetching the API, we clear the previous data.
        setResponseData([]);
        page = 1;
      }
      const res = await axios.get(
        `https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_CLIENT_ID}&page=${page}&query=${search.split("-").join(" ")}`,
      );

      const result = res.data.results || [];
      const totalPages = res.data.total_pages;

      if (page <= totalPages) {
        setResponseData((prev) => [...prev, ...result]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toNavigate = (search) => {
    navigate(`/search?name=${search}`);
    searchImages(search);
  };

  const handleSearch = (e) => {
    if (e.key == "Enter" && search) {
      toNavigate(search);
    }
  };

  useEffect(() => {
    searchImages(search, page);
  }, [page]);

  useEffect(() => {
    window.scrollTo({top:0, behavior:'smooth'})
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
      <div className="bg-[url(/gradiend-bg.svg)] bg-cover bg-center h-16" />
      <div className="sticky top-19">
        <div className="full flex justify-center">
          <div className="flex bg-(--white-color) items-center justify-center h-15 w-full mx-4 md:w-xl border border-(--primary-color) rounded-lg shadow-xl shadow-[#00000017]">
            <input
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              defaultValue={search.split("-").join(" ")}
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
