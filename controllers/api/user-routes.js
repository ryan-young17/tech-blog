const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET route for /dashboard
router.get('/dashboard', async (req, res) => {
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

router.post('/newpost', (req, res) => {
  res.render('new_post', {loggedIn: req.session.loggedIn});
});

// try {
//   const newPost = await Post.create({
//     title: req.body.title,
//     content: req.body.content,
//     user_id: req.session.user_id
//   });
//   res.status(200).json(newPost);
// } catch (err) {
//   res.status(500).json(err);
// }

router.put('/dashboard', async (req, res) => {
  try {
    const updatedPost =  await Post.update({
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

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;