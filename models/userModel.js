const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const {
  IncorrectCredentialsError,
} = require("../middlewares/error-handler/error-handler");

const user = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "Please enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "Please enter a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator(value) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
        return regex.test(value);
      },
      message:
        "Please include at least one lowercase letter, uppercase letter, number, and special character",
    },
  },
});

user.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select("+password")
    .then((userProfile) => {
      if (!userProfile) {
        return Promise.reject(new IncorrectCredentialsError());
      }

      return bcrypt.compare(password, userProfile.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new IncorrectCredentialsError());
        }

        return userProfile;
      });
    });
};

module.exports = model("User", user);
