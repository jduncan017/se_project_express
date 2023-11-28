const ClothingItem = require("../models/clothingItemModel");
const { ServerError } = require("../middlewares/error-handler/error-handler");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new ServerError("BAD_REQUEST"));
      } else {
        next(err);
      }
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => next(err));
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail(() => new ServerError("NOT_FOUND"))
    .then((item) => {
      if (String(item.owner) === String(userId)) {
        return ClothingItem.findByIdAndDelete(itemId);
      }
      throw new ServerError("USER_PERMISSION");
    })
    .then((item) => {
      res.send({ message: "Item Deleted", data: item });
    })
    .catch((err) => {
      next(err);
    });
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new ServerError("NOT_FOUND"))
    .then((updatedItem) => {
      res.send(updatedItem);
    })
    .catch((err) => next(err));
};

const dislikeItem = (req, res, next) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new ServerError("NOT_FOUND"))
    .then((updatedItem) => {
      res.send(updatedItem);
    })
    .catch((err) => next(err));

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
