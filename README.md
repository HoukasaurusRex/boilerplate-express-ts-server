# The Perfect Express-TS Server

Putting years of knowledge gained from working with Node/Express in production environments to work for the benefit of all humanity.

## Overview

```dir
src/
  config/
    - configuration files
  controllers/
    - routes with provider functions as callback functions
  providers/
    - business logic for controller routes
  services/
    - common business logic used in the provider functions
  models/
    - database models
  app.ts
    - load all of the above
  db.ts
    - load all models
  io.ts
    - load all sockets
  routes.ts
    - load all routes
test/
  unit/
    - unit tests
  integration/
    - integration tests
server.ts
  - load the app.ts file and listen on a port
test.ts
  - main test file that will run all test cases under the test/ directory
```

## Express Server

The extensible and modular REST king. This repo is a highly opinionated guide to working with this relatively unopinionated framework that can be a treasure or trap at every turn (typescript optional).

### App.js

This is the body of every express application. It's removed from the entrypoint at server.js to keep the application definition separated from its invocation. This is the first place where a new project might go wrong, as the app.js file might be a convenient place in the beginning to put "literally everything", it will quickly make a "nobody touch" file thousands of lines long that will increase time to debug. That's why it's good to scope the app.js file to mostly import middlewares and routers from elsewhere and export the configured app.

#### Features

- CORS configuration
- Multipart form parsing
- Basic HTTP security
- GZip compression
- JSend response standards
- REST/OpenAPI API standards
- Error handling

## Socket.io Server

### Sockets

### IO.js

## Sequelize ORM

### Model Definitions

### DB.js

## Mocha/Chai Testing

### Integration vs. Unit Testing

## PM2 Clustering

### Vertical Scaling

### TODO

- [x] Add DB
- [x] Add validators
- [x] Add tests with mocha and chai
- [x] Add socket.io
- [x] Write in typescript
- [x] Add clustering with pm2
- [x] Logging
- [x] Run tests in husky
- [x] Add linting
