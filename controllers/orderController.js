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
async function getOrderById(req,res, next){
try{
    const {id} = req.params;

    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json(
            errorResponse("Invalid Order ID")
        )
    }

    const order = await findOrderById(id);
    if(!order){
        return res.status(404).json(
            errorResponse("Order Not Found")
        )
    }

    // console.log("Order result:", order);
    // console.log("Order type:", order.constructor.name);

    res.json(
        successResponse("order retrieved successfully", order)
    )

}catch (err) {
    next(err);
  }
}

// Get orders by status — for admin use
async function getOrderByStatus(req,res){
    // const { status } = req.params;
    // const order = await findOrderByStatus(status);
    
    // res.json(
    //     successResponse("order retrieved successfully", order)
    // );
     try {
    const { status } = req.params;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json(
        errorResponse("Invalid order status")
      );
    }

    const orders = await findOrderByStatus(status);

    return res.status(200).json(
      successResponse(
        "Orders retrieved successfully",
        orders
      )
    );
  } catch (err) {
    next(err);
  }
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