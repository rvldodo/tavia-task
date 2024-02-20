import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { loginPassport, signupPassport } from "../utils/passport.utils.js";

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, next) => {
      return await signupPassport(req?.body, next);
    },
  ),
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, next) => {
      return await loginPassport(req?.body, next);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
