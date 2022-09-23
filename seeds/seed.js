const sequelize = require('../config/connection');
const { User, Chatroom, Message, Participant } = require('../models');

const userData = require('./userData.json');
const chatRoomData = require('./chatRoomData.json');
const messageData = require('./messageData.json');
const participantData = require('./participantData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.info('Users Seeded:', users);

  const chatRooms = await Chatroom.bulkCreate(chatRoomData, {
    individualHooks: true,
    returning: true,
  });
  console.info('Chatrooms Seeded:', chatRooms);

  const messages = await Message.bulkCreate(messageData, {
    individualHooks: true,
    returning: true,
  });
  console.info('Messages Seeded:', messages);

  const participants = await Participant.bulkCreate(participantData, {
    individualHooks: true,
    returning: true,
  });
  console.info('Participants Seeded:', participants);

  process.exit(0);
};

seedDatabase();
