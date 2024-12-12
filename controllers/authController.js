const { User } = require('../models');
const generateJWT = require('../middleware/generateJWT');
const appError = require('../utils/appError');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

exports.signup = asyncHandler(async (req, res, next) => {
   
        const { name, email, password, role } = req.body;

        const user = await User.create({
            name,
            email,
            password,
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
    

exports.signIn = asyncHandler(async (req, res, next) => {
    
        const user = await User.findOne({ email: req.body.email });

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