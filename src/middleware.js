/*
 * Import bodyParser, a middleware library that creates a new
 * `body` object on the `request` object after the middleware.
 * In other words, it creates `req.body` object, that we can now
 * read and use to analyze a user request.
 */

import bodyParser from 'body-parser';

const setGlobalMiddleware = app => {
  /*
   * Return middleware that parses `urlencoded` bodies.
   * 
   * This middleware is going to format the query string for us.
   * If you pass in the query string to your API like this: 
   * `.../api/user?thing-1,other-2`, it will format that so we 
   * can access it on `request.params`. 
   */
  app.use(bodyParser.urlencoded({ extended: false }));
  /*
   * Return middleware that only pareses JSON. 
   * 
   * This parser says that basically anything that's posted
   * or put to the API gets treated like JSON, parsed and 
   * given to us at `req.body`. 
   * This is where `req.body` comes from. Without this, we 
   * don't have `req.body`. 
   */
  app.use(bodyParser.json());
};

export default setGlobalMiddleware;
