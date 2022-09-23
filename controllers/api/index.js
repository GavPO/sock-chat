const router = require('express').Router();
const userRoutes = require('./userRoutes');
const chatRoomRoutes = require('./chatRoomRoutes')

router.use('/users', userRoutes);
router.use('/chatrooms', chatRoomRoutes);

module.exports = router;
