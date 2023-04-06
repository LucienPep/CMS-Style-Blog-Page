const User = require('./User');
const Post = require('./Post');
const Comments = require('./Comments');

//assigning what models belong to which model and how they relate
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Comments, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
})

Comments.belongsTo(Post, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comments };
