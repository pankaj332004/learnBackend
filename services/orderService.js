const orders =[
    {id: 1, item: "Laptop", status: "shipped"},
    {id: 2, item: "Phone", status: "Processing"},
    {id: 3, item: "Tablet", status: "Delivered"}
];

function findOrderById(id){
    return orders.find((order) => order.id === id);
}

function findOrderByStatus(status){
    return orders.filter((order) => order.status === status);
}

module.exports = {findOrderById, findOrderByStatus};