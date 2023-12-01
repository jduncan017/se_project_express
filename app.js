require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const { errors } = require("celebrate");
const routes = require("./routes");
const { rateLimiter } = require("./utils/rateLimiter");
const { login, createUser } = require("./controllers/userController");
const errorHandler = require("./middlewares/errorHandler");
const { validateUserInfo, validateAuth } = require("./middlewares/validation");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://www.wtwr.blinklab.com",
    "http://wtwr.blinklab.com",
    "https://www.wtwr.blinklab.com",
    "https://wtwr.blinklab.com",
  ],
};

const { PORT = 3001 } = process.env;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error connecting to database: ", err));

// app setup
app.use(express.json());
app.use(cors(corsOptions));
app.use(rateLimiter);
app.use(helmet());

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// routing
app.use(requestLogger);

app.post("/signup", validateUserInfo, createUser);
app.post("/signin", validateAuth, login);
app.use(routes);

// error handling
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

// port listening
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
