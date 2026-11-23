const users = [];

function googleLogin(googleUser) {
    if (!googleUser.email || !googleUser.googleId) {
        return "Invalid Google user";
    }

    let user = users.find(
        (u) => u.googleId === googleUser.googleId
    );

    if (!user) {
        user = {
            googleId: googleUser.googleId,
            email: googleUser.email,
            name: googleUser.name
        };

        users.push(user);

        console.log("New user created");
    } else {
        console.log("Existing user found");
    }

    return "Application JWT generated for " + user.email;
}

const googleUser = {
    googleId: "google-123",
    email: "rahul@gmail.com",
    name: "Rahul"
};

console.log(googleLogin(googleUser));

// 1. What is Google Login?
// Google Login allows users to sign in to an application using their Google account instead of creating a separate password for that application.
// 2. Does Google Login use OAuth 2.0 or OpenID Connect?
// Google Login uses OpenID Connect (OIDC), which is built on OAuth 2.0.

// OIDC provides authentication, while OAuth 2.0 provides authorization.
// 3. What is the difference between OAuth 2.0 and OpenID Connect?
// - OAuth 2.0 allows an application to access resources with the user's permission.
// - OpenID Connect allows an application to verify the user's identity.
// 4. What is an ID Token?
// An ID Token is a token issued through OpenID Connect that contains information about the authenticated user.

// It is commonly a JWT and includes claims such as the user's identity and issuer.
// 5. What is the purpose of Google's callback URL?
// It is the URL where Google redirects the user's browser after authorization.

// For example:
// http://localhost:4000/auth/google/callback


// Your backend handles the authorization response at this route.
// 6. What happens if the user already exists in your MongoDB database?
// The backend finds the existing user and signs them into the application instead of creating a duplicate account.
// 7. What happens if the Google user does not exist in your database?
// The backend creates a new user record using verified information from Google's identity response, then signs the user into the application.
// 8. Why does your backend generate its own JWT?
// Your backend generates its own JWT so the user can authenticate with your application's protected APIs using your existing authentication middleware.
// 9. Is Google's Access Token the same as your application's JWT?
// No.
// - Google's Access Token is used to access Google resources within the granted permissions.
// - Your application's JWT is used to authenticate requests to your own backend.
// 10. What is the sub claim in Google's ID Token?
// The sub claim is Google's stable, unique identifier for the user within that identity provider.

// It is generally a better account-linking identifier than email because an email address can change.