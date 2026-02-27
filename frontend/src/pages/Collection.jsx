import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../redux/collection";
import { useNavigate } from "react-router-dom";

const Collection = () => {
  const [condition, setCondition] = useState(false);
  const boxRef = useRef(null);
  const [collectionName, setCollectionName] = useState("");
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.collection.collection);
  const navigate = useNavigate();
  const handleClick = () => {
    setCondition(true);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setCondition(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSaveCollection = async () => {
    try {
      const res = await axios.post("/api/create-collection", {
        collectionName,
      });
      dispatch(addData(res.data.data));
    } catch (error) {
      console.error(error);
    } finally {
      setCondition(false);
    }
  };

  const handleNavigate = (id) =>{
    navigate(`/${id}/collection`)
  }

  return (
    <>
      <div className="mt-25 flex flex-col items-center justify-center gap-4 mx-4 backdrop-blur-sm">
        <h1 className="text-5xl font-bold bg-[url(/gradiend-bg.svg)] bg-cover bg-center bg-clip-text text-transparent">
          Collection
        </h1>
        <p className="text-(--text-color) w-xs text-center font-bold">
          Explore the world through collection of beautiful photos free to use
        </p>
        <div className="my-10 flex items-center justify-center gap-10 flex-wrap w-full">
          {collections.length != 0 &&
            collections.map((item, index) => (
              <div key={index} className="grow shrink w-100 h-65 flex flex-col" onClick={() => handleNavigate(item._id)}>
                <div
                  className={`rounded-xl w-full h-[90%] bg-center bg-cover`}
                  style={{
                    backgroundImage:
                      item.imageCollection.length == 0
                        ? "url('/default-collection.png')"
                        : `url(${item.imageCollection[0].urls.regular})`,
                  }}
                ></div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs text-(--secondry-color)">
                  {item.imageCollection.length} photos
                </p>
              </div>
            ))}
          <div
            className="grow shrink bg-(--primary-color) w-100 h-65 flex flex-col items-center justify-center rounded-xl"
            onClick={handleClick}
          >
            <img src="/Plus.svg" className="w-6" alt="" />
            <h1 className="text-2xl font-light">Add new collection</h1>
          </div>
        </div>
      </div>

      {/*  */}
      {condition && (
        <div className="flex items-center justify-center top-0 left-0 fixed w-screen h-screen bg-[#00000042] z-20">
          <div
            tabIndex={-1}
            ref={boxRef}
            className="w-full mx-5 sm:mx-10 h-fit flex flex-col items-center p-10 md:w-1/2 text-(--text-color) bg-(--white-color) gap-8 outline-0"
            onKeyDown={(e) => e.key == "Escape" && setCondition(false)}
          >
            <h1>Add Collection</h1>
            <input
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              type="text"
              placeholder="Collection name"
              className="px-5 py-2 border border-(--primary-color) w-full outline-0 shadow-xl shadow-[#00000038]"
            />
            <div className="flex justify-center gap-4">
              <button
                className="bg-(--primary-color) px-4 py-1 rounded"
                onClick={handleSaveCollection}
              >
                Save
              </button>
              <button
                className="bg-(--primary-color) px-4 py-1 rounded"
                onClick={() => setCondition(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Collection;
