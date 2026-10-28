const express = require("express");
const route  = express.Router()

const {
    getOrderById,
    getOrderByStatus
} = require("../controllers/orderController");


route.get("/:id/status", getOrderById);
route.get("/status/:status", getOrderByStatus);

module.exports = route;