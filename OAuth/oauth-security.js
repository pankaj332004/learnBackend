const crypto = require("crypto");

const storedState = crypto.randomBytes(16).toString("hex");

function validateOAuthState(returnedState) {
    if (!returnedState) {
        return "State parameter missing";
    }

    if (returnedState !== storedState) {
        return "Invalid state - possible CSRF attack";
    }

    return "OAuth state verified successfully";
}

console.log(validateOAuthState(storedState));

console.log(validateOAuthState("wrong-state"));


// 1. What is OAuth security?
// OAuth security means protecting the authorization process, tokens, and user resources from unauthorized access and attacks.
// 2. Why should we use HTTPS in OAuth?
// HTTPS encrypts communication between the Client, Authorization Server, and Resource Server. It helps prevent attackers from intercepting sensitive information such as tokens and authorization codes.
// 3. Why should a Client Secret never be exposed in frontend code?
// Frontend code can be inspected by users and attackers. If the Client Secret is exposed, an attacker may misuse the application's credentials.

// Keep it securely on the backend using environment variables.
// 4. What is PKCE and why is it important?
// PKCE (Proof Key for Code Exchange) is a security extension to Authorization Code Flow.

// It helps prevent attackers who intercept an Authorization Code from exchanging it for an Access Token without the original Code Verifier.
// 5. What is the purpose of the State parameter?
// The State parameter helps protect OAuth authorization requests against CSRF attacks.

// The Client generates a random value, stores it securely, and checks that the returned value matches.
// 6. What is a CSRF attack?
// CSRF (Cross-Site Request Forgery) is an attack in which an attacker tricks a user's browser into making an unwanted request to a website where the user is already authenticated.

// In OAuth, the State parameter helps protect the authorization callback against this type of attack.
// 7. Why should we use exact Redirect URIs?
// Exact Redirect URI matching ensures that the Authorization Server redirects authorization responses only to registered and trusted callback URLs.

// It helps prevent authorization codes or tokens from being sent to attacker-controlled URLs.
// 8. Why should we request limited OAuth scopes?
// We should request only the permissions our application actually needs.

// For example, if an application only needs to read photos, it should request read:photos, not permission to delete photos.
// 9. How should we protect Refresh Tokens?
// - Store them securely.
// - Never expose them unnecessarily in frontend code or logs.
// - Use expiration and revocation policies.
// - Use Refresh Token Rotation where supported.
// - Send them only to the Authorization Server's token endpoint.
// 10. Why must a Resource Server validate Access Tokens?
// The Resource Server must validate the Access Token to ensure that it is legitimate, not expired, issued by a trusted Authorization Server, and has the required permissions.