const passport = require('passport');
const db = require('../models');
const local = require('./local');

module.exports = () => {
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.User.findOne({
        where: { id },
      });
      return done(null, user);
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });
  local();
}

// 프론트에서 서버로 쿠키만 보냄
// 서버가 쿠키파서, 익스프레스세션으로 쿠키값으로 id:3을 발견
// id:3이 deserialize 로직에 들어감
// req.user로 사용자 정보가 들어감

// 서버엥 요청을 보낼때마다 deserializeUser가 실행됨 => 서버 자원 낭비
// => 캐싱을 해줘서 한 번 찾은 유저 정보는 안 찾도록 함