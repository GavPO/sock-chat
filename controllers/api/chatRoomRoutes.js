const router = require('express').Router();
const { User, Chatroom, Message, Participant } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const chatRoomData = await Chatroom.findAll();
    res.status(200).json(chatRoomData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const chatRoomData = await Chatroom.findByPk(req.params.id, {
      attributes: ['room_name'],
      include: [{
        model: User, through: Participant
      }, {
        model: Message,
        attributes: ['content'],
      }]
    });
    res.status(200).json(chatRoomData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
