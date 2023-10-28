const User = require("../models/userModel");
const {
  handleErrors,
  USER_NOT_FOUND,
  EMAIL_EXISTS,
  INCORRECT_CREDENTIALS,
} = require("../utils/errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const createUser = async (req, res) => {
  const { name, avatar, email, password } = req.body;
  console.log(req.body);

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return handleErrors(new Error(EMAIL_EXISTS), res);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  User.create({ name, avatar, email, password: hashedPassword })
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.send(userObj);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return handleErrors(new Error(EMAIL_EXISTS), res);
      }
      handleErrors(err, res);
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
    .catch((err) => {
      handleErrors(new Error(INCORRECT_CREDENTIALS), res);
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return handleErrors(new Error(USER_NOT_FOUND), res);
      }
      res.send(user);
    })
    .catch((err) => {
      handleErrors(err, res);
    });
};

const updateProfile = (req, res) => {
  const userId = req.user._id;
  const updates = req.body;

  User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return handleErrors(new Error("User not found"), res);
      }
      res.send(updatedUser);
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
