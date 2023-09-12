# API Documentation

This API allows you to perform CRUD (Create, Read, Update, Delete) operations on user records.

## Endpoints

- [Create a User](#create-a-user)
- [Get a User](#get-a-user)
- [Update a User](#update-a-user)
- [Delete a User](#delete-a-user)

### Create a User

**Endpoint:** `POST /api`

**Description:** Create a new user with a name field.

**Request:**

```json
POST /api
Content-Type: application/json

{
    "name": "John Doe"
}
```

**Response (Success):**

```json
HTTP/1.1 201 Created

{
    "id": "a-unique-id",
    "name": "John Doe"
}
```

**Response (Error):**

- If the request body is missing or `name` is not a string:

  ```json
  HTTP/1.1 400 Bad Request

  {
      "error": "name field is required"
  }
  ```

- If `name` is not a string:

  ```json
  HTTP/1.1 400 Bad Request

  {
      "error": "name field must be a string"
  }
  ```

### Get a User

**Endpoint:** `GET /api/:user_id`

**Description:** Retrieve a user by their unique ID.

**Request:**

```http
GET /api/:user_id
```

**Response (Success):**

```json
HTTP/1.1 200 OK

{
    "id": "a-unique-id",
    "name": "John Doe"
}
```

**Response (Error):**

- If the user with the specified ID is not found:

  ```json
  HTTP/1.1 404 Not Found

  {
      "error": "User with this ID not found"
  }
  ```

### Update a User

**Endpoint:** `PUT /api/:user_id`

**Description:** Update the name of an existing user.

**Request:**

```http
PUT /api/:user_id
Content-Type: application/json

{
    "name": "Updated Name"
}
```

**Response (Success):**

```json
HTTP/1.1 200 OK

{
    "id": "a-unique-id",
    "name": "Updated Name"
}
```

**Response (Error):**

- If the user with the specified ID is not found:

  ```json
  HTTP/1.1 404 Not Found

  {
      "error": "User with this ID not found"
  }
  ```

- If the request body is missing or `name` is not a string:

  ```json
  HTTP/1.1 400 Bad Request

  {
      "error": "name field is required"
  }
  ```

- If `name` is not a string:

  ```json
  HTTP/1.1 400 Bad Request

  {
      "error": "name field must be a string"
  }
  ```

### Delete a User

**Endpoint:** `DELETE /api/:user_id`

**Description:** Delete a user by their unique ID.

**Request:**

```http
DELETE /api/:user_id
```

**Response (Success):**

```json
HTTP/1.1 200 OK

{
    "id": "a-unique-id",
    "name": "Deleted User"
}
```

**Response (Error):**

- If the user with the specified ID is not found:

  ```json
  HTTP/1.1 404 Not Found

  {
      "error": "User with this ID not found"
  }
  ```

## Limitations and Assumptions

- This API assumes that the user's name is a string and is required for creation and updates.
- Error messages are returned as JSON objects in the response body.

## Local Setup and Deployment

1. Clone the repository.
2. Install Node.js and dependencies with `npm install`.
3. Start the server with `npm start`.
4. Access the API at `http://localhost:4000/api`.

