// User information
const user = {
    email: "rahul@gmail.com",
    password: "123456"
};

// Authentication
function authenticateUser(email, password) {
    if (
        email === user.email &&
        password === user.password
    ) {
        return "User authenticated successfully";
    }

    return "Invalid email or password";
}

// Authorization (simplified simulation)
function authorizeAccess(permissionGranted) {
    if (!permissionGranted) {
        return "Access denied";
    }

    return "Access granted to permitted resources";
}

console.log(
    authenticateUser("rahul@gmail.com", "123456")
);

console.log(authorizeAccess(false));