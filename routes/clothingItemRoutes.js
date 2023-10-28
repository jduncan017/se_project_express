const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItemController");

// Create
router.post("/", auth, createItem);

// Read Items
router.get("/", getItems);

// Delete Item
router.delete("/:itemId", auth, deleteItem);

// Like Item
router.put("/:itemId/likes", auth, likeItem);

// Dislike Item
router.delete("/:itemId/likes", auth, dislikeItem);

module.exports = router;
