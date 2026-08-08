# Data Hub REST API

This is a REST API project built during Sprint 10.

In Sprint 9, the project used temporary data stored in the JavaScript code.

In Sprint 10, I connected the project to MongoDB Atlas using Mongoose so that the data can be stored in a real database.

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Thunder Client
- Git
- GitHub
- dotenv

## What I Built

The API has two main models:

- User
- Post

The User API supports creating, reading, updating and deleting users.

The Post API allows posts to be created and also connects each post with a user.

## Features

- User CRUD operations
- Create and get posts
- MongoDB Atlas database
- Mongoose schemas
- Post and User relationship
- Mongoose `populate()`
- Top 3 recent posts using aggregation
- API testing with Thunder Client