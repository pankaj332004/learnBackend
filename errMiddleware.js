const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
function requestLogger(req, res, next){
    console.log(`${req.method} ${req.url}`);
    next();
}
app.use("/" , requestLogger);

const products =[
    {id: 1, name: "Laptop"},
    {id: 2, name: "mobile"},
    {id: 3, name: "tablet"}
]

app.get("/products/:id", (req,res,next) =>{
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id<=0){
        const err = new Error("Product ID must be a positive integer");
        err.status = 400;
        return next(err);
    }
    const product = products.find((product)=> product.id === id);
    if(!product){
        const err = new Error("Product Not found");
        err.status = 404;
        return next(err);
    }
    res.json(product);
});

app.get("/products/:id/reviews",(req,res,next)=>{
    const id = Number(req.params.id);
    if(!Number.isInteger(id) || id<=0){
        const err = new Error("ID must be the positive Integer");
        err.status = 400;
        return next(err);
    }
    const product = products.find((product)=> product.id === id);
    if(!product){
        const err = new Error("Product not Found");
        err.status = 404;
        return next(err);
    }
    res.json({
        "productId": id,
        "reviews": ["Good Product", "Worth the price"]
    });
})

// This is one handler but the question for two handler
// app.get("/products/:id/details", (req,res)=>{
//     const productId = Number(req.params.id);
//     if(!Number.isInteger(productId) || productId <=0){
//         return res.status(400).json({
//             error : "Invalid product ID"
//         })
//     }
//     const product = products.find((product)=> product.id === productId);
//     if(!product){
//         return res.status(404).json({
//             error: "Product not found"
//         })
//     }
//     res.json(product);
// })

app.get(
    "/products/:id/details",

    // Handler 1: Validate and prepare the ID
    (req, res, next) => {
        const productId = Number(req.params.id);

        if (!Number.isInteger(productId) || productId <= 0) {
            return res.status(400).json({
                error: "Invalid product ID"
            });
        }

        req.productId = productId;
        next();
    },

    // Handler 2: Find and return the product
    (req, res) => {
        const product = products.find(
            product => product.id === req.productId
        );

        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        res.json(product);
    }
);

// Route Handler 
const orders = [
    { id: 1, item: "Laptop", status: "Shipped" },
    { id: 2, item: "Phone", status: "Processing" },
    { id: 3, item: "Tablet", status: "Delivered" }
];

app.get("/orders/:id/status", 
    (req,res,next)=>{
    const orderId = Number(req.params.id);
    if(!Number.isInteger(orderId) || orderId<=0){
        return res.status(400).json({
            Error: "Invalid order Id"
        })
    }
    req.orderId = orderId;
    next();
},
(req,res,next)=>{
    const order = orders.find((order)=> order.id === req.orderId);
    if(!order){
        return res.status(404).json({
            error: "Order not found"
        })
    }
    req.order = order;
    next();
},
(req,res)=>{
    res.json({
        orderId: req.order.id,
        status: req.order.status
    });
});

app.use((err,req,res,next) =>{
    console.error(err.message);

    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error"
    });
});

app.listen(PORT, ()=>{
    console.log(`App is listening on the port ${PORT}`);
})