A backend service for generating and managing shortened URLs with secure authentication and ownership-based access control.

Built with Node.js, Express, PostgreSQL, Drizzle ORM, JWT authentication, and Docker to demonstrate scalable backend architecture and clean service-layer design.

🚀 Features

-User signup and login with JWT authentication

-Short URL generation with unique shortcode creation

-Redirection from short URLs to original URLs

-Fetch all URLs created by an authenticated user

-Delete URLs with ownership validation

-Input validation using Zod

-Dockerized PostgreSQL for consistent local development

-Clean service–route–middleware architecture

| Layer            | Technology       |
| ---------------- | ---------------- |
| Backend          | Node.js, Express |
| Database         | PostgreSQL       |
| ORM              | Drizzle ORM      |
| Authentication   | JWT              |
| Validation       | Zod              |
| Containerization | Docker           |
| API Testing      | Postman          |
