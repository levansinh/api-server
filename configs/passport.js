const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/user.model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
  console.log(user)
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.KEY_CLIENT_ID,
      clientSecret: process.env.KEY_CLIENT_SECRET,
      callbackURL: "/admin/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken)
      console.log(refreshToken)
      if (profile.id) {
        User.findOne({ googleId: profile.id }).then((existingUser) => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            new User({
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.name.familyName + " " + profile.name.givenName,
            })
              .save()
              .then((user) => done(null, user));
          }
        });
      }
    }
  )
);
