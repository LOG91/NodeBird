const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/', async (req, res, next) => { // POST /api/post
  try {
    const hashTags = req.body.content.match(/#[^\s]+/g);
    const newPost = await db.Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    if (hasTags) {
      const result = await Promise.all(hashTags.map(tag => db.Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() },
      })));
      console.log(result);
      await newPost.addHashTags(result.map(r => r[0]));
    }
    // const User = await netPost.getUser(); 아래의 방식을 이 방식으로 해도 가능하다
    // newPost.User = User;
    const fullPost = await db.Post.findOne({
      where: {
        where: { id: newPost.id },
        include: [{
          model: db.User
        }]
      }
    })
    res.json(fullPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/images', (req, res) => {

});

module.exports = router;