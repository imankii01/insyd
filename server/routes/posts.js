const express = require('express');
const Post = require('../models/Post');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name avatar')
      .populate('likes.user', 'name')
      .populate('comments.user', 'name avatar')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { content } = req.body;

    const post = new Post({
      content,
      author: req.user._id
    });

    await post.save();
    await post.populate('author', 'name avatar');

    req.io.emit('newPost', post);

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const likeIndex = post.likes.findIndex(
      like => like.user.toString() === req.user._id.toString()
    );

    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1);
    } else {
      post.likes.push({ user: req.user._id });

      if (post.author._id.toString() !== req.user._id.toString()) {
        const notification = new Notification({
          recipient: post.author._id,
          actor: req.user._id,
          type: 'like',
          post: post._id,
          message: `${req.user.name} liked your post`
        });

        await notification.save();
        await notification.populate('actor', 'name avatar');

        req.io.to(post.author._id.toString()).emit('newNotification', notification);
      }
    }

    await post.save();
    await post.populate('likes.user', 'name');

    req.io.emit('postUpdated', post);

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/comment', auth, async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id).populate('author', 'name');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = {
      user: req.user._id,
      text
    };

    post.comments.push(newComment);
    await post.save();
    await post.populate('comments.user', 'name avatar');

    if (post.author._id.toString() !== req.user._id.toString()) {
      const notification = new Notification({
        recipient: post.author._id,
        actor: req.user._id,
        type: 'comment',
        post: post._id,
        message: `${req.user.name} commented on your post`
      });

      await notification.save();
      await notification.populate('actor', 'name avatar');


      req.io.to(post.author._id.toString()).emit('newNotification', notification);
    }

    req.io.emit('postUpdated', post);

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;