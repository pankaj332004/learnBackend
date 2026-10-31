const Order = require("../models/order.models");
const Product = require("../models/product")

function findOrderById(id){
    // return orders.find((order) => order.id === id);
    return Order.findById(id).populate("items.product");
}

function findOrderByStatus(status){
    // return orders.filter((order) => order.status === status);
    return Order.find({ status }).populate("items.product");
}
async function createOrder(customerId, items) {
  if (!Array.isArray(items) || items.length === 0) {
    const error = new Error("Order items are required");
    error.statusCode = 400;
    throw error;
  }

  const validatedItems = [];

  for (const item of items) {
    if (!item.product || !Number.isInteger(item.quantity) ||
        item.quantity < 1) {
      const error = new Error("Invalid product or quantity");
      error.statusCode = 400;
      throw error;
    }

    const product = await Product.findById(item.product);

    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    validatedItems.push({
      product: product._id,
      quantity: item.quantity
    });
  }

  return Order.create({
    customer: customerId,
    items: validatedItems
  });
}

function findOrderByIdForCustomer(orderId, customerId){
  return Order.findOne({
    _id: orderId,
    customer: customerId
  }).populate("items.product");
}

function findOrdersByCustomer(customerId) {
  return Order.find({
    customer: customerId
  }).populate("items.product");
}

module.exports = {
    findOrderById, 
    findOrderByStatus, 
    createOrder,
    findOrderByIdForCustomer,
    findOrdersByCustomer
};