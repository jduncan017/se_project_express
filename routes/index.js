const router = require("express").Router();
const itemRouter = require("./clothingItemRoutes");
const userRouter = require("./userRoutes");
const { NotFoundError } = require("../middlewares/error-handler/error-handler");

router.use("/items", itemRouter);
router.use("/user", userRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Router resource not found."));
});

module.exports = router;
