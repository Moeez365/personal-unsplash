import mongoose from "mongoose";

const collecitonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    imageCollection: [{ type: mongoose.Types.ObjectId, ref: "Image" }],
  },
  {
    timestamps: true,
  },
);

const Collection = mongoose.model("Collection", collecitonSchema);

const imagesSchema = new mongoose.Schema({
  id: {
    required: true,
    type: String
  },
  author: {
    required: true,
    type: String,
  },
  uploadedAt: {
    required: true,
    type: String,
  },
  profileImage: {
    required: true,
    type: String,
  },
  urls: {
    regular: {
      required: true,
      type: String,
    },
    small: {
      required: true,
      type: String,
    },
  },
});

const Image = mongoose.model("Image", imagesSchema);

export { Collection, Image };
