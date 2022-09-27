const User = require('./User');
const Message = require('./Message');
const Chatroom = require('./Chatroom');
const Participant = require('./Participant');


User.hasMany(Participant);
User.hasMany(Message);

Participant.belongsTo(User, {
  foreignKey: 'user_id',
});
Participant.belongsTo(Chatroom, {
  foreignKey: 'chatroom_id',
});

Chatroom.hasMany(Message);
Chatroom.hasMany(Participant);

Message.belongsTo(User, {
  foreignKey: 'user_id',
});
Message.belongsTo(Chatroom, {
  foreignKey: 'chatroom_id',
});

module.exports = { User, Chatroom, Message, Participant };
