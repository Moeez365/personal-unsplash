import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Collection from "./pages/Collection";
import { useDispatch } from "react-redux";
import { addData } from "./redux/collection";
import axios from "axios";
import ImageDetail from "./pages/ImageDetail";
import CollectionImages from "./pages/CollectionImages";
import collectionQuery from "./utils/collectionQuery";

const App = () => {
  const { collectionQueryFn } = collectionQuery();
  useEffect(() => {
    collectionQueryFn();
  });
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      children: [
        { index: true, element: <Home /> },
        { path: "search", element: <Search /> },
        { path: "collection", element: <Collection /> },
        { path: "image/:imageId", element: <ImageDetail /> },
        { path: ":collectionId/collection", element: <CollectionImages /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
