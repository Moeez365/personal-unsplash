import React from "react";
import { useNavigate } from "react-router-dom";

const ImageShow = ({ responseData }) => {
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`/image/${id}`);
  };
  return (
    <div className="md:columns-2 lg:columns-3 xl:columns-4 mt-20 items-center">
      {responseData &&
        responseData.map((item, index) => (
          <img
          key={index}
            className="p-4"
            loading="lazy"
            width={"100%"}
            height={"auto"}
            src={item.urls.small}
            onClick={() => handleNavigate(item.id)}
          />
        ))}
    </div>
  );
};

export default ImageShow;
