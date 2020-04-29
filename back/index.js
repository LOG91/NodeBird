const express = require('express');
const dotenv = require('dotenv');
const db = require('./models');
const userApiRouter = require('./routes/user');
const postsApiRouter = require('./routes/posts');
const postApiRouter = require('./routes/post');

dotenv.config();
const app = express();
db.sequelize.sync();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userApiRouter);
app.use('/api/posts', postsApiRouter);
app.use('/api/post', postApiRouter);


// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구

app.listen(3065, () => {
  console.log('server is running on http://localhost:3065');
});