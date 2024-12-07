const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/users', authMiddleware.verifyAdmin, userController.createUser);
router.get('/users', authMiddleware.verifyToken, userController.listUsers);
router.put('/users/:id', authMiddleware.verifySelfOrAdmin, userController.updateUser);
router.delete('/users/:id', authMiddleware.verifyAdmin, userController.deleteUser);

module.exports = router;
