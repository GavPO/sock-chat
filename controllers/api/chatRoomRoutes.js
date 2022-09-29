const router = require('express').Router();
const { User, Chatroom, Message, Participant } = require('../../models');

//Get rooms
router.get('/', async (req, res) => {
  try {
    const chatRoomData = await Chatroom.findAll({
      nest: true,
      attributes: ['room_name'],
      include: [
        {
          model: Participant,
          include: [
            {
              model: User,
              attributes: { exclude: ['password'] },
            },
          ],
        },
        {
          model: Message,
        },
      ],
    });
    res.status(200).json(chatRoomData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

//Get messages and participants in a room
router.get('/:id', async (req, res) => {
  try {
    const chatRoomData = await Chatroom.findByPk(req.params.id, {
      attributes: ['room_name'],
      include: [
        {
          model: Participant,
          include: [
            {
              model: User,
              attributes: { exclude: ['password'] },
            },
          ],
        },
        {
          model: Message,
        },
      ],
    });
    res.status(200).json(chatRoomData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/id', async (req, res) => {
  try {
    const chatRoomData = await Chatroom.findByPk(req.body.id, {
      nest: true,
      raw: true,
      include: [
        {
          model: Participant,
          include: [
            {
              model: User,
              attributes: { exclude: ['password'] },
            },
          ],
        },
        {
          model: Message,
        },
      ],
    });
    console.log(chatRoomData);
    res.status(200).json(chatRoomData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Create new room
router.post('/', async (req, res) => {
  try {
    const chatRoomData = await Chatroom.create({
      room_name: req.body.room_name,
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
