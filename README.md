# Data Hub API

A simple RESTful API built using Node.js and Express.

## Features

- Get all users
- Add a new user
- Update a user
- Delete a user
- Mock login endpoint
- Request logging middleware

## Technologies Used

- Node.js
- Express.js

## Installation

```bash
npm install
```

## Run the Project

```bash
npm run dev
```

Server runs on:

```
http://localhost:5000
```

## API Endpoints

### Home

GET /

### Get Users

GET /users

### Add User

POST /users

### Update User

PUT /users/:id

### Delete User

DELETE /users/:id

### Login

POST /login