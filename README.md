# The Perfect Express Server

A Best Practices™️ Express.js template for new projects

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
  routes.js
    - load all routes
  db.js
    - load all models
  app.js
    - load all of the above
test/
  unit/
    - unit tests
  integration/
    - integration tests
server.js
  - load the app.js file and listen on a port
test.js
  - main test file that will run all test cases under the test/ directory
```

### TODO

- [ ] Add DB
- [ ] Add validators
- [ ] Add tests with mocha and chai
- [ ] Add socket.io
- [x] Write in typescript
- [ ] Add clustering with pm2
- [ ] Logging and debug
