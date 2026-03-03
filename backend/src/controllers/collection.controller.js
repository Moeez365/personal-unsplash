import { ApiError } from "../utils/errors.utils.js";
import { Collection, Image } from "../models/collecton.models.js";
import { ApiRespose } from "../utils/response.utils.js";
import mongoose from "mongoose";
const createCollection = async (req, res) => {
  try {
    const { collectionName } = req.body;

    if (!collectionName) {
      throw new ApiError(400, "collection name not found");
    }

    const findCollection = await Collection.findOne({ name: collectionName });
    if (findCollection) {
      throw new ApiError(409, "collection already exists");
    }

    const newCollection = new Collection({ name: collectionName });
    await newCollection.save();

    res.status(201).json(new ApiRespose(201, "All done", newCollection));
  } catch (err) {
    throw err;
  }
};

const getAllCollection = async (req, res) => {
  try {
    const allCollection = await Collection.find().populate("imageCollection");
    if (!allCollection) {
      throw new ApiError(404, "no collection found");
    }

    res
      .status(200)
      .json(
        new ApiRespose(
          200,
          "all collection is successfully get",
          allCollection,
        ),
      );
  } catch (err) {
    throw err;
  }
};

const getCollectionDetails = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const findCollection = await Collection.findById(collectionId);
    if (!findCollection) {
      throw new ApiError(404, "no collection found");
    }
    res
      .status(200)
      .json(
        new ApiRespose(200, "collection is sucessfully found", findCollection),
      );
  } catch (err) {
    throw err;
  }
};

const addImageToCollection = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const { author, uploadedAt, id, profileImage, urls } = req.body;

    const findCollection = await Collection.findById(collectionId);
    if (!findCollection) {
      throw new ApiError(404, "collection not found");
    }

    const findImage =
      await Collection.findById(collectionId).populate("imageCollection");

    const isFindImage = findImage.imageCollection.find((item) => item.id == id);

    if (isFindImage) {
      res.status(400).json(new ApiRespose(400, "Image already in collection"));
      return;
    }

    const saveImage = new Image({
      author,
      uploadedAt,
      id,
      profileImage,
      urls,
    });

    await saveImage.save();

    const collection = await Collection.findByIdAndUpdate(
      collectionId,
      {
        $push: { imageCollection: saveImage._id },
      },
      { new: true },
    );

    res
      .status(201)
      .json(new ApiRespose(201, "images is added on collection", collection));
  } catch (err) {
    throw err;
  }
};

const getSingleImage = async (req, res) => {
  try {
    const { imageId } = req.params;

    const findImage = await Image.findOne(imageId);

    if (!findImage) {
      throw new ApiError(404, "image not found");
    }

    res
      .status(200)
      .json(new ApiRespose(200, "images is added on collection", findImage));
  } catch (err) {
    throw err;
  }
};

const deleteImageFromCollection = async (req, res) => {
  try {
    const { imageId, collectionId } = req.params;

    const findCollection = await Collection.findByIdAndUpdate(
      collectionId,
      {
        $pull: { imageCollection: new mongoose.Types.ObjectId(imageId) },
      },
      { new: true },
    );

    if (!findCollection) {
      throw new ApiError(404, "collection not found");
    }

    const findImage = await Image.findByIdAndDelete(imageId);

    if (!findImage) {
      throw new ApiError(404, "image not found");
    }

    res
      .status(200)
      .json(new ApiRespose(204, "image successfully", findCollection));
  } catch (err) {
    throw err;
  }
};

const getAllCollectionImages = async (req, res) => {
  try {
    const { collectionId } = req.params;

    const findCollection =
      await Collection.findById(collectionId).populate("imageCollection");

    if (!findCollection) {
      throw new ApiError(404, "collection not found");
    }

    res
      .status(200)
      .json(new ApiRespose(200, "get images successfully", findCollection));
  } catch (err) {
    throw err;
  }
};

export {
  createCollection,
  getAllCollection,
  getCollectionDetails,
  addImageToCollection,
  getSingleImage,
  deleteImageFromCollection,
  getAllCollectionImages,
};
