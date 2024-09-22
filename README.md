
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
