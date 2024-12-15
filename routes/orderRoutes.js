const { createOrder, getAllOrders, getOrder, updateOrder, deleteOrder, completeOrder, OrdersData } = require('../controllers/orderController');
const verifyToken = require('../middleware/verifyToken');
const verifyRole = require('../middleware/verifyRole');
const userRoles = require('../utils/userRoles');
const { orderValidator } = require('../utils/validators/orderValidator');
const router = require('express').Router();
/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order (Admin and Staff only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: You don't have permission to perform this action
 *
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get order by ID (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 *
 *   put:
 *     summary: Update order (Admin only)
 *     tags: [Orders]
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
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       403:
 *         description: You don't have permission to perform this action
 *
 *   delete:
 *     summary: Delete order (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       403:
 *         description: You don't have permission to perform this action
 *
 * /api/orders/{orderId}/complete:
 *   put:
 *     summary: Complete order (Admin and Staff only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order marked as completed
 *       403:
 *         description: You don't have permission to perform this action
 */


router.post("/", orderValidator, verifyToken, verifyRole(userRoles.ADMIN, userRoles.STAFF), createOrder);

router.get("/", verifyToken, verifyRole(userRoles.ADMIN), getAllOrders);

router.get("/:orderId", verifyToken, verifyRole(userRoles.ADMIN), getOrder);

router.get("/Orders/data", verifyToken, verifyRole(userRoles.ADMIN), OrdersData);

router.put("/:orderId", verifyToken, verifyRole(userRoles.ADMIN), updateOrder);

router.delete("/:orderId", verifyToken, verifyRole(userRoles.ADMIN), deleteOrder);

router.put("/:orderId/complete", verifyToken, verifyRole(userRoles.ADMIN, userRoles.STAFF), completeOrder);

module.exports = router