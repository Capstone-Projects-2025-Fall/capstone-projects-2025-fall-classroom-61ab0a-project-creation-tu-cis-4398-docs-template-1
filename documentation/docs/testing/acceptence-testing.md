---
sidebar_position: 4
---

# Acceptance Testing

This document outlines the procedures and test cases for acceptance testing of the project. It includes automated and manual test verification to ensure that all functional and non-functional requirements are satisfied.

---

## Purpose

Acceptance testing demonstrates that the system meets the requirements specified in the requirements document. This includes verifying user stories, functional workflows, and system performance.

---

## Acceptance Test Approach

1. **Automated Tests**: Derived from the unit and integration tests, ensuring critical workflows are validated programmatically.
2. **Manual Tests**: User-driven tests to confirm functional and non-functional requirements, including accessibility, usability, and performance.
3. **Documentation of Results**: All test outcomes are recorded with pass/fail status, observations, and screenshots when necessary.

---

## Acceptance Test Sheet

The acceptance test sheet is maintained in Google Sheets. For offline or static documentation, a snapshot of test cases and results can be included in tables.

### Example Table Format

| Test Case ID | Feature | Steps | Expected Result | Actual Result | Pass/Fail |
|--------------|---------|-------|----------------|---------------|-----------|
| AT-01 | API GET /test | Send GET request to /test | JSON response with `name: Test1` and `status: test` | JSON response received correctly | Pass |
| AT-02 | API POST /test/:id | Send POST request with valid info | JSON response with message including `info` and `id` | Message returned correctly | Pass |
| AT-03 | API POST /test/:id | Send POST request without info | HTTP 418 with message `No info!` | Error returned correctly | Pass |

*(More test cases can be added following this structure for other functionalities.)*

---

## Execution

### Automated Acceptance Tests
- Derived from unit and integration tests.
- Run using:
```bash
cd Initial_API
npx jest --coverage
```
- Verify that all critical workflows pass and coverage report is generated.

### Manual Acceptance Tests
- Perform tests as described in the test sheet.
- Record outcomes in the acceptance test sheet.
- Include screenshots or logs where appropriate.

---

## References
- Requirements Document (for mapping features to test cases)
- Unit Testing Documentation
- Integration Testing Documentation