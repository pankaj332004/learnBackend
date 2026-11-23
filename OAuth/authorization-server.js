const authorizationServer = {
    name: "Google",
    userApproved: false
};

function issueAccessToken(server) {
    if (!server.userApproved) {
        return "Authorization denied";
    }

    return "Access token issued successfully";
}

console.log(issueAccessToken(authorizationServer));