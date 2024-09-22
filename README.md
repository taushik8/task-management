Task Management API
This is a RESTful API for a Task Management application built with Node.js, Express.js, MongoDB, and JWT-based authentication. The API allows users to register, log in, and perform CRUD operations on tasks. Each task is associated with a user, and user authentication is required to access task routes.

Table of Contents
Installation
API Endpoints
Authentication
Tasks
Schemas
Installation
Prerequisites:
Node.js installed
MongoDB connection string
Steps:
Clone the repository.

Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root directory with the following variables:

bash
Copy code
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
Start the server:

bash
Copy code
npm start
API Endpoints
Authentication Endpoints
1. Register a New User
URL: /api/auth/signup
Method: POST
Description: Registers a new user and returns a JWT token.
Request Body:
json
Copy code
{
  "username": "your_username",
  "email": "your_email",
  "password": "your_password"
}
Response:
Success (201):
json
Copy code
{
  "token": "your_jwt_token"
}
Error (400): Invalid input or user already exists.
2. Login a User
URL: /api/auth/login
Method: POST
Description: Authenticates a user and returns a JWT token.
Request Body:
json
Copy code
{
  "email": "your_email",
  "password": "your_password"
}
Response:
Success (200):
json
Copy code
{
  "token": "your_jwt_token"
}
Error (400): Invalid email or password.
Task Endpoints
3. Create a Task
URL: /api/tasks
Method: POST
Description: Creates a new task for the authenticated user.
Headers:
json
Copy code
{
  "Authorization": "Bearer your_jwt_token"
}
Request Body:
json
Copy code
{
  "title": "Task title",
  "description": "Task description",
  "status": "pending", // Optional, default: "pending"
  "dueDate": "YYYY-MM-DD" // Optional
}
Response:
Success (201):
json
Copy code
{
  "task": {
    "_id": "task_id",
    "title": "Task title",
    "description": "Task description",
    "status": "pending",
    "dueDate": "YYYY-MM-DD",
    "user": "user_id"
  }
}
Error (400): Validation error or authentication failure.
4. Get All Tasks
URL: /api/tasks
Method: GET
Description: Retrieves all tasks for the authenticated user.
Headers:
json
Copy code
{
  "Authorization": "Bearer your_jwt_token"
}
Response:
Success (200):
json
Copy code
[
  {
    "_id": "task_id",
    "title": "Task title",
    "description": "Task description",
    "status": "pending",
    "dueDate": "YYYY-MM-DD",
    "user": "user_id"
  }
]
Error (401): Authentication failure.
5. Get a Single Task by ID
URL: /api/tasks/:taskId
Method: GET
Description: Retrieves a single task by its ID.
Headers:
json
Copy code
{
  "Authorization": "Bearer your_jwt_token"
}
URL Params: :taskId (ID of the task)
Response:
Success (200):
json
Copy code
{
  "_id": "task_id",
  "title": "Task title",
  "description": "Task description",
  "status": "pending",
  "dueDate": "YYYY-MM-DD",
  "user": "user_id"
}
Error (404): Task not found or authentication failure.
6. Update a Task
URL: /api/tasks/:taskId
Method: PUT
Description: Updates an existing task.
Headers:
json
Copy code
{
  "Authorization": "Bearer your_jwt_token"
}
URL Params: :taskId (ID of the task)
Request Body:
json
Copy code
{
  "title": "Updated title", // Optional
  "description": "Updated description", // Optional
  "status": "in-progress", // Optional
  "dueDate": "YYYY-MM-DD" // Optional
}
Response:
Success (200):
json
Copy code
{
  "_id": "task_id",
  "title": "Updated title",
  "description": "Updated description",
  "status": "in-progress",
  "dueDate": "YYYY-MM-DD",
  "user": "user_id"
}
Error (400): Validation error or task not found.
7. Delete a Task
URL: /api/tasks/:taskId
Method: DELETE
Description: Deletes an existing task by ID.
Headers:
json
Copy code
{
  "Authorization": "Bearer your_jwt_token"
}
URL Params: :taskId (ID of the task)
Response:
Success (200):
json
Copy code
{
  "message": "Task deleted successfully."
}
Error (404): Task not found or authentication failure.
Schemas
User Schema
javascript
Copy code
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
Task Schema
javascript
Copy code
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'pending' },
  dueDate: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
