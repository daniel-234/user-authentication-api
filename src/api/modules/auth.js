import jwt from 'jsonwebtoken';
import { User } from '../resources/user/userModel';

export const authenticate = (req, res, next) => {
  const token = createToken(req.user);
  res.json({ token });
};

/*
 * Verify if a user is already registered.
 * Operation provided at the endpoint `../api/authenticate`
 * when a user signs in.
 *
 * See module `restRouter.js`.
 */
export const verifyUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  // Provide a warning message if the username or password
  // weren't provided.
  if (!username || !password) {
    res.status(401).send('You need both a username and password');
    return;
  }

  // Look user up in the database.
  User.findOne({ username })
    .then(function(user) {
      if (!user) {
        res.status(401).send('No user with the given username');
      } else {
        // Call the `authenticate` method from `UserModel`.
        if (!user.authenticate(password)) {
          res.status(401).send('Wrong password');
        } else {
          // User is authenticated. Attach the found user to
          // `req.user` and call `next` so the controller can
          // sign a token from `req.user`.
          req.user = user;
          next();
        }
      }
    })
    .catch(error => next(error));
};

/*
 * Sign a token with claims (assertions) about the entity
 * for which it was issued (user).
 * Do NOT include any sensitive information about that entity.
 */
export const createToken = user => {
  const SECRET = process.env.SECRET_KEY;
  let scope;

  // Set scope to 'admin' if the user object input
  // has its admin property value set to true.
  if (user.admin) {
    scope = 'admin';
  }

  // Sign the JWT.
  return jwt.sign(
    {
      sub: user.id,
      username: user.username,
      scope
    },
    SECRET,
    {
      algorithm: 'HS256',
      expiresIn: '1h'
    }
  );
};
