## Lab-08: Single-Resource API

## About This Project

* Build an HTTP server using the 'http' Node module
* Create an Object constructor used to produce instances of a resource
* Create a Router constructor to manage GET, POST, PUT and DELETE requests to the server

## Project Dependencies

* uuid
* To install:
  * npm uuid

## Developer Dependencies

* mocha, chai, chai-http, debug
* To install:
  * npm mocha
  * npm chai
  * npm chai-http
  * npm debug

## Making Requests

* Example POST request
  * In terminal write:
  curl -H "Content-Type: application/json" -X POST -d '{"name":"Phil", "type":"big", "killer":"true"}' http://localhost:3000/api/dragon


* Example GET request
  * In terminal write:
  curl -H "Content-Type: application/json" -X GET http://localhost:3000/api/dragon/?= copy id here
