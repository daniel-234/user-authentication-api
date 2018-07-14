# User authentication API

[![Build status](https://ci.appveyor.com/api/projects/status/gheruay34qdkqpe3?svg=true)](https://ci.appveyor.com/project/daniel-234/user-authentication-api)
[![Build Status](https://travis-ci.org/daniel-234/user-authentication-api.svg?branch=master)](https://travis-ci.org/daniel-234/user-authentication-api)

This simple application is a side project to create a user authentication API using Express and JSON Web Tokens. 
We will rebuild [a project](https://github.com/chenkie/user-authentication-api) developed by Ryan Chenkie for a [course](https://frontendmasters.com/courses/secure-auth-jwt/) on JWT on Frontend Masters. 

## Getting Started

TODO

## Built With

- [Express.js](https://expressjs.com/) - A minimalist web framework for Node.js
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

## About the app

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