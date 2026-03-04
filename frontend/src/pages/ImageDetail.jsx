import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addData, collectionSlice } from "../redux/collection";
import collectionQuery from "../utils/collectionQuery";

const SearchCollection = (list, search) => {
  if (!search) return list;

  return list.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase()),
  );
};

const ImageDetail = () => {
  const { imageId } = useParams();
  const [res, setRes] = useState("");
  const dispatch = useDispatch();
  const { collectionQueryFn } = collectionQuery();
  const [isOpen, setIsOpen] = useState(false);
  const collections = useSelector((state) => state.collection.collection);
  const [search, setSearch] = useState("");
  const modelChildRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `https://api.unsplash.com/photos/${imageId}?client_id=${import.meta.env.VITE_CLIENT_ID}`,
        );
        setRes(res.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // if (res) {
  //   console.log(res);
  // }

  const convertDate = (date) => {
    const months = [
      [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    ];
    return `${months[0][date.split("-")[1] - 1]} ${date.split("-")[2]}, ${date.split("-")[0]}`;
  };

  const handleModal = () => {
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
    setIsOpen(true);
  };

  useEffect(() => {
    const handleMouse = (e) => {
      if (modelChildRef.current && !modelChildRef.current.contains(e.target)) {
        setIsOpen(false);
        const body = document.querySelector("body");
        body.style.overflow = "auto";
      }
    };

    document.addEventListener("mousedown", handleMouse);
    () => document.removeEventListener("mousedown");
  }, []);

  const handleAddImage = async (id) => {
    try {
      const data = {
        id: res.id,
        author: res.user.name,
        uploadedAt: res.created_at,
        profileImage: res.user.profile_image.medium,
        urls: {
          regular: res.urls.regular,
          small: res.urls.small,
        },
      };

      await axios.post(`/api/collections/${id}/images`, data);
      collectionQueryFn();
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageDelete = async ({ imageId, collectionId }) => {
    try {
      await axios.delete(`/api/collections/${collectionId}/images/${imageId}`);
      collectionQueryFn();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {res && (
        <>
          <div className="flex flex-col md:flex-row mx-10 mt-25 mb-10 gap-5 text-sm text-(--text-color) relative">
            <div className="md:w-1/2 h-full">
              <img
                className="w-full h-auto rounded"
                src={res.urls.regular}
                alt=""
              />
            </div>
            <div className="flex flex-col md:w-1/2 gap-4 sticky top-16 h-fit">
              <div className="flex items-center gap-2">
                <img
                  src={res.user.profile_image.medium}
                  className="w-9 rounded-full"
                  alt=""
                />
                <p className="text-sm font-semibold">{res.user.name}</p>
              </div>
              <p>
                Published on
                {convertDate(res.created_at.split(":")[0].split("T")[0])}
              </p>
              <div className="font-semibold flex max-md:flex-wrap max-md:items-centers gap-8 mt-5 md:ml-4">
                <button
                  className="max-md:w-50 flex max-md:grow max-md:shrink  items-center justify-center gap-3 cursor-pointer px-4 text-xs py-2 lg:text-sm rounded bg-(--primary-color)"
                  onClick={handleModal}
                >
                  <img className=" w-5" src="/Plus.svg" alt="" />
                  Add to collection
                </button>
                <button className="max-md:w-50 flex max-md:grow max-md:shrink  items-center justify-center gap-3 cursor-pointer px-4 text-xs lg:text-sm py-2 rounded bg-(--primary-color)">
                  <img className=" w-5" src="/down-arrow.svg" alt="" />
                  Download
                </button>
              </div>
              <div className="flex flex-col gap-4 mt-5">
                <h1 className="text-2xl font-semibold">Collections</h1>
                {collections.length != 0 &&
                  collections.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div className="flex gap-4">
                        <div
                          className="rounded w-15 h-15 bg-center bg-cover"
                          style={{
                            backgroundImage:
                              item.imageCollection == 0
                                ? "url('/default-collection.png')"
                                : `url(${item.imageCollection[0].urls.small})`,
                          }}
                        ></div>
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p>{item.imageCollection.length} Photos</p>
                        </div>
                      </div>
                      <div>
                        {collections[index].imageCollection.map(
                          (item, imageCollectionIndex) => {
                            if (item.id == imageId) {
                              return (
                                <div
                                  key={imageCollectionIndex}
                                  className="flex gap-2 cursor-pointer"
                                  onClick={() =>
                                    handleImageDelete({
                                      imageId: item._id,
                                      collectionId: collections[index]._id,
                                    })
                                  }
                                >
                                  <img src="/Remove.svg" alt="" />
                                  <p>Remove</p>
                                </div>
                              );
                            }
                          },
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {isOpen && (
            <div className="fixed w-screen h-screen bg-[#00000042] top-0 left-0 z-10 flex items-center justify-center">
              <div
                tabIndex={-1}
                ref={modelChildRef}
                className="p-5 w-full max-md:mx-4 md:w-3/4 lg:w-1/2 h-fit bg-(--white-color)"
              >
                <div>
                  <h1 className="text-xl font-semibold">Add To Collections</h1>
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    className="mt-2 px-5 rounded-xl py-2 border border-(--primary-color) w-full outline-0"
                    placeholder="Search for collection"
                  />
                </div>
                <div className=" overflow-auto mt-8 flex flex-col gap-5 h-65">
                  {SearchCollection(collections, search).map((item, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        handleAddImage(
                          item._id,
                        )
                      }
                      className="cursor-pointer p-2 px-4 flex items-center justify-between rounded hover:bg-(--primary-color)"
                    >
                      <div className="flex gap-4">
                        <div
                          className="rounded w-15 h-15 bg-center bg-cover"
                          style={{
                            backgroundImage:
                              item.imageCollection == 0
                                ? "url('/default-collection.png')"
                                : `url(${item.imageCollection[0].urls.small})`,
                          }}
                        ></div>
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-xs">
                            {item.imageCollection.length} Photos
                          </p>
                        </div>
                      </div>
                      <div>
                        <img src="/Plus.svg" alt="" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ImageDetail;
