const express = require('express');
const router = express.Router();
const { authUser, verifyOtp, registerUser, listUsers, updateUserRole, deleteUser } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', authUser);
router.post('/verify-otp', verifyOtp);
router.get('/', protect, adminOnly, listUsers);
router.patch('/:id/role', protect, adminOnly, updateUserRole);
router.delete('/:id', protect, adminOnly, deleteUser);

module.exports = router;
