import { generateControllers } from '../../modules/query';
import { User } from './userModel';
import { createToken } from '../../modules/auth';

/*
 * Save a document to the database.
 * Allow data manipulation before actually saving. After the
 * document has been saved, return a Promise.
 */
function createUser(req) {
  let user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  user.admin = req.body.admin || false;
  return User.create(user);
}

/*
 * Function that returns another function definition to be called
 * from the appropriate router (closure in action).
 */
const createOne = () => (req, res, next) => {
  return createUser(req)
    .then(user => res.status(201).json({ token: createToken(user) }))
    .catch(error => {
      next(error);
    });
};

/*
 * Call `generateControllers` from the `query.js` utility, overriding
 * the `createOne` method.
 */
export default generateControllers(User, { createOne: createOne() });
