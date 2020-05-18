const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../models');
const passport = require('passport');

router.get('/', (req, res) => {
  if (!req.user) {
    return res.status(401).send('로그인이 필요합니다');
  }
  const filteredUser = Object.assign({}, req.user.toJSON());
  delete filteredUser.password
  return res.json(filteredUser);
});

router.post('/', async (req, res, next) => { // 회원가입
  try {
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.userId,
      }
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 ID입니다.');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12); // 10 - 13 수준이 적정 너무 높으면 성능 문제 발생
    const newUser = await db.User.create({
      nickname: req.body.nickname,
      userId: req.body.userId,
      password: hashedPassword,
    });
    // console.log(newUser);
    return res.status(200).json(newUser);
  }
  catch (e) {
    console.error(e);
    //*********** */ 에러 처리를 여기서 ************//
    return next(e); // 에러 처리는 하지 못하고 바로 프론트로 에러를 넘김 최후에 많이 사용됨
  }

});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: parseInt(req.params.id, 10) },
      include: [{
        model: db.Post,
        as: 'Posts',
        attributes: ['id']
      },
      {
        model: db.User,
        as: 'Followings',
        attributes: ['id'],
      },
      {
        model: db.User,
        as: 'Followers',
        attributes: ['id'],
      }
      ],
      attributes: ['id', 'nickname']
    })
    const jsonUser = user.toJSON();
    jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
    jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
    jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
    console.log(jsonUser, 12312312349012);
    res.json(jsonUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('로그아웃 성공');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => { // 각각 서버에러, 유저정보, 로직상에러
    console.log(err, user, info);
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        next(loginErr);
      }
      const fullUser = await db.User.findOne({
        where: { id: user.id },
        include: [{
          model: db.Post,
          as: 'Posts',
        },
        {
          model: db.User,
          as: 'Followings',
        },
        {
          model: db.User,
          as: 'Followers',
        }
        ],
        attributes: ['id', 'nickname', 'userId']
      });
      console.log(fullUser);
      return res.json(fullUser);
    })
  })(req, res, next);
});

router.get('/:id/follow', (req, res) => {

});

router.post('/:id/follow', (req, res) => {

});

router.delete('/:id/follow', (req, res) => {

});

router.delete('/:id/follower', (req, res) => {

});

router.get('/:id/posts', async (req, res, next) => {
  try {
    console.log(req.params.id, 9029340192049120);
    const posts = await db.Post.findAll({
      where: {
        UserId: parseInt(req.params.id, 10),
        RetweetId: null,
      },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname']
      }]
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;