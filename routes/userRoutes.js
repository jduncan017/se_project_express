const router = require("express").Router();

const {
  getUsers,
  getUser,
  createUser,
} = require("../controllers/userController");

// Create
router.post("/", createUser);

// Read
router.get("/", getUsers);
router.get("/:userId", getUser);

module.exports = router;
