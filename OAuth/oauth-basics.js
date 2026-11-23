const user = {
    name: "Pankaj",
    googleAccount: true
}

function requestGoogleAccount(user) {
    if (!user.googleAccount) {
        return "Google account not found";
    }
    return "Google authorization requested";
}

const result = requestGoogleAccount(user);

console.log(result);