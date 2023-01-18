const router = require('express').Router();
const { Post } = require('../models/');

router.get('/', async (req, res) => {
  try {
    const dbPostData =  await Post.findAll({
      include: [
        {
          model: Comment,
          attribute: 'user_id',
        },
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