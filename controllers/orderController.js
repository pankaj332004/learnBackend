const {findOrderById, findOrderByStatus} = require("../services/orderService");
const {successResponse, errorResponse} = require("../utils/apiResponse")
function getOrderById(req,res){

    const id = Number(req.params.id);
    if(!Number.isInteger(id) || id<=0){
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
function getOrderByStatus(req,res){
    const status = req.params.status;
    const order = findOrderByStatus(status);
    
    res.json(
        successResponse("order retrieved successfully", order)
    );
}

module.exports = {getOrderById, getOrderByStatus};