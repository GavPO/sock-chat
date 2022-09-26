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
      include: [
        {
          model: User,
          through: Participant,
        },
        {
          model: Message,
          attributes: ['content'],
        },
      ],
    });
    res.status(200).json(chatRoomData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const chatRoomData = await Chatroom.create({
      chatRoom_name: req.body.chatRoom_title,
    });
    res.status(200).json(chatRoomData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const chatRoomData = await Chatroom.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!chatRoomData) {
      res.status(404).json({ message: 'No chat room found with that id.' });
      return;
    }
    res.status(200).json(chatRoomData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
