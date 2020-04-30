const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {

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

router.get('/:id', (req, res) => {

});

router.post('/logout', (req, res) => {

});

router.post('/login', (req, res) => {

});

router.get('/:id/follow', (req, res) => {

});

router.post('/:id/follow', (req, res) => {

});

router.delete('/:id/follow', (req, res) => {

});

router.delete('/:id/follower', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

module.exports = router;