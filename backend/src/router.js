import express from "express";
import {
  addImageToCollection,
  createCollection,
  deleteImageFromCollection,
  getAllCollection,
  getAllCollectionImages,
  getCollectionDetails,
  getSingleImage,
} from "./controllers/collection.controller.js";

const router = express.Router();

router.route("/api/create-collection").post(createCollection);
router.route("/api/collections").get(getAllCollection);
router.route("/api/collections/:collectionId").get(getCollectionDetails);
router
  .route("/api/collections/:collectionId/images")
  .post(addImageToCollection);
router.route("/api/images/:imageId").get(getSingleImage);
router
  .route("/api/collections/:collectionId/images/:imageId")
  .delete(deleteImageFromCollection);
router
  .route("/api/collections/:collectionId/images")
  .get(getAllCollectionImages);

export { router };
