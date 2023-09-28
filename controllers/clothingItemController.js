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

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => {
      res.send({ message: "Item Deleted", data: item });
    })
    .catch((err) => handleErrors(err, res));
};

const likeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then(() => res.send({ message: `Item ${req.params.itemId} liked` }))
    .catch((err) => handleErrors(err, res));

const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then(() => res.send({ message: `Item ${req.params.itemId} disliked` }))
    .catch((err) => handleErrors(err, res));

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
