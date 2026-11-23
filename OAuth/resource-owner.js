const resourceOwner = {
    name: "Alex",
    ownsGoogleDrive: true,
    permissionGranted: false
};

function grantPermission(owner, permissionGranted) {
    if (!owner.ownsGoogleDrive) {
        return "Resource not found";
    }

    if(!permissionGranted){
        return "Permission not granted to the application"
    }
    owner.permissionGranted = true;

    return "Permission granted to the application";
}

console.log(grantPermission(resourceOwner, false));