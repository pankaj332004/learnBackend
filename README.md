Backend Development Learning Project
A Node.js and Express backend learning project built step by step while
studying backend development fundamentals, REST APIs, MongoDB,
authentication, authorization, sessions, cookies, and JWT.
Learning project: This repository is for practice and learning.
Review configuration, security, and deployment choices before using
any part of it in production.

Tech Stack
- Node.js --- JavaScript runtime
- Express.js --- HTTP server, routing, and middleware
- MongoDB --- database
- Mongoose --- MongoDB object modeling
- JWT (jsonwebtoken) --- access and refresh tokens
- bcrypt --- password hashing
- express-session --- server-managed sessions
- cookie-parser --- parsing incoming cookies
- Swagger UI --- API documentation
- Postman --- API testing
Topics Covered So Far
Backend and REST API Fundamentals
- Creating and running an Express server
- Organizing routes and middleware
- Using controllers to handle requests and responses
- Keeping backend code organized around controller, service, and
  database responsibilities
- Returning consistent API success and error responses
- Handling errors with middleware
- Validating incoming request data
- Testing endpoints with Postman
MongoDB and CRUD
- Connecting a Node.js application to MongoDB
- Working with Mongoose models
- Creating, reading, updating, and deleting resources
- Building product and order-related endpoints
- Handling database lookup and validation results
Users and Passwords
- User registration and login flows
- Normalizing email addresses
- Validating password requirements
- Hashing passwords with bcrypt
- Comparing a submitted password with a stored password hash
- Avoiding returning password data in API responses
Authentication and JWT
- Authentication versus authorization
- Creating and verifying JWTs
- Understanding access tokens and refresh tokens
- Adding token expiration
- Verifying token type
- Storing refresh-token records in MongoDB
- Refresh-token rotation
- Revoking refresh tokens during logout
- Protecting routes with authentication middleware
Authorization
- Role-based access control (RBAC)
- Distinguishing admin and regular-user access
- Restricting admin-only actions with role middleware
- Testing authorization by checking allowed and denied requests
Sessions and Cookies
- Configuring express-session
- Understanding session IDs and server-managed session data
- Parsing cookies with cookie-parser
- Setting HTTP-only refresh-token cookies
- Using cookie options such as secure, sameSite, path, and
  maxAge
- Clearing the refresh-token cookie during logout
- Testing login, refresh, token rotation, and logout in Postman
API Documentation
- Configuring Swagger UI
- Making API documentation available through an API docs route
Authentication Flow Currently Practiced
1. Login: Verify the user's credentials, issue an access token, and
   set the refresh token in an HTTP-only cookie.
2. Access protected routes: Send the access token in the
   Authorization: Bearer <token> header.
3. Refresh: Read the refresh token from the cookie, verify it,
   check its stored record, rotate it, and issue a new access token.
4. Logout: Delete/revoke the stored refresh token and clear the
   refresh-token cookie.
5. Authorization: Apply role middleware to routes that require
   admin access.
Setup
1. Install dependencies
Clone the repository, open the project directory, and run:
npm install
2. Configure environment variables
Create a local .env file in the project root. Do not commit it. Add
the variable names required by your code, for example:
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/your_database_name
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=replace_with_a_different_long_random_secret
JWT_REFRESH_EXPIRES_IN=7d
SESSION_SECRET=replace_with_another_long_random_secret
NODE_ENV=development
Use unique, strong secrets for your own local environment. The names
above reflect the configuration used in this learning project; confirm
the code's required variables before running it. Never publish real
credentials or secret values.
3. Start the server
Use the start script defined in package.json, if present. Otherwise,
for this project the server can be started with:
node server.js
The server uses PORT from the environment when configured, with a
fallback defined in the application.
4. Test the API
Use Postman or another API client to test the routes. Check your route
files for the exact endpoints and request formats. The authentication
routes are mounted under /api/v1/auth, including login, registration,
profile, refresh, and logout.

If Swagger UI is configured, open /api-docs on your local server.
Security Notes
- Keep .env, database credentials, API keys, private keys, and real
  tokens out of Git.
- Never commit passwords, refresh tokens, access tokens, session IDs,
  or exported cookie data.
- Keep refresh tokens in HTTP-only cookies where appropriate; do not
  expose them in JSON responses if the design is cookie-based.
- HttpOnly prevents JavaScript from directly reading a cookie; it
  does not prevent every form of attack.
- Use HTTPS and secure: true in production.
- Choose SameSite and CORS settings based on the frontend/backend
  deployment and threat model.
- The default in-memory store used by express-session is for
  development, not production.
- Before production use, review rate limiting, CSRF protections where
  relevant, logging, input validation, token revocation, and
  deployment configuration.
Suggested Next Steps
- Finish the remaining JWT security topics from the learning roadmap.
- Continue with permissions and resource-ownership authorization.
- Add automated tests for success, failure, expiration, and
  revoked-token cases.
- Review security and production configuration before deployment.
Disclaimer
This repository documents a learning journey and does not claim to be a
production-ready authentication system.