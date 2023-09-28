const { Schema, model, Types } = require("mongoose");
const validator = require("validator");

const clothingItem = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  weather: {
    type: String,
    enum: ["hot", "warm", "cold"],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "Please enter valid URL",
    },
  },
  owner: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("ClothingItem", clothingItem);
