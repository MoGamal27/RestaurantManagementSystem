const router = require('express').Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const menu_itemsRoutes = require('./menu_itemsRoutes');
const orderRoutes = require('./orderRoutes');
const order_itemsRoutes = require('./order_itemsRoutes');


router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/menu_items', menu_itemsRoutes);
router.use('/orders', orderRoutes);
router.use('/order_items', order_itemsRoutes);

module.exports = router;