const authorizationServer = {
    validCode: "auth-code-123"
};

function authorizeUser(userApproved) {
    if (!userApproved) {
        return "User denied permission";
    }

    return authorizationServer.validCode;
}

function exchangeCodeForToken(code) {
    if (code !== authorizationServer.validCode) {
        return "Invalid authorization code";
    }

    return "access-token-123";
}

function accessResource(accessToken) {
    if (accessToken !== "access-token-123") {
        return "Access denied";
    }

    return "Protected resource accessed successfully";
}

// Step 1: User approves
const authorizationCode = authorizeUser(true);

// Step 2: Exchange code for Access Token
const accessToken = exchangeCodeForToken(authorizationCode);

// Step 3: Access protected resource
console.log(accessResource(accessToken));

// 1. What is Authorization Code Flow in OAuth 2.0?
// Authorization Code Flow is an OAuth 2.0 process in which a Client redirects the user to an Authorization Server to obtain permission.

// After the user approves, the Authorization Server sends an Authorization Code to the Client. The Client exchanges this code for an Access Token.
// 2. What is an Authorization Code?
// An Authorization Code is a temporary code issued by the Authorization Server after the user grants permission.

// The Client uses this code to request an Access Token.
// 3. Is an Authorization Code the same as an Access Token?
// No.
// - Authorization Code: Used to obtain an Access Token.
// - Access Token: Used to access protected resources.
// 4. Which server generates the Authorization Code?
// The Authorization Server generates the Authorization Code after the user approves the requested authorization.
// 5. Why does the Client exchange the Authorization Code?
// The Client exchanges the Authorization Code to obtain an Access Token.

// The Access Token allows the Client to access resources that the user has permitted.
// 6. Which server receives the Authorization Code during token exchange?
// The Authorization Server receives the Authorization Code at its token endpoint.

// It validates the code and, if valid, issues tokens.
// 7. What happens if the user denies permission?
// The Authorization Server does not issue an Authorization Code for the requested authorization.

// The Client cannot obtain an Access Token through that authorization attempt.
// 8. What does the Resource Server receive from the Client?
// The Resource Server receives the Access Token, usually through the HTTP Authorization header:
// Authorization: Bearer access-token-123


// It validates the token before providing protected resources.
// 9. Why is the Authorization Code temporary?
// It is temporary for security reasons.

// If someone steals an Authorization Code, the opportunity to misuse it is limited. Authorization Codes are also designed for one-time use and have a short expiration time.
// 10. What is the callback URL?
// A callback URL is the URL in the Client application where the Authorization Server redirects the user's browser after authorization.

// For example:
// http://localhost:4000/auth/google/callback


// The Authorization Server redirects the browser to this URL with the Authorization Code when authorization succeeds.