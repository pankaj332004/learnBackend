const accessToken = {
    value: "photo-token-123",
    scope: ["read:photos"],
    expiresIn: 3600
};

function accessProtectedResource(token) {
    if (!token.value) {
        return "Access token missing";
    }

    if (!token.scope.includes("read:photos")) {
        return "Permission denied";
    }

    return "Photos accessed successfully";
}

console.log(accessProtectedResource(accessToken));