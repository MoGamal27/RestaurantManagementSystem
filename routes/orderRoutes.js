const { createOrder, getAllOrders, getOrder, updateOrder, deleteOrder, completeOrder } = require('../controllers/orderController');
const verifyToken = require('../middleware/verifyToken');
const verifyRole = require('../middleware/verifyRole');
const userRoles = require('../utils/userRoles');
const { orderValidator } = require('../utils/validators/orderValidator');
const router = require('express').Router();


router.post("/", orderValidator, verifyToken, verifyRole(userRoles.ADMIN, userRoles.STAFF), createOrder);

router.get("/", verifyToken, verifyRole(userRoles.ADMIN), getAllOrders);

router.get("/:orderId", verifyToken, verifyRole(userRoles.ADMIN), getOrder);

router.put("/:orderId", verifyToken, verifyRole(userRoles.ADMIN), updateOrder);

router.delete("/:orderId", verifyToken, verifyRole(userRoles.ADMIN), deleteOrder);

router.put("/:orderId/complete", verifyToken, verifyRole(userRoles.ADMIN, userRoles.STAFF), completeOrder);

module.exports = router