// const client = {
//     name: "MyShoppingApp",
//     clientType: "confidential",
//     requestedPermission: "read_google_drive"
// };

// function requestAccess(client) {
//     if (!client.name) {
//         return "Client not found";
//     }

//     return `${client.name} is requesting permission: ${client.requestedPermission}`;
// }

// console.log(requestAccess(client));

const client  ={
    name: "PhotoApp",
    clientType: "public",
    requestedPermission: "read_photos"
}

function requestAccess(client){
    if(!client.name){
        return "Client not found"
    }
    return `${client.name} is requesting permission: ${client.requestedPermission}`;
}

console.log(requestAccess(client))