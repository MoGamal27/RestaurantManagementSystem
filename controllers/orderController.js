const { orders } = require('../models');
const HandlerFactory = require('./handlerFactory');
const asyncHandler = require('express-async-handler');


exports.createOrder = HandlerFactory.createOne(orders)

exports.getAllOrders = asyncHandler(async (req, res, next) => {
    const orders = await orders.findAll({
        include: [
            {
                model: order_items,
                include: [Menu_items]
            }
        ]
    });
    res.status(200).json({
        status: 'success',
        results: orders.length,
        data: {
            orders
        }
    });
});


exports.getOrder = asyncHandler(async (req, res, next) => {
    const { orderId } = req.params;
    const order = await orders.findByPk(orderId, {
        include: [
            {
                model: order_items,
                include: [Menu_items]
            }
        ]
    });
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({
        status: 'success',
        data: {
            order
        }
        });
    });

exports.updateOrder = HandlerFactory.updateOne(orders);

exports.deleteOrder = HandlerFactory.deleteOne(orders);


// mark order as completed
exports.completeOrder = asyncHandler(async (req, res, next) => {
    const { orderId } = req.params;

    const order = await orders.findByPk(orderId);

    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status !== 'pending') {
        return res.status(400).json({ message: 'Order not in pending state' });
    }

    await order.update({ status: 'completed' });

    res.status(200).json({ message: 'Order completed successfully' });

    });

