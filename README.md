# User authentication API

[![Build status](https://ci.appveyor.com/api/projects/status/gheruay34qdkqpe3?svg=true)](https://ci.appveyor.com/project/daniel-234/user-authentication-api)
[![Build Status](https://travis-ci.com/daniel-234/user-authentication-api.svg?branch=master)](https://travis-ci.com/daniel-234/user-authentication-api)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

This simple application is a side project to create a user authentication API using Express, MongoDB and JSON Web Tokens. 
We will rebuild [a project](https://github.com/chenkie/user-authentication-api) developed by Ryan Chenkie for a [course](https://frontendmasters.com/courses/secure-auth-jwt/) on JWT on Frontend Masters. 

## Getting Started

To run this application locally, you need to have Node.js and MongoDB installed.

#### Installing Node

 If you don't have them, please start by going to the [Node.js](https://nodejs.org/en/) website, download and install it. After that, you can check your node and npm versions by opening a terminal and typing: 
```bash
1 node -v
2 # => v10.13.0
3
4 npm -v
5 # => v6.4.1
```
This project has been built using Node version 10 and npm version 6. If you have earlier versions and something doesn't work, you should check about compatibility issues. 

#### Installing MongoDB

If you don't have MongoDB installed in your machine, please go to the [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) website and follow the instructions to download it. You should be able to use the Community Edition.
Again, you can check its version by typing the following instruction in the terminal:
```bash
1 mongod --version
2 # => db version v3.4.10
```
#### Installing the application

To install this application you can (fork and) download it and then run the command `npm install` from your terminal. That will install all the needed dependencies.

#### Running the application 

The first thing you need to do is making sure that MongoDB is running in your machine. 
Type in your terminal: 
```bash
mongod
```
Then run the app in development mode using hot module replacement by typing `npm run dev` from the command line. The app will be served at `localhost:3001`. 

To work with the api, navigate to the available routes from there (i.e. `localhost:3001/api/user` to get all users). See below for all available routes. 

## Available routes

POST `/api/user`
- Used for signing up a user. Accepts `username` and `password` to create a user. Returns a JWT.

POST `/api/user/authenticate`
- Used for logging in a user. Accepts `username` and `password` to authenticate a user. Returns a JWT.

POST `/api/instructor`
- Used for saving a new instructor in the database. Requires a valid JWT with an 'admin' scope.

GET `api/instructor`
- Used to get all instructors

## Built With

- [Node.js](https://nodejs.org/en/) - A JavaScript runtime
- [Express.js](https://expressjs.com/) - A minimalist web framework for Node.js
- [MongoDB](https://www.mongodb.com/) - A document-oriented database program
- [Mongoose](https://mongoosejs.com/) - An elegant mongodb object modeling for node.js
- [Jest](https://jestjs.io/en/) - A JavaScript testing library

## Author

- **Daniele Erbì** - [daniel-234](https://github.com/daniel-234)

## Notes

### About this API project

This API has been built based on these repositories: [User Authentication API](https://github.com/chenkie/user-authentication-api), [REST and GraphQL API Design in Node v2](https://github.com/FrontendMasters/api-design-node-v2) and [Testing Workshop](https://github.com/kentcdodds/testing-workshop).
The full courses based on these repositories can be found on Frontend Masters.

### Backend Apps with Webpack

Webpack, even in this basic configuration, showed this warning message when run.
```
WARNING in ./node_modules/express/lib/view.js 81:13-25
Critical dependency: the request of a dependency is an expression
@ ./node_modules/express/lib/application.js
@ ./node_modules/express/lib/express.js
@ ./node_modules/express/index.js
@ ./src/server.js
@ ./src/index.js
```
The solution suggested by [this](https://github.com/webpack/webpack/issues/196) issue was to use the package `webpack-node-externals` to avoid bundling `node-modules`. 
It's inspired by [this article](https://jlongster.com/Backend-Apps-with-Webpack--Part-I).

### Server not updating its responses  

As you modify this app, Webpack makes new builds that it saves in the `dist` folder. 

If at any time when you query the API its responses seem to be outdated, giving back to you data that differ from what you expected, it could be helpful to delete the `dist` folder and to stop and restart the application. 
It's possible that the build process didn't update correctly the output file, after many rebuild processes. 

### Issues with CORS when developing locally

If you are developing locally and trying to access the API using Chrome, you'd probably encounter problems with CORS. See [this Stackoverflow question](https://stackoverflow.com/questions/10883211/deadly-cors-when-http-localhost-is-the-origin).
To solve the problem, you can add some temporary code to [set the response header on Express.js assets](https://stackoverflow.com/questions/23751914/how-can-i-set-response-header-on-express-js-assets): 

```javascript
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
  next();
});
```
Add the temporary code (while developing and debugging) to `server.js` at line 16 and you should be able to make it work. 

### Configuration and environment files 

This application relies on some environment variables. 
You can find an '.env.example' file in this repository, with variables that match the ones required by this application in order for it to run.
Please, create your own '.env' file with your own variables.

## Continuous Integration

This application uses two services for Continuous Integration:

 - [Travis](https://travis-ci.com/daniel-234/user-authentication-api)
 - [AppVeyor](https://ci.appveyor.com/project/daniel-234/user-authentication-api)

## License

This project is intended for learning purposes only. Much of it will reproduce code found in the repositories listed in [Notes](#notes), so if you intend to use it, please refer to their original licenses and give appropriate credit to the respective authors.

## Acknowledgments

- [Twilio Blog - Working with Environment Variables in Node.js](https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html)
- [How to test Express.js with Jest and SuperTest](http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/)
- [Backend apps with Webpack](https://jlongster.com/Backend-Apps-with-Webpack--Part-I)
- [Adrian Meja - Creating RESTful APIs with NodeJS and MongoDB](https://adrianmejia.com/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/)
 - [Jest issues - Jest not exiting on successful completion of test suite](https://github.com/facebook/jest/issues/3602) 
 - [Stackoverflow - How to query from within Mongoose 'pre-' hook in a Node.js / Express.js app](https://stackoverflow.com/questions/19281680/how-to-query-from-within-mongoose-pre-hook-in-a-node-js-express-app)
 - [Stackoverflow - Mongoose query callback return](https://stackoverflow.com/questions/39361760/mongoose-query-callback-return)

   #### Node API authorization
- [Egghead.io - JSON Web Token (JWT) - Authentication with Node.js and Auth0](https://egghead.io/courses/json-web-token-jwt-authentication-with-node-js-and-auth0)
- [Auth0 docs - Node(Express) API](https://auth0.com/docs/quickstart/backend/nodejs)

   #### Environment variables and 'dotenv'
- [How do I use 'dotenv' with import?](https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import)
- [Import a module for its side effects only](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Import_a_module_for_its_side_effects_only)