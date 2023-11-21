const router = require("express").Router();
const itemRouter = require("./clothingItemRoutes");
const userRouter = require("./userRoutes");
const { handleErrors } = require("../utils/errors");

router.use("/items", itemRouter);
router.use("/user", userRouter);

router.use((req, res) => {
  handleErrors("NOT_FOUND", res);
});

module.exports = router;
