const router = require("express").Router();
const itemRouter = require("./clothingItemRoutes");
const userRouter = require("./userRoutes");

router.use("/items", itemRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(404).send({ message: "Router resource not found" });
});

module.exports = router;
