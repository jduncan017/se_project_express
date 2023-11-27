const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/userModel");
const { ServerError } = require("../middlewares/error-handler/error-handler");

const createUser = async (req, res, next) => {
  try {
    const { name, avatar, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email,
      password: hashedPassword,
      avatar: avatar || undefined,
    };

    return User.create(userData)
      .then((user) => {
        const userObj = user.toObject();
        delete userObj.password;
        res.status(200).send(userObj);
      })
      .catch((err) => {
        if (err.code === 11000) {
          return next(new ServerError("EMAIL_EXISTS"));
        }
        next(err);
      });
  } catch (err) {
    next(err);
  }
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
};

const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => next(err));
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(() => {
      return next(new ServerError("INCORRECT_CREDENTIALS"));
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new ServerError("USER_NOT_FOUND"));
      }
      return res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar, email } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar, email },
    { new: true, runValidators: true },
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return next(new ServerError("USER_NOT_FOUND"));
      }
      return res.send(updatedUser);
    })
    .catch((err) => {
      next(err);
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
