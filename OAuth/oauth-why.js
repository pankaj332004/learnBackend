const user = {
    name: "Pankaj",
    googlePassword: "secret@123"
}

function withoutOAuth(user){
    console.log("Application received password: " + user.googlePassword);
}

function withOAuth(accessToken){
    if(!accessToken){
        return "Access token not found";
    }
    return "Application received access token ";
}

withoutOAuth(user);

const token = "google-access-token-12345";
const result = withOAuth(token);

console.log(result);