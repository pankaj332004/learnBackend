const users = [];

function githubLogin(githubUser) {
    if (!githubUser.id || !githubUser.username) {
        return "Invalid GitHub user";
    }

    let user = users.find(
        (u) => u.githubId === githubUser.id
    );

    if (!user) {
        user = {
            githubId: githubUser.id,
            username: githubUser.username
        };

        users.push(user);

        console.log("New user created");
    } else {
        console.log("Existing user found");
    }

    return "Application JWT generated for " + user.username;
}

const githubUser = {
    id: "github-101",
    username: "rahul123"
};

console.log(githubLogin(githubUser));

// 1. What is GitHub Login?
// GitHub Login allows users to sign in to an application using their GitHub account instead of creating a separate password for that application.
// 2. Which authorization protocol does GitHub OAuth App use?
// GitHub OAuth Apps use OAuth 2.0 to authorize applications to access permitted GitHub resources.
// 3. What happens when a user clicks Continue with GitHub?
// The application redirects the user's browser to GitHub's authorization page. The user signs in if needed and approves the requested permissions.
// 4. What is the purpose of the GitHub callback URL?
// It is the URL where GitHub redirects the user's browser after authorization, usually with an Authorization Code.

// Example:
// http://localhost:4000/auth/github/callback


// 5. What does the backend do with the Authorization Code?
// The backend sends the Authorization Code to GitHub's token endpoint and exchanges it for an Access Token.
// 6. How does the backend get the GitHub user's profile?
// The backend uses the GitHub Access Token to call GitHub's user API and retrieve the user's profile.
// 7. What happens if the GitHub user already exists in MongoDB?
// The backend finds the existing account and signs the user in without creating a duplicate.
// 8. Why does your application generate its own JWT?
// Your backend generates its own JWT so the user can authenticate with your application's protected APIs using your existing JWT authentication middleware.
// 9. Is GitHub's Access Token the same as your application's JWT?
// No.
// - GitHub Access Token: used to access permitted GitHub resources.
// - Application JWT: used to authenticate requests to your own backend.
// 10. What is the difference between Google Login and GitHub Login?
// Both allow users to sign in using an external account, but they use different identity-provider flows:
// - Google Login commonly uses OpenID Connect to authenticate the user.
// - GitHub OAuth App login uses OAuth 2.0; the backend retrieves the user's identity through GitHub's user API.