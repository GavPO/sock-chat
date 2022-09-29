const router = require('express').Router();
const { Chatroom, Participant, User, Message } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  // Change this to where you app should go
  if (req.session.logged_in) {
    // CHANGE THIS TO WHEREVER YOUR PROJECT NEEDS TO GO
    try {
      const allChatRooms = await Chatroom.findAll({ raw: true });
      res.render('homepage', {
        chatRoom: allChatRooms,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
    return;
  }
  res.render('login');
});

router.get('/login', async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    try {
      const allChatRooms = await Chatroom.findAll({ raw: true });
      res.render('homepage', {
        chatRoom: allChatRooms,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
    // CHANGE THIS TO WHEREVER YOUR PROJECT NEEDS TO GO
    return;
  }
  res.render('login');
});

router.get('/logged_in_homepage', async (req, res) => {
  try {
    const allChatRooms = await Chatroom.findAll({ raw: true });
    res.render('homepage', {
      chatRoom: allChatRooms,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/chatroom/:id', async (req, res) => {
  try {
    const roomID = req.params.id;
    const chatRoom = await Chatroom.findByPk(roomID, {
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
          attributes: ['content'],
        },
      ],
    });
    console.log(chatRoom, 'home route');
    res.render('chatroom', {
      chatRoom,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
