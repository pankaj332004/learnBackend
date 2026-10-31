const express = require("express");
const route  = express.Router()

const {
    getOrderById,
    getOrderByStatus,
    createOrderController,
    getMyOrderByIdController,
    getMyOrdersController
} = require("../controllers/orderController");

const{
    authenticateUser,
    requireAdmin
} = require("../middleware/authMiddleware");

route.post(
    "/",
    authenticateUser,
    createOrderController
);
route.get(
    "/my-orders", 
    authenticateUser, 
    getMyOrdersController
);
route.get(
  "/:orderId",
  authenticateUser,
  getMyOrderByIdController
);
route.get(
    "/admin/:id",
    authenticateUser,
    requireAdmin, 
    getOrderById
);
route.get(
    "/admin/status/:status",
    authenticateUser,
    requireAdmin,  
    getOrderByStatus
);

module.exports = route;