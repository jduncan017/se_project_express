const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  validateClothingItem,
  validateIds,
} = require("../middlewares/validation");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItemController");

// Create
router.post("/", auth, validateClothingItem, createItem);

// Read Items
router.get("/", getItems);

// Delete Item
router.delete("/:itemId", auth, validateIds, deleteItem);

// Like Item
router.put("/:itemId/likes", auth, validateIds, likeItem);

// Dislike Item
router.delete("/:itemId/likes", auth, validateIds, dislikeItem);

module.exports = router;
