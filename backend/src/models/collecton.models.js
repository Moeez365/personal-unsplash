import mongoose from "mongoose";

const collecitonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      require: true,
    },
    imageCollection: [{ type: mongoose.Types.ObjectId, ref: "Image" }],
  },
  {
    timestamps: true,
  },
);

const Collection = mongoose.model("Collection", collecitonSchema);

const imagesSchema = mongoose.Schema({
  id: {
    require: true,
    type: String,
    unique:true
  },
  author: {
    require: true,
    type: String,
  },
  uploadedAt: {
    require: true,
    type: String,
  },
  profileImage: {
    require: true,
    type: String,
  },
  urls: {
    regular: {
      require: true,
      type: String,
    },
    small: {
      require: true,
      type: String,
    },
  },
});

const Image = mongoose.model("Image", imagesSchema);

export { Collection, Image };
