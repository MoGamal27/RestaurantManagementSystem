const { orders, order_items, Menu_items } = require('../models')
const HandlerFactory = require('./handlerFactory');
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const Exceljs = require('exceljs');
const path = require('path');
const fs = require('fs');

exports.createOrder = HandlerFactory.createOne(orders)

exports.getAllOrders = asyncHandler(async (req, res, next) => {
    const ordersData = await orders.findAll({
        include: [
            {
                model: order_items,
                as: 'order_item'
            }
        ]
    });
    res.status(200).json({
        status: 'success',
        results: ordersData.length,
        data: {
            ordersData
        }
    });
});


exports.getOrder = asyncHandler(async (req, res, next) => {
    const { orderId } = req.params;

    const order = await orders.findByPk(orderId);
    
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



 exports.OrdersData = asyncHandler(async (req, res, next) => {
    const { startDate, endDate, type } = req.query;

    const ordersData = await orders.findAll({
        where: {
            createdAt: {
                [Op.between]: [startDate, endDate]
            },
        }, 
        
    });
      const outputDir = path.join(__dirname, '../exports');
        
        
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
  
      if (type === 'csv') {
        // CSV Export
        const csvFilePath = path.join(outputDir, 'orders.csv');
        const csvWriter = createCsvWriter({
          path: csvFilePath,
          header: [
            { id: 'orderId', title: 'Order ID' },
            {id: 'total_amount', title: 'Total Amount' },
            { id: 'status', title: 'Status' },
            { id: 'createdAt', title: 'Created At' },
          ],
        });
  
        const records = ordersData.map((order) => ({
          orderId: order.id,
          total_amount: order.total_amount,
          status: order.status,
          createdAt: order.createdAt,
        }));
  
        await csvWriter.writeRecords(records);
        res.download(csvFilePath, 'orders.csv');
       res.status(200).json({ message: 'CSV export completed' });

    } else {
        // Excel Export
        const xlsxFilePath = path.join(outputDir, 'orders.xlsx');
        const workbook = new Exceljs.Workbook();
        const worksheet = workbook.addWorksheet('Orders');
  
        worksheet.columns = [
          { header: 'Order ID', key: 'orderId', width: 10 },
          { header: 'Total Amount', key: 'total_amount', width: 15 },
          { header: 'Status', key: 'status', width: 10 },
          { header: 'Created At', key: 'createdAt', width: 20 },
        ];
  
        const records = ordersData.map((order) => ({
          orderId: order.id,
          total_amount: order.total_amount,
          status: order.status,
          createdAt: order.createdAt,
        }));

        records.forEach((record) => {
          worksheet.addRow(record);
        });

        await workbook.xlsx.writeFile(xlsxFilePath);
         res.download(xlsxFilePath, 'orders.xlsx');
        res.status(200).json({ message: 'Excel export completed' }); 
       
    } 
 })   
