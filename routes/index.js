const router = require("express").Router();
const itemRouter = require("./clothingItemRoutes");
const userRouter = require("./userRoutes");
const { ServerError } = require("../middlewares/error-handler/error-handler");

router.use("/items", itemRouter);
router.use("/user", userRouter);

router.use((req, res, next) => {
  next(new ServerError("NOT_FOUND"));
});

module.exports = router;
