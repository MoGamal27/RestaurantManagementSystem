const { createCategory, getAllCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const verifyToken = require('../middleware/verifyToken');
const verifyRole = require('../middleware/verifyRole');
const userRoles = require('../utils/userRoles');
const { categoryValidator } = require('../utils/validators/categoryValidator');
const router = require('express').Router();


router.post("/", categoryValidator, verifyToken, verifyRole(userRoles.ADMIN), createCategory);

router.get('/', getAllCategories);

router.get('/:id', getCategory);

router.put('/:id',  categoryValidator, verifyToken, verifyRole(userRoles.ADMIN), updateCategory);

router.delete('/:id', verifyToken, verifyRole(userRoles.ADMIN), deleteCategory);

module.exports = router

