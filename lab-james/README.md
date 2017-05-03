# James Thomas
## Lab 8

### Overview
This lab's purpose is to create an http server using Node's http module and creating our own GET, PUT, POST, and DELETE commands for a simple data resource.

### How to Start and use
To start, type the 'nodemon server.js' command in the terminal when you are in the lab-james directory.

In order to POST:
http POST localhost:3000/api/game title="title" genre="genre"

In order to GET:
http GET localhost:3000/api/game?id="########-####-####-########"

In order to PUT:
http PUT localhost:3000/api/game id="########-####-####-########" title="title" genre="genre"

In order to DELETE:
http DELETE localhost:3000/api/game?id="########-####-####-########"
