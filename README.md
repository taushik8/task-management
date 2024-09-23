## Key Features
- **User Authentication**: Register and log in users with JWT tokens.
- **Task Management**: Create, read, update, and delete tasks.
- **Middleware Protection**: Secure routes with authentication middleware.
## API Endpoints

### Authentication Endpoints

#### Register User
- **Endpoint**: `POST /api/auth/signup`
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }

#### Login User
- **Endpoint**: `POST /api/auth/signin`
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }


### Task Endpoints

#### Create Task 
- **Endpoint**: `POST /api/tasks`
- **Request Body**:
  ```json
  {
    "title": "string",
    "description": "string", (optional)
    "status":"string",(default:pending)
    "dueDate": "string"(optional)
  }

#### Update Task 
- **Endpoint**: `PUT /api/tasks`
- **Request Body**:
  ```json
  {
    "title": "string", (optional)
    "description": "string", (optional)
    "status":"string", (optional)
    "dueDate": "string" (optional)
  }
#### Get Tasks 
- **Endpoint**: `GET /api/tasks`
#### Delete Tasks 
- **Endpoint**: `DELETE /api/tasks`
