const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
    foreignKey: ''
});

User.hasMany(Comment, {
    foreignKey: ''
});

Post.hasMany(Comment, {
    foreignKey: ''
});