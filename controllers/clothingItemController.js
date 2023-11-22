const ClothingItem = require("../models/clothingItemModel");
const { handleErrors } = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.send(item);
    })
    .catch((err) => handleErrors(err, res));
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => handleErrors(err, res));
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) === String(userId)) {
        return ClothingItem.findByIdAndDelete(itemId);
      }
      return Promise.reject(new Error("USER_PERMISSION"));
    })
    .then((item) => {
      res.send({ message: "Item Deleted", data: item });
    })
    .catch((err) => {
      if (err.message === "USER_PERMISSION") {
        return handleErrors("USER_PERMISSION", res);
      }
      return handleErrors(err, res);
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((updatedItem) => {
      res.send(updatedItem);
    })
    .catch((err) => handleErrors(err, res));
};

const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((updatedItem) => {
      res.send(updatedItem);
    })
    .catch((err) => handleErrors(err, res));

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
