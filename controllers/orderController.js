const mongoose = require("mongoose")

const {
    findOrderById, 
    findOrderByStatus,
    createOrder,
    findOrderByIdForCustomer,
    findOrdersByCustomer
} = require("../services/orderService");
const {
    successResponse, 
    errorResponse
} = require("../utils/apiResponse")

// Get orders by id — for admin use
function getOrderById(req,res){

    const id = req.params.id;
    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json(
            errorResponse("Invalid Order ID")
        )
    }

    const order = findOrderById(id);
    if(!order){
        return res.status(404).json(
            errorResponse("Order Not Found")
        )
    }

    res.json(
        successResponse("order retrieved successfully", order)
    )
}

// Get orders by status — for admin use
function getOrderByStatus(req,res){
    const status = req.params.status;
    const order = findOrderByStatus(status);
    
    res.json(
        successResponse("order retrieved successfully", order)
    );
}

// Create an order for the logged-in customer
async function createOrderController(req,res,next){
    try{
        const customerId = req.user.id;

        const {items} = req.body

        const order = await createOrder(customerId, items);

        return res
        .status(201)
        .json(
            successResponse("Order created Successfully",order)
        );
    }
    catch(err){
        if(err.statusCode){
            return res
            .status(err.statusCode)
            .json(
                errorResponse(err.message)
            );
        }
        next(err);
    }
}

// Get one order belonging to the logged-in customer
async function getMyOrderByIdController(req, res, next) {
  try {
    const { orderId } = req.params;

    if (!mongoose.isValidObjectId(orderId)) {
      return res.status(400).json(
        errorResponse("Invalid order ID")
      );
    }

    const order = await findOrderByIdForCustomer(
      orderId,
      req.user.id
    );

    if (!order) {
      return res.status(404).json(
        errorResponse("Order not found")
      );
    }

    return res.status(200).json(
      successResponse("Order retrieved successfully", order)
    );
  } catch (err) {
    next(err);
  }
}

// Get all orders belonging to the logged-in customer
async function getMyOrdersController(req, res, next) {
  try {
    const orders = await findOrdersByCustomer(req.user.id);

    return res.status(200).json(
      successResponse("Your orders retrieved successfully", orders)
    );
  } catch (err) {
    next(err);
  }
}

module.exports = {
    getOrderById, 
    getOrderByStatus,
    createOrderController,
    getMyOrderByIdController,
    getMyOrdersController
};