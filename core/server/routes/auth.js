import passport from 'koa-passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import Router from 'koa-router';

import config from 'server/config';
import logger from 'server/lib/logger';
import User from 'server/models/user';


const router = new Router();


passport.serializeUser(function serialize(user, done) {
  done(null, user.get('id'));
});

passport.deserializeUser(function deserialize(id, done) {
  new User({ id })
    .fetch({ require: true })
    .then(user => done(null, user))
    .catch(err => done(err, null));
});

passport.use(new GoogleStrategy(config.auth.google, (accessToken, refreshToken, profile, done) => {
  new User({ googleId: profile.id })
    .fetch({ require: true })
    .catch(User.NotFoundError, function createUser() {
      return new User({
        googleId: profile.id,
        name: profile.displayName,
      })
      .save();
    })
    .then(function authenticateUser(user) {
      logger.info(`Authenticated ${ user.get('name') }`);
      done(null, user);
    });
}));


router.get('/google', passport.authenticate('google', {
  scope: 'profile',
}));


router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/auth/google',
}), ctx => {
  ctx.redirect('/');
});


router.get('/logout', function logout(ctx) {
  logger.info(`Destroying session for ${ ctx.passport.user.get('name') }`);
  ctx.logout();
  ctx.redirect('/');
});


module.exports = router;
