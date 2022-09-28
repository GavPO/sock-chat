const router = require('express').Router();
const { User, Chatroom, Message, Participant } = require('../../models');

router.get('/', async (_req, res) => {
  try {
    const userData = await User.findAll({
      attributes: ['username', 'id'],
      include: [
        {
          model: Participant,
          include: [Chatroom],
        },
        {
          model: Message,
        },
      ],
    });
    res.status(200).json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: ['username'],
      include: [
        {
          model: Participant,
          include: [Chatroom],
        },
        {
          model: Message,
        },
      ],
    });
    res.status(200).json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const userCheck = await User.findOne({
      where: { username: req.body.username },
    });
    if (userCheck) {
      res.status(400).json({ message: 'Username taken, please try again!' });
      return;
    }
    const newUser = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
    });
    res.status(200).redirect('/logged_in_homepage');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      // CHANGE THIS REDIRECT TO WHERE YOU WANT THE USER TO GO
      res.status(200).redirect('/logged_in_homepage');
    });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(200).redirect('/login');
    });
  } else {
    // Change this wherever you like
    res.status(400).redirect('/');
  }
});

module.exports = router;
