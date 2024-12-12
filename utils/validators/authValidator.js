const { check } = require("express-validator");
const validatorMiddleware = require('../../middleware/validatorMiddleware')
const { User } = require('../../models');

exports.signupValidator = [
    check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters"),

  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("provide a valid email")
    .custom((value, { req }) => {
        return User.findOne({ where: { email: value }}).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email already in use");
          }
        });
    }),

  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),

  validatorMiddleware,
]


exports.signinValidator = [
    check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("provide a valid email"),

  check("password").notEmpty().withMessage("password is required"),
  validatorMiddleware,
]
        