const router = require('express').Router();
// const { User } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (_req, res) => {
  try {
    // Change this to where you app should go
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    // CHANGE THIS TO WHEREVER YOUR PROJECT NEEDS TO GO
    res.redirect('/logged_in_hompage');
    return;
  }
  res.render('login');
});

router.get('/logged_in_homepage', async (req, res) => {
  const allChatRooms = await Chatroom.findAll({ raw: true });
  res.render('homepage', {
    chatRoom: allChatRooms,
    logged_in: req.session.logged_in,
  });
});

module.exports = router;
