import jwt from 'jsonwebtoken';

/*
 * Sign the token and send it back.
 * Operation provided at the endpoint `../api/authenticate`
 * when a user first signs up.
 * 
 * See module `restRouter.js`.
 */
export const authenticate = (req, res, next) => {
  const token = signToken(req.user.id);
  res.json({ token });
};

/*
 * Verify if username and password are provided (TODO delete this comment later). 
 *
 * 
 * TODO finish to implement functionality
 * 
 * Verify if a user is already registered. 
 * Operation provided at the endpoint `../api/authenticate`
 * when a user first signs up.
 * 
 * See module `restRouter.js`.
 */
export const verifyUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let id;

  // Provide a warning message if the username or password
  // weren't provided.
  if (!username || !password) {
    res.status(400).send('You need both a username and password');
    return;
  }

  // A simple random ID just for development.
  id = Math.floor(Math.random() * 10000);
  req.user = { username, password, id };
  next();
};

export const signToken = id =>
  jwt.sign(
    { id },
    // Simple secret key just for development purposes.
    'mysupersecretkey',
    { expiresIn: '1h' }
  );