const router = require('express').Router();
const { User, Chatroom, Message, Participant } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const userData = await Chatroom.findAll();
      res.status(200).json(userData);
    } catch(err) {
      res.status(500).json(err);
    };
  });

  router.get('/:id', async (req, res) => {
    try {
      const userData = await Chatroom.findByPk(req.params.id, {
        attributes: ['room_name'],
        include: [{ User, through: Participant }, { include: Message, through: User }],
      });
      res.status(200).json(userData);
    } catch(err) {
      res.status(500).json(err);
    };
  });

module.exports = router;