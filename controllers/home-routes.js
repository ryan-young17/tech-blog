const router = require('express').Router();
const { Post, User, Comment } = require('../models/');

router.get('/', async (req, res) => {
  try {
    const dbPostData =  await Post.findAll({
      attributes: [
        'id',
        'title',
        'content',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
      );
      
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const userPost = await Post.findOne({
      attributes: ['id', 'content', 'title', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          // include: {
          //   model: User,
          //   attributes: ['username']
          // }
        },
        // {
        //   model: User,
        //   attributes: ['username']
        // }
      ],
      where: {
        id: req.params.id
      }
    });

    const post = userPost.get({ plain: true });
    console.log(post);
    res.render('one-post', {
      ...post, loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;