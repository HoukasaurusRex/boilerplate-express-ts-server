# The Perfect Express-TS Server

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

### TODO

- [x] Add DB
- [ ] Add validators
- [ ] Add tests with mocha and chai
- [x] Add socket.io
- [x] Write in typescript
- [ ] Add clustering with pm2
- [ ] Logging and debug
