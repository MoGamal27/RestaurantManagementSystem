const { createMenu_items, getAllMenu_items, getMenu_items, updateMenu_items, deleteMenu_items, getMenu_itemsByCategory, getMenu_itemsBySortPrice } = require('../controllers/menu_itemsController');
const verifyToken = require('../middleware/verifyToken');
const verifyRole = require('../middleware/verifyRole');
const userRoles = require('../utils/userRoles');
const { menu_itemsValidator } = require('../utils/validators/menu_itemsValidator');
const router = require('express').Router();

router.post('/', menu_itemsValidator, verifyToken, verifyRole(userRoles.ADMIN), createMenu_items);

router.get('/', getAllMenu_items);

router.get('/:id', getMenu_items);

router.get('/category/:category_id', getMenu_itemsByCategory);

router.get('/price/:price', getMenu_itemsBySortPrice);

router.put('/:id', menu_itemsValidator, verifyToken, verifyRole(userRoles.ADMIN), updateMenu_items);

router.delete('/:id', verifyToken, verifyRole(userRoles.ADMIN), deleteMenu_items);

module.exports = router