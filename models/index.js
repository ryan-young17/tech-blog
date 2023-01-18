const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
    foreignKey: 'id'
});

User.hasMany(Comment, {
    foreignKey: 'id'
});

Post.hasMany(Comment, {
    foreignKey: 'id'
});

module.exports = { User, Post, Comment };