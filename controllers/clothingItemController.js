const ClothingItem = require("../models/clothingItemModel");
const BadRequestError = require("../utils/errors/BadRequestError");
const NotFoundError = require("../utils/errors/NotFoundError");
const UserPermissionError = require("../utils/errors/UserPermissionError");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError());
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
    .orFail(() => new NotFoundError("Item not found."))
    .then((item) => {
      if (String(item.owner) === String(userId)) {
        return ClothingItem.findByIdAndDelete(itemId);
      }
      throw new UserPermissionError();
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
    .orFail(() => new NotFoundError("Item not found"))
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
    .orFail(() => new NotFoundError("Item not found"))
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
