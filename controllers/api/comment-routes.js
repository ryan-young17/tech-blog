const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    if(req.session) {
        try {
            const newComment = Comment.create(
                {
                    comment_text: req.body.comment_text,
                    post_id: req.body.post_id,
                    user_id: req.session.userId
                }
            );
            res.status(200).json(newComment);
        } catch (err) {
            res.status(500).json(err);
        }
    }
});

module.exports = router;