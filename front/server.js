const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();
dotenv.config();

app.prepare().then(() => {
  const server = express();

  server.use(morgan('dev'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser(process.env.COOKIE_SECRET));
  server.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: '',
    cookie: {
      httpOnly: true,
      secure: false, // https 일 때는 true
    },
  }));

  server.get('/hashtag/:tag', (req, res) => {
    return app.render(req, res, '/hashtag', { tag: req.params.tag });
  })

  server.get('/user/:id', (req, res) => {
    return app.render(req, res, '/user', { id: req.params.id });
  })

  server.get('*', (req, res) => {
    return handle(req, res);
  })

  server.listen(3060, () => {
    console.log('express+next running on port 3060 :)');
  })
})