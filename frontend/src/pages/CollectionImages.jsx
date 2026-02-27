import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageShow from "../components/ImageShow";

const CollectionImages = () => {
  const { collectionId } = useParams();
  const [response, setResponse] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/collections/${collectionId}/images`);
        setResponse(res);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (response) {
    console.log(response.data.data);
  }

  return (
    <>
      <div className="mt-15 -z-40">
        <div className="h-18 bg-[url(/gradiend-bg.svg)] bg-no-repeat bg-cover flex flex-col items-center"></div>
        {response && <ImageShow responseData={response.data.data.imageCollection} />}
      </div>
    </>
  );
};

export default CollectionImages;
