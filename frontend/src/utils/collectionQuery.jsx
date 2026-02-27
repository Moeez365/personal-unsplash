import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addData } from "../redux/collection";
import axios from "axios";

const collectionQuery = () => {
  const dispatch = useDispatch();
  const collectionQueryFn = async () => {
    try {
      const res = await axios.get("/api/collections");
      dispatch(addData(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };
  return {
    collectionQueryFn,
  };
};

export default collectionQuery;
