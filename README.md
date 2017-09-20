# InstaApi

RESTful API with Node.js (Express 4) and MongoDB.

## Models
- User
- Post
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
### App (node)
[Build restful api with node](https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4)
[Express Structure](https://www.terlici.com/2014/08/25/best-practices-express-structure.html)
### DB (mongodb)
We will use the sandbox from [mlab](https://mlab.com) to create a mongo-server
