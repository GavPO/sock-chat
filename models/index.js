const User = require('./User');
const Message = require('./Message');
const Chatroom = require('./Chatroom');
const Participant = require('./Participant');

// SUPER MANY TO MANY RELATIONSHIP
// CHATROOMS HAVE MANY USERS AND THAT USER HAS MANY CHATROOMS
User.hasMany(Participant);
User.hasMany(Message);

Participant.belongsTo(User, {
  foreignKey: 'user_id',
});
Participant.belongsTo(Chatroom, {
  foreignKey: 'room_id',
});

Chatroom.hasMany(Message);
Chatroom.hasMany(Participant);

Message.belongsTo(User, {
  foreignKey: 'user_id',
});
Message.belongsTo(Chatroom, {
  foreignKey: 'room_id',
});

module.exports = { User, Chatroom, Message, Participant };
