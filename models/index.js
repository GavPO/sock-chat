const User = require('./User');
const Message = require('./Message');
const Chatroom = require('./Chatroom');
const Participant = require('./Participant');

// SUPER MANY TO MANY RELATIONSHIP
// CHATROOMS HAVE MANY USERS AND THAT USER HAS MANY CHATROOMS


// Chatroom.belongsToMany(User, { through: Participant });
// User.belongsToMany(Chatroom, { through: Participant });

User.hasMany(Participant);
User.hasMany(Message);

Participant.belongsTo(User, {
  foreignKey: 'user_id',
});
Participant.belongsTo(Chatroom, {
  foreignKey: 'room_id'
});

Chatroom.hasMany(Message);
Chatroom.hasMany(Participant);

Message.belongsTo(User, {
    foreignKey: 'user_id',
  });
Message.belongsTo(Chatroom, {
  foreignKey: 'room_id',
});

// Chatroom.hasMany(Participant);
// Participant.belongsTo(Chatroom, {
//   foreignKey: 'room_id',
// });


// User.hasMany(Participant);
// Participant.belongsTo(User, {
//   foreignKey: 'user_id',
// });

// // USER HAS MANY MESSAGES & THAT MESSAGE BELONGS TO THAT USER
// User.hasMany(Message, {
//   foreignKey: 'user_id',
// });

// Message.belongsTo(User, {
//   foreignKey: 'user_id',
// });

// // CHAT ROOM HAS MANY MESSAGES AND THAT MESSAGE BELONGS TO THAT CHATROOM
// Chatroom.hasMany(Message, {
//   foreignKey: 'room_id',
// });

// Message.belongsTo(Chatroom, {
//   foreignKey: 'room_id',
// });

module.exports = { User, Chatroom, Message, Participant };
