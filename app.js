const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error connecting to database: ", err));

const routes = require("./routes");
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "651506c9c739984f38c9628b",
  };
  next();
});
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
