# User authentication API

[![Build status](https://ci.appveyor.com/api/projects/status/gheruay34qdkqpe3?svg=true)](https://ci.appveyor.com/project/daniel-234/user-authentication-api)
[![Build Status](https://travis-ci.org/daniel-234/user-authentication-api.svg?branch=master)](https://travis-ci.org/daniel-234/user-authentication-api)

This simple application is a side project to create a user authentication API using Express, MongoDB and JSON Web Tokens. 
We will rebuild [a project](https://github.com/chenkie/user-authentication-api) developed by Ryan Chenkie for a [course](https://frontendmasters.com/courses/secure-auth-jwt/) on JWT on Frontend Masters. 

## Getting Started

To run this application locally, you need to have Node.js and MongoDB installed.

#### Installing Node

 If you don't have them, please start by going to the [Node.js](https://nodejs.org/en/) website, download and install it. After that, you can check your node and npm versions by opening a terminal and typing: 
```bash
1 node -v
2 # => v8.11.2
3
4 npm -v
5 # => v6.4.1
```
This project has been built using Node version 8 and npm version 6. If you have earlier versions and something doesn't work, you should check about compatibilities issues. 

#### Installing MongoDB

If you don't have MongoDB installed in your machine, please go to the [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) website and follow the instructions to download it. You should be able to use the Community Edition.
Again, you can check its version by typing the following instruction in the terminal:
```bash
1 mongod --version
2 # => db version v3.4.10
```
#### Installing the application

To install this application you can (fork and) download it and then run the command `npm install` from your terminal. That will install all the needed dependencies.

#### Run the application 

The first thing you need to do is making sure that MongoDB is running in your machine. 
Type in your terminal: 
```bash
mongod
```
Then run the app in development mode using hot module reloading by typing `npm run dev` from the command line. The app will be served at `localhost:3001`. 

## Available routes

POST `/api/user`
- Used to insert a user

POST `/api/instructor`
- Used to insert an instructor

GET `api/user`
- Used to get all users

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

### Server (not responding) issues  

As you modify this app, every time Webpack makes a new build, it saves it in the `dist` folder. If at any time you experience server issues and it seems it has somehow cached values that should be gone, it could be helpful to delete the `dist` folder and rebuild the application. 

### Continuous Integration

This application uses two services for Continuous Integration:

 - [Travis](https://travis-ci.org/daniel-234/user-authentication-api)
 - [AppVeyor](https://ci.appveyor.com/project/daniel-234/user-authentication-api)

## License

This project is intended for learning purposes only. Much of it will reproduce code found in the repositories listed in [Notes](#notes), so if you intend to use it, please refer to their original licenses and give appropriate credit to the respective authors.

## Acknowledgments

- [Twilio Blog - Working with Environment Variables in Node.js](https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html)
- [How to test Express.js with Jest and SuperTest](http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/)
- [Backend apps with Webpack](https://jlongster.com/Backend-Apps-with-Webpack--Part-I)
- [Adrian Meja - Creating RESTful APIs with NodeJS and MongoDB](https://adrianmejia.com/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/)