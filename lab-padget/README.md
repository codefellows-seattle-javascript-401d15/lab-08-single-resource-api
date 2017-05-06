# Lab 8: Single Resource API

## Description
* For this lab we created an HTTP Server using the http module.
* We made an object constructor that creates a simple resource with properties.
* We created a body parser to parse json in the body of POST and PUT requests.
* We created a url parser that uses node url and querystring modules for the request url.
* We created a router constructor that manages requests to GET, POST, PUT, and DELETE.
* We created a storage module that stores resources by their type and id.
* For more information see: [class 8](https://github.com/codefellows/seattle-javascript-401d15/tree/master/class-08-vanilla-REST-api) and [lab 8](https://github.com/codefellows-seattle-javascript-401d15/lab-08-single-resource-api).

## Version
* 0.2.0

## Installation
Please visit the following pages for how to install your project locally.

* [Cloning A Repository](https://help.github.com/articles/cloning-a-repository/)
* [Fork A Repo](https://help.github.com/articles/fork-a-repo/)
* [Forking](https://guides.github.com/activities/forking/)

In [Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) (Terminal)

### NPM Packages
* [NPM Docs](https://docs.npmjs.com)
* [NPM package.json](https://docs.npmjs.com/files/package.json)

```npm install
npm init
npm install -D debug
npm install -S uuid
npm install -D mocha chai chai-http
```
### Dependencies
The result of installation above.

```npm result
"devDependencies": {
  "chai": "^3.5.0",
  "chai-http": "^3.0.0",
  "debug": "^2.6.4",
  "mocha": "^3.3.0"
},
"dependencies": {
  "uuid": "^3.0.1"
}
```

### Optional Helper

To use `npm run watch`

* Open package.json
* In the "scripts" section, add "watch": "nodemon server.js"

## Running the Tests
In [Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) (Terminal)

```testing
npm run test
DEBUG=http* nodemon server.js

http POST :3000/api/music artist=“Lala” album=”GetReal” song=“MakeBelieve”

http GET :3000/api/music?id=Id-Goes-Here
// http GET :3000/api/music?id=9f5515aa-4061-4d65-82ef-5cc9567a8b83

http PUT :3000/api/music artist=“ForReal” album=”MoreBeta” song=“Nutz” id=Id-Goes-Here

http DELETE :3000/api/music?id=Id-Goes-Here
```

## Resources
* [Promises](https://developers.google.com/web/fundamentals/getting-started/primers/promises)
* [Node HTTP](https://nodejs.org/api/http.html)
* [HTTP Header Fields](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Request_fields)
* [Chai HTTP](https://github.com/chaijs/chai-http)
* [Super Agent](https://visionmedia.github.io/superagent/)
* [Status Dogs](https://httpstatusdogs.com)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/mmpadget/lab-08-single-resource-api/blob/lab-08/lab-padget/LICENSE) file for details

## Acknowledgments
* Code Fellows
* Scott Schmidt, Instructor.
* Judy Vue, Lead Teaching Assistant.
* Thomas Martinez, Teaching Assistant.
