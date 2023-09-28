const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItemController");

// Create
router.post("/", createItem);

// Read Items
router.get("/", getItems);

// Update Item
router.put("/:itemId", updateItem);

// Delete Item
router.delete("/:itemId", deleteItem);

// Like Item
router.put("/:itemId/likes", likeItem);

// Dislike Item
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
