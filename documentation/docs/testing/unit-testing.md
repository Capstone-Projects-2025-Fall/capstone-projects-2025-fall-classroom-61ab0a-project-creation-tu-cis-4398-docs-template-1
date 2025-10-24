---
sidebar_position: 4
---

# Unit Testing

This document describes the unit testing procedures for the Initial_API portion of the project. It covers the testing library used, execution of tests, test cases, and the link to the test coverage report.

---

## Purpose

Unit tests verify that individual components of the API work correctly in isolation. Each method is tested for expected behavior given specific input values. This ensures reliability and facilitates early detection of errors.

---

## Library Explanation

We are using **Jest** along with **Supertest** for unit testing.

### Jest
- **Primary Testing Framework**
- Features:
  - Built-in assertions
  - Test running and reporting
  - Code coverage generation
  - Mocking capabilities
- Chosen because:
  - Easy integration with Node.js and Express
  - Supports both simple and complex unit tests
  - Generates HTML coverage reports

### Supertest
- **HTTP Testing Utility**
- Features:
  - Allows sending HTTP requests to an Express server
  - Supports testing GET, POST, PUT, DELETE endpoints
- Chosen because:
  - Simplifies testing of API routes
  - Works seamlessly with Jest for assertions and async tests

---

## Setup

1. Install dependencies (if not already installed):
```bash
npm install
```

2. Ensure your `package.json` contains:
```json
"scripts": {
  "test": "jest"
}
```

## Running Tests

- Run all tests:
```bash
npm test
```

- Run with coverage:
```bash
npm test -- --coverage
```

- Run a specific test file:
```bash
npm test -- __tests__/api.test.js
```

## Test Structure
```javascript
describe('Component/Method Name', () => {
  beforeEach(() => {
    // Setup code
  });

  it('should do something specific', async () => {
    // Arrange
    // Act
    // Assert
  });
});
```

---

## Test Cases

Unit tests are located in `tests/basicApi.test.js`. Below is a summary of the test cases.

| Test ID | Method | Input | Expected Result | Notes |
|---------|--------|-------|----------------|-------|
| 1 | GET /test | None | Status 200, `{ name: 'Test1', status: 'test' }` | Verifies API responds correctly to basic GET request |
| 2 | POST /test/:id | `id=123`, `{ info: 'hello' }` | Status 200, `{ name: 'Test message with info: hello and ID: 123' }` | Verifies POST works with valid input |
| 3 | POST /test/:id | `id=123`, `{}` | Status 418, `{ message: 'No info!' }` | Verifies API handles missing body input correctly |

> **Note:** Since this API does not interact with external services, mocks are not required. Any external calls would be stubbed in future modules.

---

## Test Coverage Report

The HTML coverage report is available in the Docusaurus documentation site at:  
[View Coverage Report](/coverage/index.html)

> **Note:** The report can be updated by regenerating it via `npx jest --coverage` and copying the files to the Docusaurus `static/coverage` folder.

---

## Notes

- Integration and Acceptance testing are covered in separate `.md` files.  
- Unit tests focus solely on individual methods and their expected behavior.  
- Maintaining clear unit tests ensures a strong foundation before integration with other components.