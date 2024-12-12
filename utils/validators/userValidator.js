const { check } = require("express-validator");
const validatorMiddleware = require('../../middleware/validatorMiddleware');
const { User } = require('../../models');
const { where } = require("sequelize");

exports.userValidator = [
    check("name")
         .notEmpty()
        .withMessage("Name is required"),

    check("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Provide a valid email")
        .custom((value, { req }) => {
            return User.findOne({ where: { email: value } }).then((userDoc) => {
                if (userDoc) {
                    return Promise.reject("Email already in use");
                }
            });
        }),

    check("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    validatorMiddleware,
]