const router = require("express").Router();
const itemRouter = require("./clothingItemRoutes");
const userRouter = require("./userRoutes");
const NotFoundError = require("../utils/errors/NotFoundError");

router.use("/items", itemRouter);
router.use("/users", userRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Router resource not found."));
});

module.exports = router;
