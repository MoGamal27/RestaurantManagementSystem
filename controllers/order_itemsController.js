const asyncHandler = require('express-async-handler');
const { order_items, orders, Menu_items } = require('../models');

exports.addOrderItem = asyncHandler(async (req, res, next) => {
    const { orderId } = req.params;

    const { menuItemId, quantity } = req.body;

    const order = await orders.findByPk(orderId);

    if (!order) {
        return res.status(404).json({ message: 'Order not found '});
    }

    if (order.status !== 'pending') {
        return res.status(400).json({ message: 'Order not in pending state' });
    }

    const menuItem = await Menu_items.findByPk(menuItemId);

    if (!menuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
    }

    const orderItem = await order_items.create({
        order_id: orderId,
        menu_item_id: menuItemId,
        quantity,
        unit_price: menuItem.price,
        subtotal: menuItem.price * quantity,
    });

    await order.update({
        totalAmount: order.totalAmount + orderItem.subtotal
    });

    res.status(201).json(orderItem);
   
});


exports.deleteOrderItem = asyncHandler(async (req, res, next) => {
    const { orderId, orderItemId } = req.params;

    const order = await orders.findByPk(orderId);
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    if (order.status !== 'pending') {
        return res.status(400).json({ message: 'Order not in pending state' });
    }

    const orderItem = await order_items.findByPk(orderItemId);
    if (!orderItem) {
        return res.status(404).json({ message: 'Order item not found' });
    }

    await order.update({
        totalAmount: order.totalAmount - orderItem.subtotal
    });

    await orderItem.destroy();
    
    res.status(200).json({ message: 'Item removed successfully' });

    });

