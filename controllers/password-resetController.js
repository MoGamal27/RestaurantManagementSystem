require('dotenv').config();
const { Token, User }  = require('../models');
const asyncHandler = require('express-async-handler');
const appError = require('../utils/appError');
const crypto = require('crypto');
const sendEmail = require('../Services/emailService');
const bcrypt = require('bcrypt');


/**
 * @desc    Reset Password
 * @route   POST /api/auth/reset-password
 * @access  Public
 * @requires email
 * @returns {link to reset password}
 */
exports.resetPassword = asyncHandler(async (req, res, next) => {

    const user = await User.findOne({ where:{ email: req.body.email} });

    if (!user) {
        return next(new appError("User not found", 404));
    }
    
    

    let token = await Token.findOne({ where: { user_id: user.id  } });
        if (!token) {
            token = await new Token({
                user_id: user.id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `${process.env.BASE_URL}/${user.id}/${token.token}`;
        await sendEmail({
            email: user.email,
            subject: "Reset Password",
            html: `<a href="${link}">Reset Password</a>`,
        });

        res.send("password reset link sent to your email account");


})

/**
 * @desc    Reset Password
 * @route   POST /api/auth/reset-password/:userId/:token
 * @access  Public
 * @requires password
 */
exports.resetUserPassword = asyncHandler(async (req, res, next) => {

    const user = await User.findByPk(req.params.userId);

   if (!user) {
        return next(new appError("User not found", 404));
    }
    

    const token = await Token.findOne({
        where: {
            user_id: user.id,
            token: req.params.token,
        }
    });

    if (!token) return res.status(400).json({
        success: false,
        status: 'fail',
        message: 'Invalid token'
    });
      
       const { password } = req.body;
       
       if(!password) return res.status(400).json({
        success: false,
        status: 'fail',
        message: 'Please enter your password'
    });

       const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        await user.save();
        await token.destroy();

        res.send("password reset sucessfully.");

})
