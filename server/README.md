# DiamondZ API Server

This is the backend server for the DiamondZ API. It is built with Express.js, Prisma, and Swagger documentation. The server exposes endpoints for managing benefits, process steps, frequently asked questions, and PPF pages.

## What this project has

- Express API server
- CORS support
- JSON request body parsing
- Swagger API documentation
- Prisma database access
- Route modules for:
  - Benefits
  - Process steps
  - FAQs
  - PPF pages

## Project structure

- `package.json` - project dependencies and scripts
- `src/app.js` - Express app setup and routes registration
- `src/server.js` - server startup
- `src/config/swagger.js` - Swagger documentation configuration
- `src/modules/benefit` - benefit routes, controller, service, repository, swagger docs
- `src/modules/processStep` - process step routes and logic
- `src/modules/faq` - FAQ routes and logic
- `src/modules/ppfPage` - PPF page routes and logic
- `prisma/schema.prisma` - Prisma schema for the database
- `prisma/migrations/` - database migration history

## Installation

1. Open a terminal in the project root.
2. Install dependencies:

```bash
npm install
```

## Running the server

Start the server in production mode:

```bash
npm start
```

Start the server in development mode with `nodemon`:

```bash
npm run dev
```

The server listens on `PORT` from the environment, or defaults to `5000`.

## Environment

Create a `.env` file in the project root with the following values if needed:

```env
PORT=5000
DATABASE_URL="your_database_connection_string"
```

## API Routes

The API includes the following route groups:

- `GET /` - health check
- `GET /api-docs` - Swagger UI documentation
- `GET /docs` - redirect to Swagger UI
- `GET /api/benefits` - benefits endpoints
- `GET /api/process-steps` - process steps endpoints
- `GET /api/faqs` - FAQ endpoints
- `GET /api/ppf-pages` - PPF page endpoints

Each module includes route definitions, controller logic, and Swagger docs.

## Swagger Documentation

Open the API documentation in your browser after starting the server:

```text
http://localhost:5000/api-docs
```

## Notes

- Prisma is installed and used for data access. Run migrations with `npx prisma migrate dev` when the database schema changes.
- Make sure your `DATABASE_URL` is configured correctly in `.env` for Prisma to connect.
