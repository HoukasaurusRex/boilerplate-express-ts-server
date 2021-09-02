[![Contributors][contributors-shield]][contributors-url]
[![Language grade: JavaScript][lgtm-shield]][lgtm-url]
[![FOSSA Status][fossa-shield]][fossa-url]
[![David Dependencies Status][dependencies-shield]][dependencies-url]
[![License: MIT][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![Twitter: HoukasaurusRex][twitter-shield]][twitter-url]

# The Perfect Express-TS Server

Putting years of knowledge gained from working with Node/Express in production environments to work for the benefit of all humanity.

This application template is designed to be extensible, scalable, and highly opinionated.
It should be simple to add and remove functionalities based on your use case.

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
  migrations/
    - migration files to alter database schemas
  models/
    - database models
  app.ts
    - load all of the above
  db.ts
    - load all models
  io.ts
    - load all sockets
  migrations.ts
    - loads migrations/ and runs each one in sequence
  routes.ts
    - load all routes
  server.ts
    - load the app.ts file and listen on a port
test/
  unit/
    - unit tests
  integration/
    - integration tests
```

## Features

- CORS configuration
- Multipart form parsing
- Basic HTTP security
- GZip compression
- JSend response standards
- REST/OpenAPI API standards
- Error handling
- PM2 clustering
- Password hashing with bcrypt
- SQL Migrations with Umzug

## Express Server

The extensible and modular REST king of node frameworks. This repo is a highly opinionated guide
to working with this relatively unopinionated framework that can be a treasure or trap at every turn.

### App.js

This is the body of every express application.
It's removed from the entrypoint at server.js to keep the application definition separated from its invocation.
This is the first place where a new project might go wrong, as the app.js file might be a convenient place in the beginning to put **literally everything**,
it will quickly make a *don't touch* file thousands of lines long that will increase time to debug.
That's why it's good to scope the app.js file to mostly import middlewares and routers from elsewhere and export the configured app.

## Socket.io Server

Socket.io is the most recognizable websockets framework for node (and beyond),
and despite its quirks from being one of the longest living frameworks,
is still a powerful and extensible ally in removing a lot of the complexity with creating real-time applications.

### IO.js

In the same way app.js is the instance of an Express application to be imported and run from server.js,
io.js is an instance of the socket.io server that imports events from sockets.js.

### Sockets

All socket events are defined in src/controllers/sockets.js and use the providers in the src/providers folder just like the express routes.
This can be extracted if the project scales and served from different folders, but this will suffice for most use cases.

## Sequelize ORM

It's important to work with SQL databases through an ORM.
It will help avoid messy mistakes with malicious user inputs and abstract advanced DB connections and querying.
Sequelize in particular is long-standing with tons of support, battle testing, and compatibility with a wide variety of relational databases.

### DB.js

This is the entrypoint to the Sequelize database connection instance.
It should just load your models and export the database instance.

### Model Definitions

Models are defined in src/models in an OOP-style class structure.
This plays nicely with intellisense and typescript, but is also a good way to work with models in general as they generally fit the OOP method.
This is where you should add any hooks, relations, or prototypes to your models.

## Mocha/Chai Testing

Mocha matches Express in extensibility, and can be tough to get started from scratch.
A good testing strategy is to test each API with a pass/fail scenario with sensible labels to prevent major regressions.

### Integration vs. Unit Testing

Integration tests include API testing (implicitly testing route, controller, provider, and model) for Express applications and socket events for Socket.IO.

Unit testing can be services and utility functions that are limited to a simple input/output functional design.

## PM2 Clustering

Clustering in node can be powerful, but be wary of your use case and the extra complexities of adding verticle scaling to your application.
If you need to use stateful sticky websocket sessions and have sensible horizontal scaling, process clustering may not be worth the extra work.
Otherwise it can be a quick way to squeeze out additional performance to your application.

### PM2 keymetrics keys

For pm2 keymetrics monitoring on AWS instances, provide the following env vars
https://pm2.keymetrics.io/docs/tutorials/use-pm2-with-aws-elastic-beanstalk/#integrate-pm2-with-keymetrics

KEYMETRICS_PUBLIC = XXXXX
KEYMETRICS_SECRET = XXXXX

### Vertical Scaling

Vertical scaling is not for every production environment, for example using T2 micro instances in AWS are limited to 1 vCPU and would not benefit,
however many environments including T2 medium and above instances or even Heroku are capable of dishing out multiple cores for you to take advantage of.
If an application uses a mixture of horizontal and vertical scaling, it can scale exponentially as opposed to linearly.

## Contributing

If there are any concepts that should be explained in greater detail or if you have any suggestions,
contributions are welcome!

[contributors-shield]: https://img.shields.io/github/contributors/HoukasaurusRex/boilerplate-express-ts-server.svg?style=flat-square
[contributors-url]: https://github.com/HoukasaurusRex/boilerplate-express-ts-server/graphs/contributors
[hitcount-shield]: https://hits.dwyl.com/HoukasaurusRex/jthoukspace.svg
[hitcount-url]: https://hits.dwyl.com/HoukasaurusRex/jthoukspace
[dependencies-shield]: https://david-dm.org/HoukasaurusRex/boilerplate-express-ts-server.svg
[dependencies-url]: https://david-dm.org/HoukasaurusRex/boilerplate-express-ts-server
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/jt-houk/
[product-screenshot]: https://source.unsplash.com/600x300/?nature,water
[product-url]: https://boilerplate-express-ts-server
[lgtm-shield]: https://img.shields.io/lgtm/grade/javascript/g/HoukasaurusRex/boilerplate-express-ts-server.svg?logo=lgtm&logoWidth=18&style=flat-square
[lgtm-url]: https://lgtm.com/projects/g/HoukasaurusRex/boilerplate-express-ts-server/context:javascript
[fossa-shield]: https://app.fossa.com/api/projects/git%2Bgithub.com%2FHoukasaurusRex%2Fboilerplate-express-ts-server.svg?type=shield&style=flat-square
[fossa-url]: https://app.fossa.com/projects/git%2Bgithub.com%2FHoukasaurusRex%2Fboilerplate-express-ts-server?ref=badge_shield
[fossa-scan]: https://app.fossa.com/api/projects/git%2Bgithub.com%2FHoukasaurusRex%2Fboilerplate-express-ts-server.svg?type=large
[license-shield]: https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square
[license-url]: ./LICENSE
[twitter-shield]: https://img.shields.io/twitter/follow/HoukasaurusRex.svg?style=social
[twitter-url]: https://twitter.com/HoukasaurusRex
[issues-url]: https://github.com/HoukasaurusRex/boilerplate-express-ts-server/issues