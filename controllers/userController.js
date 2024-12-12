const { User } = require('../models');
const asyncHandler = require('express-async-handler')
const appError = require('../utils/appError');
const bcrypt = require('bcrypt');



exports.createUser = asyncHandler(async(req, res, next) => {
    const { name, email, password ,role } = req.body;
      
      // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
    });

    
   res.status(201).json({status: 'success', data: {user}});
});

exports.getAllUsers = asyncHandler(async(req, res, next) => {

    const users = await User.findAll();
    if (!users) {
        return next(new appError('No users found', 404));
    }

    res.status(200).json({status: 'success', data: {users}});
    
});

exports.deleteUser = asyncHandler(async(req, res, next) => {
    if (!req.params.id) {
        return next(new appError('No user ID provided', 400));
    }
    const user = await User.findByPk(req.params.id);

    if (!user) {
        return next(new appError('No user found with that ID', 404));
    }

    await user.destroy();

    res.status(204).json({status: 'success', data: null});

    });

