import passport from 'passport';
import githubStrategy from './github-strategy';

passport.use(githubStrategy());
passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((user, done) => { done(null, user); });
