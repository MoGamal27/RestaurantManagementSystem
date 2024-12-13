const { addOrderItem, deleteOrderItem } = require('../controllers/order_itemsCOntroller')
const verifyToken = require('../middleware/verifyToken');
const verifyRole = require('../middleware/verifyRole');
const userRoles = require('../utils/userRoles');
const { order_itemsValidator } = require('../utils/validators/order_itemsValidator');
const router = require('express').Router();


router.post("/:orderId", order_itemsValidator, verifyToken, verifyRole(userRoles.ADMIN), addOrderItem);

router.delete("/:id", verifyToken, verifyRole(userRoles.ADMIN), deleteOrderItem);

module.exports = router