const { createMenu_items, getAllMenu_items, getMenu_items, updateMenu_items, deleteMenu_items, getMenu_itemsByCategory, getMenu_itemsBySortPrice } = require('../controllers/menu_itemsController');
const verifyToken = require('../middleware/verifyToken');
const verifyRole = require('../middleware/verifyRole');
const userRoles = require('../utils/userRoles');
const limiter = require('../middleware/rateLimit');
const { menu_itemsValidator } = require('../utils/validators/menu_itemsValidator');
const router = require('express').Router();

/**
 * @swagger
 * /api/menu_items:
 *   post:
 *     summary: Create a new menu item (Admin only)
 *     tags: [Menu Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Menu_items'
 *     responses:
 *       201:
 *         description: Menu item created successfully
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: You don't have permission to perform this action
 *
 *   get:
 *     summary: Get all menu items
 *     tags: [Menu Items]
 *     responses:
 *       200:
 *         description: List of all menu items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu_items'
 *
 * /api/menu_items/detail/{id}:
 *   get:
 *     summary: Get menu item by ID
 *     tags: [Menu Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Menu item details
 *       404:
 *         description: Menu item not found
 *
 * /api/menu_items/category/{category_id}:
 *   get:
 *     summary: Get menu items by category
 *     tags: [Menu Items]
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the category to filter menu items
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu_items'
 *       404:
 *         description: Category not found
 *
 * /api/menu_items/price/{price}:
 *   get:
 *     summary: Get menu items sorted by price
 *     tags: [Menu Items]
 *     parameters:
 *       - in: path
 *         name: price
 *         required: true
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order for prices (asc for ascending, desc for descending)
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 results:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: object
 *                   properties:
 *                     menu_items:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Menu_items'
 *       400:
 *         description: Price must be asc or desc
 *
 * /api/menu_items/update/{id}:
 *   put:
 *     summary: Update menu item (Admin only)
 *     tags: [Menu Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Menu_items'
 *     responses:
 *       200:
 *         description: Menu item updated successfully
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: You don't have permission to perform this action
 *
 * /api/menu_items/delete/{id}:
 *   delete:
 *     summary: Delete menu item (Admin only)
 *     tags: [Menu Items]
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
 *         description: Menu item deleted successfully
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: You don't have permission to perform this action
 */


router.post('/', menu_itemsValidator, verifyToken, verifyRole(userRoles.ADMIN), limiter ,createMenu_items);

router.get('/', getAllMenu_items);

router.get('/:id', getMenu_items);

router.get('/category/:category_id', getMenu_itemsByCategory);

router.get('/price/:price', getMenu_itemsBySortPrice);

router.put('/:id', menu_itemsValidator, verifyToken, verifyRole(userRoles.ADMIN), updateMenu_items);

router.delete('/:id', verifyToken, verifyRole(userRoles.ADMIN), deleteMenu_items);

module.exports = router