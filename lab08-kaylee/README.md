## Lab-08: Single-Resource API

## About This Project

* Build an HTTP server using the 'http' Node module.
* Create an Object constructor used to produce instances of a resource.
* Create a Router constructor to manage GET, POST, PUT and DELETE requests to the server.

## Project Dependencies

* chai, chai-http, debug and uuid
* To install:
  * npm chai
  * npm chai-http
  * npm debug
  * npm uuid

## Developer Dependencies

* mocha
* To install:
  * npm mocha

## Making Requests

* Example GET request
  * In terminal (assuming httPie installed): http get :3000/api/note name="todo" date=74
  * Expected output:

* Example POST request
  * In terminal (assuming httPie installed): http post :3000/api/note name="todo" date=75
  * Expected output:

* Example PUT request
  * In terminal (assuming httPie installed): http post :3000/api/note name="todo" date=75
  * Expected output:

* Example DELETE request
  * In terminal (assuming httPie installed): http post :3000/api/note name="todo" date=75
  * Expected output:

## Biggest Roadblocks

* Testing!!! I am still having a really hard time wrapping my head around testing, particularly when to use .send(), when to supply .send() with an argument (i.e. an empty object {}, or an object with info {name: 'Kaylee', date='April 28, 2017'}, or nothing at all), and when/when not to use .before().
