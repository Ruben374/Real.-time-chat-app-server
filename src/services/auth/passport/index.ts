const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../../models/Users.model");
module.exports = (passport: any) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        callbackURL: process.env.CALLBACKURL,
      },
      async function (
        accessToken: any,
        refreshToken: any,
        profile: any,
        done: any
      ) {
        try {
          console.log(profile)
          let user = await User.findOne({ email: profile.emails[0].value });
          if (user) {
            done(null, user);
          } else {
            const newUser = new User({
              name: profile.displayName,
              avatar: profile.photos[0].value,
              email: profile.emails[0].value,
            });
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error: any) {
          console.log(error.message);
        }
      }
    )
  );
  passport.serializeUser(function (user: any, done: any) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id: any, done: any) {
    User.findById(id, function (err: any, user: any) {
      done(err, user);
    });
  });
};
