const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const routes = require("./routes");
const { rateLimiter } = require("./utils/rateLimiter");
const { login, createUser } = require("./controllers/userController");
const { errorHandler } = require("./middlewares/error-handler/error-handler");
const { errors } = require("celebrate");
const { validateUserInfo, validateAuth } = require("./middlewares/validation");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3001 } = process.env;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error connecting to database: ", err));

// app setup
app.use(express.json());
app.use(cors({ origin: "http://www.wtwr.blinklab.com" }));
app.use(rateLimiter);
app.use(helmet());

// routing
app.post("/signup", validateUserInfo, createUser);
app.post("/signin", validateAuth, login);
app.use(requestLogger);
app.use(routes);

// error handling
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

// port listening
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
