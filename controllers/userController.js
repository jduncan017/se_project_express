const User = require("../models/userModel");
const { handleErrors } = require("../utils/errors");

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => handleErrors(err, res));
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => handleErrors(err, res));
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => handleErrors(err, res));
};

module.exports = { createUser, getUsers, getUser };
