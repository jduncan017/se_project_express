const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const routes = require("./routes");
const { rateLimiter } = require("./utils/rateLimiter");
const { login, createUser } = require("./controllers/userController");
const cors = require("cors");

const { PORT = 3001 } = process.env;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error connecting to database: ", err));

app.use(express.json());
app.use(cors());
app.use(rateLimiter);
app.use(helmet());

app.post("/signin", login);
app.post("/signup", createUser);
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
