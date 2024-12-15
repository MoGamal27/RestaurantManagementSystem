const { createCategory, getAllCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const verifyToken = require('../middleware/verifyToken');
const verifyRole = require('../middleware/verifyRole');
const userRoles = require('../utils/userRoles');
const { categoryValidator } = require('../utils/validators/categoryValidator');
const router = require('express').Router();

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category (Admin only)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category created successfully
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: You don't have permission to perform this action
 *
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *
 * /api/categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category details
 *       404:
 *         description: Category not found
 *
 *   put:
 *     summary: Update category (Admin only)
 *     tags: [Categories]
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
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: You don't have permission to perform this action
 *
 *   delete:
 *     summary: Delete category (Admin only)
 *     tags: [Categories]
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
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: You don't have permission to perform this action
 */


router.post("/", categoryValidator, verifyToken, verifyRole(userRoles.ADMIN), createCategory);

router.get('/', getAllCategories);

router.get('/:id', getCategory);

router.put('/:id',  categoryValidator, verifyToken, verifyRole(userRoles.ADMIN), updateCategory);

router.delete('/:id', verifyToken, verifyRole(userRoles.ADMIN), deleteCategory);

module.exports = router

