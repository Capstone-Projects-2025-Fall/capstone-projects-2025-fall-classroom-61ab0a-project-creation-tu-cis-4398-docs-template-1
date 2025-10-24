# Design Document: Basic API Initialization

**Description:** This document provides the complete design of a basic Express.js API, including class/module purposes, data fields, methods, pre/post conditions, parameters, and exceptions.

---

## Overview

This software initializes a simple RESTful API using **Express.js**. It sets up middleware for JSON parsing, defines test endpoints for GET and POST requests, and runs a local server on port **8080**.

### Purpose

* Demonstrate API initialization using Express.js.
* Provide sample endpoints for testing GET and POST methods.
* Serve as a foundation for expanding into a full REST API.

---

## Modules and Fields

| Field     | Type   | Purpose                                                                            |
| --------- | ------ | ---------------------------------------------------------------------------------- |
| `express` | Module | Imports the Express framework for creating and managing the web server.            |
| `app`     | Object | Represents the Express application instance; used to define middleware and routes. |
| `PORT`    | Number | Port number on which the API server listens (set to `8080`).                       |

---

## Middleware

### **JSON Parser**

```js
app.use(express.json());
```

**Purpose:** Enables parsing of incoming JSON request bodies, making them available via `req.body`.

**Pre-condition:** Requests must contain valid JSON.

**Post-condition:** JSON data is accessible to subsequent route handlers.

**Exceptions:** If JSON is malformed, Express automatically returns `400 Bad Request`.

---

## Server Initialization

```js
app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));
```

**Purpose:** Starts the Express.js server on the defined port and logs a confirmation message.

**Parameters:**

* `PORT` *(Number)* — Server port.
* Callback — Logs confirmation to console.

**Pre-condition:** No conflicting process occupies the port.

**Post-condition:** API becomes accessible at `http://localhost:8080`.

**Return Value:** None.

**Exceptions:** If the port is already in use, the system throws `EADDRINUSE`.

---

## Routes and Methods

### **GET /test**

```js
app.get('/test', (req, res) => {
    res.status(200).send({
        name: 'Test1',
        status: 'test'
    });
});
```

**Purpose:** Confirms API availability.

**Method:** GET
**Endpoint:** `/test`

**Pre-condition:** Server must be running.

**Post-condition:** Client receives success response.

**Response:**

```json
{
  "name": "Test1",
  "status": "test"
}
```

**Exceptions:** None expected.

---

### **POST /test/:id**

```js
app.post('/test/:id', (req, res) => {
    const { id } = req.params;
    const { info } = req.body;

    if (!info) {
        res.status(418).send({ message: 'No info!' });
    }

    res.send({
        name: `Test message with info: ${info} and ID: ${id}`,
    });
});
```

**Purpose:** Handles POST requests by echoing provided parameters.

**Method:** POST
**Endpoint:** `/test/:id`

**Parameters:**

* `id` *(String)* — Extracted from URL.
* `info` *(String)* — Sent in request body.
* `req` *(Request Object)* — HTTP request object.
* `res` *(Response Object)* — HTTP response object.

**Pre-condition:**

* Request body must include valid JSON.
* Must contain field `info`.

**Post-condition:**

* Responds with JSON confirmation if `info` is provided.
* Sends error message if missing.

**Success Response:**

```json
{
  "name": "Test message with info: <info> and ID: <id>"
}
```

**Error Response:**

```json
{
  "message": "No info!"
}
```

**Exceptions:**

* **418 (I'm a teapot):** Missing `info` field.
* **400 (Bad Request):** Malformed JSON.

---

## Error Handling

* Express automatically handles JSON parsing errors.
* Custom responses provide user-friendly messages.
* Future improvement: Add centralized error-handling middleware.

---

## Summary Table

| Method | Endpoint    | Description          | Success Response                                          | Error Response                  |
| ------ | ----------- | -------------------- | --------------------------------------------------------- | ------------------------------- |
| GET    | `/test`     | Verifies API status  | `{ name: "Test1", status: "test" }`                       | N/A                             |
| POST   | `/test/:id` | Echoes provided data | `{ name: "Test message with info: <info> and ID: <id>" }` | `{ message: "No info!" }` (418) |

---

## Notes

* Followed instructions from: [https://www.youtube.com/watch?v=-MTSQjw5DrM](https://www.youtube.com/watch?v=-MTSQjw5DrM)
* Ensure `app.listen()` remains in the code; removing it will prevent the API from running.
* Run using:

  ```bash
  node .
  ```
* Verify at: [http://localhost:8080](http://localhost:8080)

---

**End of Document**
