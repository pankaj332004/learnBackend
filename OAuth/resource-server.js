// const resourceServer = {
//     name: "GoogleDrive",
//     validToken: "google-access-token",
//     protectedData: ["photo1.jpg", "photo2.jpg"]
// };

// function getProtectedData(accessToken) {
//     if (accessToken !== resourceServer.validToken) {
//         return "Access denied: Invalid token";
//     }

//     return resourceServer.protectedData;
// }

// console.log(getProtectedData("google-access-token"));

const resourceServer = {
    name : "PhotoServer",
    validToken: "photo-token-123",
    protectedData: ["photo1.png", "photo2.png" , "photo3.png"]
}

function getProtectedData(accessToken){
    if(accessToken !== resourceServer.validToken){
        return "Access denied : Invalid Token";
    }

    return resourceServer.protectedData;
}

console.log(getProtectedData("photo-toen-123"))