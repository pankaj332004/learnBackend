const tokenStore = {
    accessToken: "old-access-token",
    refreshToken: "my-refresh-token",
    accessTokenExpired: true
}

function refreshAccessToken(tokenStore){
    if(!tokenStore.refreshToken){
        return "Refresh Token missing";
    }

    if(tokenStore.accessTokenExpired){
        tokenStore.accessToken = "new-access-token";
        tokenStore.accessTokenExpired = false;

        return "New access token generated";
    }
    return "Access token is still valid"
}

console.log(refreshAccessToken(tokenStore))

// 1. What is a Refresh Token in OAuth 2.0?
// A Refresh Token is a credential issued by the Authorization Server that allows a Client to request a new Access Token when the current Access Token expires.
// 2. Why do we need a Refresh Token?
// It allows the application to obtain a new Access Token without asking the user to log in and authorize again, as long as the Refresh Token is still valid.
// 3. What is the difference between an Access Token and a Refresh Token?
// Access Token	Refresh Token
// Used to access protected resources.	Used to obtain a new Access Token.
// Sent to the Resource Server.	Sent to the Authorization Server.
// Usually short-lived.	Usually longer-lived.
// Has specific scopes/permissions.	Used to renew authorization; not used to access resources directly.

// 4. Which server validates a Refresh Token?
// The Authorization Server validates the Refresh Token.
// 5. Should a Refresh Token be sent to the Resource Server?
// No. A Refresh Token should only be sent to the Authorization Server's token endpoint. It should never be used as a bearer token to access protected resources.
// 6. What happens if a Refresh Token expires?
// The Authorization Server rejects it. The user may need to log in and authorize the application again to obtain new tokens.
// 7. What is Refresh Token Rotation?
// Refresh Token Rotation is a security technique in which the Authorization Server issues a new Refresh Token when the Client uses the existing one. The old Refresh Token is invalidated.
// 8. Can a new Access Token be obtained without asking the user to log in again?
// Yes. If the Refresh Token is valid and has not expired or been revoked, the Authorization Server can issue a new Access Token without requiring the user to log in again.