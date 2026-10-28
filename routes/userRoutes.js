const express = require("express");

const route = express.Router();
const {
    getAllUserController,
    findUserByIdController,
    createUserController,
    updateUserController,
    patchUserController,
    deleteUserController
} = require("../controllers/userController");

route.get("/", getAllUserController);
route.get("/:id", findUserByIdController);

route.post("/", createUserController);

route.put("/:id", updateUserController);

route.patch("/:id",patchUserController);

route.delete("/:id", deleteUserController);

module.exports = route;