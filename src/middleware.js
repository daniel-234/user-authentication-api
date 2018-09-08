import bodyParser from 'body-parser';

const setGlobalMiddleware = app => {
  /*
   * This middleware is going to format the query string for us.
   * If you pass in the query string to your API like this: 
   * `.../api/user?thing-1,other-2`, it will format that so we 
   * can access it on `request.params`. 
   */
  app.use(bodyParser.urlencoded({ extended: false }));
  /*
   * This parser says that basically anything that's posted
   * or put to the API gets treated like JSON, parsed and 
   * given to us at `req.body`. 
   * This is where `req.body` comes from. Without this, we 
   * don't have `req.body`. 
   */
  app.use(bodyParser.json());
};

export default setGlobalMiddleware;
