const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/userModel");
const {
  ServerError,
  BadRequestError,
  NotFoundError,
} = require("../middlewares/error-handler/error-handler");
const NODE_ENV = process.env.NODE_ENV;
console.log(NODE_ENV);

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
          return next(new ConflictError("Email already exists."));
        }
        if (err.name === "ValidationError") {
          return next(new BadRequestError());
        }
        return next(err);
      });
  } catch (err) {
    return next(err);
  }
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
    .catch(() => next(new ServerError("INCORRECT_CREDENTIALS")));
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError("User not found"));
      }
      return res.send(user);
    })
    .catch((err) => next(err));
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
        return next(new NotFoundError("User not found"));
      }
      return res.send(updatedUser);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError());
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateProfile,
};
