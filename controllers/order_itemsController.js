const asyncHandler = require('express-async-handler');
const { order_items, orders, Menu_items } = require('../models');
const sequelize = require('sequelize');
const { Op } = sequelize;
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const Exceljs = require('exceljs');
const path = require('path');
const fs = require('fs');


/**
 * @desc    Add order item to order
 * @route   POST api/orders/:orderId/order_items
 * @access  Admin & Staff
 */
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

/**
 * @desc    Delete order item from order
 * @route   DELETE api/orders/:orderId/order_items/:orderItemId
 * @access  Admin & Staff
 * @param   orderId
 * @param   orderItemId
 */ 
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
        totalAmount: order.total_amount - orderItem.subtotal
    });

    await orderItem.destroy();
    
    res.status(200).json({ message: 'Item removed successfully' });

    });



/**
 * @desc    Get top selling items in the last 30 days
 * @route   GET api/order_items/top-selling-items
 * @access  Admin only
 */
exports.topSellingItems = asyncHandler(async (req, res, next) => {
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
        const topItems = await order_items.findAll({
            attributes: [
                'menu_item_id',
                [sequelize.fn('SUM', sequelize.col('quantity')), 'totalQuantity']
            ],
            include: [{
                model: Menu_items,
                as: 'menu_item',
                attributes: ['name', 'price']
            }, {
                model: orders,
                as: 'order',
                where: {
                    createdAt: { [Op.gte]: thirtyDaysAgo },
                    status: 'completed'
                },
                attributes: []
            }],
            group: ['order_items.menu_item_id', 'menu_item.id', 'menu_item.name', 'menu_item.price'],
            order: [[sequelize.fn('SUM', sequelize.col('quantity')), 'DESC']],
            limit: 10
        });
    
        const exportType = req.query.type || 'csv';
        const outputDir = path.join(__dirname, '../exports');
        
        
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
    
        if (exportType === 'csv') {
            const csvFilePath = path.join(outputDir, 'top-selling-items.csv');
            const csvWriter = createCsvWriter({
                path: csvFilePath,
                header: [
                    { id: 'name', title: 'Name' },
                    { id: 'price', title: 'Price' },
                    { id: 'totalQuantity', title: 'Total Sold' }
                ]
            });
    
            const records = topItems.map(item => ({
                name: item.get('menu_item').name,
                price: item.get('menu_item').price,
                totalQuantity: parseInt(item.get('totalQuantity'))
            }));
    
            await csvWriter.writeRecords(records);
            res.download(csvFilePath, 'top-selling-items.csv');
            res.status(200).send('CSV file exported successfully.');

        } else {
            const xlsxFilePath = path.join(outputDir, 'top-selling-items.xlsx');
            const workbook = new Exceljs.Workbook();
            const worksheet = workbook.addWorksheet('Top Selling Items');
    
            worksheet.columns = [
                { header: 'Name', key: 'name', width: 30 },
                { header: 'Price', key: 'price', width: 15 },
                { header: 'Total Sold', key: 'totalSold', width: 15 }
            ];
    
            topItems.forEach(item => {
                worksheet.addRow({
                    name: item.get('menu_item').name,
                    price: item.get('menu_item').price,
                    totalSold: parseInt(item.get('totalQuantity'))
                });
            });
    
            await workbook.xlsx.writeFile(xlsxFilePath);
            res.download(xlsxFilePath, 'top-selling-items.xlsx');
            res.status(200).send('Excel file exported successfully.');
        }
    });
    


