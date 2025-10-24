---
sidebar_position: 4
---

# Integration Testing

## Purpose
Integration testing verifies that the components of the API interact correctly, as expected in end-to-end workflows.

## Test Approach
- Use **mock requests** and **mock data** where appropriate.
- Confirm that endpoints return correct status codes and response structures.
- Verify that POST requests correctly process input data.

## Example Integration Test Cases

| Test Case | Description | Input | Expected Output |
|-----------|-------------|-------|----------------|
| GET /test | Verify endpoint returns correct JSON | N/A | `{ "name": "Test1", "status": "test" }` |
| POST /test/:id with info | Ensure POST data is processed | `{ "info": "hello" }` and `id=123` | `{ "name": "Test message with info: hello and ID: 123" }` |
| POST /test/:id without info | Validate handling of missing data | `{}` and `id=123` | Status code `418` with `{ "message": "No info!" }` |

## Running Integration Tests
Currently, the unit tests also serve as a basic integration check.

```bash
npm test
```

## Notes
- All tests are automated.
- No manual entry or interpretation is required.