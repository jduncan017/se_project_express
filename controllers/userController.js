const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/userModel");
const { handleErrors } = require("../utils/errors");

const createUser = async (req, res) => {
  const { name, avatar, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  return User.create({ name, avatar, email, password: hashedPassword })
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.send(userObj);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return handleErrors("EMAIL_EXISTS", res);
      }
      return handleErrors(err, res);
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleErrors(err, res));
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => handleErrors(err, res));
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(() => {
      handleErrors("INCORRECT_CREDENTIALS", res);
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return handleErrors("USER_NOT_FOUND", res);
      }
      return res.send(user);
    })
    .catch((err) => {
      handleErrors(err, res);
    });
};

const updateProfile = (req, res) => {
  const userId = req.user._id;
  const { name, avatar, email } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar, email },
    { new: true, runValidators: true },
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return handleErrors("USER_NOT_FOUND", res);
      }
      return res.send(updatedUser);
    })
    .catch((err) => {
      handleErrors(err, res);
    });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  login,
  getCurrentUser,
  updateProfile,
};
