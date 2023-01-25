const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const userPosts = await Post.findAll({
        attributes: ['id', 'content', 'title', 'created_at'],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ],
        where: {
          user_id: req.session.userId
        }
      });
  
      const posts = dbPostData.map((post) =>
        post.get({ plain: true })
        );
        
        res.render('dashboard', {
          posts,
          loggedIn: req.session.loggedIn
        });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
          title: req.body.title,
          content: req.body.content,
          user_id: req.session.user_id
        });
        res.status(200).json(newPost);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.put('/', async (req, res) => {
    try {
        const updatedPost = await Post.update({
            title: req.body.title,
            content: req.body.content
        },
            {
                where: {
                    id: req.params.id
                }
            });

        if (!updatedPost) {
            res.status(404).json({ message: 'No post was found with that id' });
            return;
        }
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;