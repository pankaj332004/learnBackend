const {
    errorResponse, 
    successResponse
} = require("../utils/apiResponse")

const {
    getAllUsers,
    findUserById,
    createUser,
    updateUser,
    patchUser,
    deleteUser,
    findUserByName,
    findUserByRole
} =  require("../services/userService")

function getAllUserController(req,res){
    let users = getAllUsers();
    if(req.query.role){
        users = findUserByRole(req.query.role)
    }
    if(req.query.name){
        users = findUserByName(req.query.name)
    }
    console.log("Filtered users:", users);
    console.log("Query parameters:", req.query);
    return res.status(200).json(
        successResponse("All the user retrieved successfully", users)
    )
}

function findUserByIdController(req,res){
    const id = Number(req.params.id);
    if(!Number.isInteger(id) || id<=0){
        return res.status(400).json(
            errorResponse("Invalid user ID")
        );
    }

    const user = findUserById(id);

    if(!user){
        return res.status(404).json(
            errorResponse("User not found")
        )
    }

    res.status(200).json(
        successResponse("User retrieved successfully", user)
    )
}

function createUserController(req,res){
    const {name, email, role} = req.body;

    if(typeof name !== "string" || name.trim() === ""){
        return res.status(400).json(
            errorResponse("Product name is required")
        );
    }

    if (typeof email !== "string" || !email.includes("@")) {
        return res.status(400).json({
            success: false,
            message: "Invalid email",
            data: null
        });
    }

    if (typeof role !== "string" || !["user", "admin"].includes(role)) {
        return res.status(400).json({
            success: false,
            message: "Role must be user or admin",
            data: null
        });
    }

    const user = createUser(name, email, role);
    res.status(201).json(
        successResponse("Create new user successfully", user)
    )
}

function updateUserController(req,res){
    const id = Number(req.params.id);
    const {name, email, role} = req.body;

    if(!Number.isInteger(id) || id<=0){
        return res.status(400).json(
            errorResponse("Invalid user Id")
        )
    }
    if(typeof name !== "string" || name.trim() === ""){
        return res.status(400).json(
            errorResponse("Product name is required")
        );
    }

    if (typeof email !== "string" || !email.includes("@")) {
        return res.status(400).json({
            success: false,
            message: "Invalid email",
            data: null
        });
    }

    if (typeof role !== "string" || !["user", "admin"].includes(role)) {
        return res.status(400).json({
            success: false,
            message: "Role must be user or admin",
            data: null
        });
    }

    const user = updateUser(id, name.trim(), email, role);

    if (user === null) {
        return res.status(404).json(
            errorResponse("User not found")
        );
    }

    res.status(200).json(
        successResponse("User updated successfully", user)
    )
}

function patchUserController(req,res){
    const id = Number(req.params.id);
    const {name, email, role} = req.body;

    if(!Number.isInteger(id) || id<=0){
        return res.status(400).json(
            errorResponse("Invalid User ID")
        )
    }

    if(name===undefined && email === undefined && role === undefined){
        return res.status(400).json(
            errorResponse("Provide at least one field to update")
        );
    }

    if(name !== undefined && (typeof name !== "string" || name.trim() === "")){
        return res.status(400).json(
            errorResponse("User name must be a non-empty string")
        );
    }

    if(email !== undefined && (typeof email !== "string" || !email.includes("@"))){
        return res.status(400).json(
            errorResponse("Invalid email")
        );
    }
    if(role !== undefined && (typeof role !== "string" || !["user", "admin"].includes(role))) {
        return res.status(400).json({
            success: false,
            message: "Role must be user or admin",
            data: null
        });
    }

    const updates = {};

    if (name !== undefined) {
        updates.name = name.trim();
    }

    if (email !== undefined) {
        updates.email = email;
    }

    if (role !== undefined) {
        updates.role = role;
    }

    const user = patchUser(id, updates);

    if (!user) {
        return res.status(404).json(
            errorResponse("User not found")
        );
    }

    return res.status(200).json(
        successResponse("Exisitng user updated successfully", user)
    );
}

function deleteUserController(req,res){
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json(
            errorResponse("Invalid User ID")
        );
    }

    const user = deleteUser(id);

    if (!user) {
        return res.status(404).json(
            errorResponse("User not found")
        );
    }

    return res.status(200).json(
        successResponse("User deleted successfully", user)
    );
}

module.exports = {
    getAllUserController,
    findUserByIdController,
    createUserController,
    updateUserController,
    patchUserController,
    deleteUserController
}