const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
  console.log("inside the post get route  ******")
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
  
      const posts = userPosts.map((post) =>
        post.get({ plain: true })
        );
        console.log("posts: ", posts)
        
        res.render('dashboard', {
          posts
        });
    } catch (err) {
      console.log("err while creating the post : ", err);
      res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
  console.log("inside the post route")
    try {
        const newPost = await Post.create({
          title: req.body.title,
          content: req.body.content,
          user_id: req.session.userId
        });
        console.log("newPost: ", newPost)
        res.status(200).json(newPost);
    } catch (err) {
      console.log("err in post route:", err)
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

router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id
      }
    });
    
    if (!deletedPost) {
      res.json({ message: 'Could not find post to delete.'});
    }
    
    res.status(200).json(deletedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;