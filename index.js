require('dotenv').config();
const express = require('express');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// ✅ Define secured BEFORE exporting it
function secured(req, res, next) {
  if (req.user) {
    return next();
  }
  res.redirect('/login');
}

// ✅ Export AFTER definition
module.exports.secured = secured;

// ✅ Now import routes AFTER export
const booksRouter = require('./routes/books');

// ✅ Auth0 Strategy
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  }
);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// ✅ View engine
app.set('view engine', 'ejs');

// ✅ Body parsing
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ REQUIRED: Session + Passport middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ✅ Auth routes
app.get('/login', passport.authenticate('auth0', {
  scope: 'openid email profile'
}));

app.get('/callback', passport.authenticate('auth0', {
  failureRedirect: '/failure'
}), (req, res) => {
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// ✅ Middleware to make user available in templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// ✅ Protected profile route

app.get('/profile', secured, (req, res) => {
  res.send(req.user);
});

// ✅ Mount books router AFTER passport middleware
app.use('/', booksRouter);

// ✅ MongoDB connection
mongoose.connect('mongodb://localhost:27017/booksInventory')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// ✅ Start server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

