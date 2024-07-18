# Magic Transporters README

Welcome to the Magic Transporters Project

## Scripts

### Requirement

- docker and docker compose must be instated

### Running The App

- `docker compose up api`

App should be available at port `http://localhost:5000`

Swagger Docs: `http://localhost:5000/api-docs`

### Running Tests

- **Run Unit Tests:**

  ```bash
  npm run test:unit
  Executes Jest to run unit tests located in ./src/test.
  ```

- **Run E2E Tests:**
  ```bash
  npm run test:e2e
  Executes Jest to run unit tests located in ./src/e2e.
  ```

### Internals

#### **/src/routes**

This folders hold files with the convention `*.route.ts` each having:

1. The endpoints declaration with the necessary middlewares
2. The open api swagger specifications

#### **/src/controller**

This folders hold files with the convention `*.controller.ts` each having:

1. The endpoint implementations consuming the incoming `requests` and responding them appropriately using the `response` object

#### **/src/services**

This folders hold files with the convention `*.service.ts` each having:

1. The application business logic

#### **/src/repository**

This folders hold files with the convention `*.repository.ts` each having:

1. The abstracted layer communicating with the database

#### **/src/model**

This folders hold files with the convention `*.model.ts` each having:

1. The declaration of the database models
2. Exposing the schema and db ODM engine
