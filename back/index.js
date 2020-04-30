const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const db = require('./models');
const userApiRouter = require('./routes/user');
const postsApiRouter = require('./routes/posts');
const postApiRouter = require('./routes/post');

dotenv.config();
const app = express();
db.sequelize.sync();

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true, // js로 쿠키에 접근하지 못 하도록 막는다, 보안을 위함
    secure: false, // https사용할 때 true로 변경
  }

}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userApiRouter);
app.use('/api/posts', postsApiRouter);
app.use('/api/post', postApiRouter);


// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구

app.listen(3065, () => {
  console.log('server is running on http://localhost:3065');
});