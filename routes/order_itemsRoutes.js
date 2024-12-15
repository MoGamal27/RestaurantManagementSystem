const { addOrderItem, deleteOrderItem, topSellingItems } = require('../controllers/order_itemsCOntroller')
const verifyToken = require('../middleware/verifyToken');
const verifyRole = require('../middleware/verifyRole');
const userRoles = require('../utils/userRoles');
const { order_itemsValidator } = require('../utils/validators/order_itemsValidator');
const router = require('express').Router();

/**
 * @swagger
 * /api/order_items/{orderId}:
 *   post:
 *     summary: Add item to order (Admin and Staff only)
 *     tags: [Order Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderItem'
 *     responses:
 *       201:
 *         description: Order item added successfully
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: You don't have permission to perform this action
 *
 * /api/order_items/{id}:
 *   delete:
 *     summary: Delete order item (Admin and Staff only)
 *     tags: [Order Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order item deleted successfully
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: You don't have permission to perform this action
 */

router.post("/:orderId", order_itemsValidator, verifyToken, verifyRole(userRoles.ADMIN, userRoles.STAFF), addOrderItem);

router.get("/top-selling-items", verifyToken, verifyRole(userRoles.ADMIN) ,topSellingItems);

router.delete("/:id", verifyToken, verifyRole(userRoles.ADMIN, userRoles.STAFF), deleteOrderItem);

module.exports = router