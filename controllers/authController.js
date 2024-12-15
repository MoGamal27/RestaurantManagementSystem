const { User } = require('../models');
const generateJWT = require('../middleware/generateJWT');
const appError = require('../utils/appError');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');


/**
 * @desc    Signup a new user
 * @route   POST /api/auth/signup
 * @access  Public
 * @returns {Object} - User object
 * @throws {Error} - If user already exists
 */
exports.signup = asyncHandler(async (req, res, next) => {
   
        const { name, email, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        }); 

        const token = await generateJWT({id: user.id, role: user.role});

        res.status(201).json({
            status: 'success',
            token: token,
            data: {
                user
            }});
    
    });
    

 /**
   * @desc    Signin a user
     * @route   POST /api/auth/signin
     * @access  Public
     * @returns {Object} - User object
     * @throws {Error} - If user does not exist or password is incorrect
     */

exports.signIn = asyncHandler(async (req, res, next) => {
    
        const user = await User.findOne({ where : {email: req.body.email }});

        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
          return next(new appError('Incorrect email or password', 401));
        }

        const token = await generateJWT({id: user.id, role: user.role});

        res.status(200).json({
            status: 'success',
            token: token,
            data: {
                user
            }});

});