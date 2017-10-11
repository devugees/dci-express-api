# InstaApi

RESTful API with Node.js (Express 4) and MongoDB.

## Models
- User
- Category
- Comment
- Picture

### Expected Behavior
Routes for each model, replace `$MODEL` with model name

| Route                | HTTP Verb | Description                  |
|:---------------------|:----------|:-----------------------------|
| /api/$MODEL          | GET       | Get all the $MODEL.          |
| /api/$MODEL          | POST      | Create a $MODEL.             |
| /api/$MODEL/:item_id | GET       | Get a single item.           |
| /api/$MODEL/:item_id | DELETE    | Delete a item.               |
| *Bonus*              |           |                              |
| /api/$MODEL/:item_id | PUT       | Update a item with new info. |

## Guide

### Setting your development environment
#### Clone the repo on your machine
`git clone https://github.com/devugees/dci-express-api.git`

Navigate to your project folder `cd dci-express-api`.

Install all the dependences `npm install`.

make sure to create your `.env` file in the root of your project folder.
#### .env model
You all should use this model in your `.env` file.
```
NODE_ENV=development
DATABASE=mongodb://<user>:<pass>@...
TEST_DATABASE=mongodb://<user>:<pass>@...
PORT=8080
CLIENT_ID=XXXXX
CLIENT_SECRET=XXXXX
UPLOADSFOLDER=./uploads/
```
The `CLIENT_ID` and `CLIENT_SECRET` are required by GitHub in order to authenticate the user via PassportJS.

Both keys were shared by Tommy in the WhatsApp's group.

Run the server `nodemon app.js`
#### Testing
Run all the tests using `npm test`




### App (node)
[Build restful api with node](https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4)
[Express Structure](https://www.terlici.com/2014/08/25/best-practices-express-structure.html)
### DB (mongodb)
We will use the sandbox from [mlab](https://mlab.com) to create a mongo-server


## Helpers file usage

The idea of the `helpers.js` file is to have all our helpers modules in one place.

In order to use a helper module you should **explicitly** require it. You can use explicit require to selectively load only the pieces you need:
```javascript
const { siteName } = require('./helpers')
console.log(siteName) // log: 'InstaAPI'
```
You could require as many modules as you want:
```javascript
const { siteName, catchErrors } = require('./helpers')
```
You are free to add whatever you think it might be useful to the project.

#### isLoggedIn()
There is a method called `isLoggedIn()` in our `helper.js`. It's a simple **route** middleware to ensure that the user is authenticated.
You should use this middleware on any resource that needs to be protected.

If the request is authenticated *(the user is logged in)* the request will proceed. Otherwise, the user will be redirected to the login page.

Example: As authenticated user I can remove an image or add a comment only if I am logged in.
```javascript
// myRoutes.js

const { isLoggedIn, catchErrors } = require('./helpers')

module.exports = (app) => {
  app.route('/api/...')
     .delete(isLoggedIn, catchErrors(imgController.removeImage))

  app.route('/api/...')
     .post(isLoggedIn, catchErrors(commentController.addComment))
}
```
