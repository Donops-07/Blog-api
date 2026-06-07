# Blog API

A RESTful API built with Node.js and Express that powers a blogging platform, featuring secure user authentication, strict input validation, and content management.

## Tech Stack: 
- Node.js
- Express
- MongoDB
- Joi
- JWT
- Mongoose
- bcrypt

## Features: 
- Full CRUD operations.
- Password hashing using bcrypt.
- JWT for authentication.
- Strict input validation using Joi.
- Offset-based pagination for post retrieval.
- Ability to search for posts using keywords.
  
## Prerequisites:
- Node.js v18+
- A local or cloud instance of MongoDB

## Installation and Setup
  ```bash
  git clone [https://github.com/Donops-07/Blog-api.git](https://github.com/Donops-07/Blog-api.git)
  cd blog_api
  npm install
  cp .env.example .env
  npm run dev
```

## Environment variables:
- PORT
- MONGO_URL
- JWT_SECRETS
  
## Api Reference

| HTTP Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/user/sign-up` | Registers a new user | No |
| `POST` | `/api/user/log-in` | Authenticates user and return JWT | No |
| `GET` | `/api/article` | Retrives all paginated posts | Yes |
| `POST` | `/api/article` | Creates a new post | Yes |
| `GET` | `/api/search` | Searches for posts based on keyword | Yes |
| `GET` | `/api/article/:id` | Retrieves one post/article based on the inputted ID | Yes |               
| `PUT` | `/api/article/:id` | Updates a created post | Yes |
| `DELETE` | `/api/article/:id` | Deletes a post based on ID provided | Yes |
