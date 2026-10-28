// const express = require("express");

// const app = express();

// const PORT = process.env.PORT || 3000;

// // app.use((req,res,next)=>{
// //     console.log("First");
// //     next();
// // })

// // app.use((req,res,next)=>{
// //     console.log("Second");
// //     next();
// // })

// function requestLogger(req,res,next){
//     console.log(`${req.method} ${req.url}`);
//     next();
// }

// function checkProductAccess(req,res,next){
//     console.log("Checking product access")
//     next();
// }

// function maintenanceNotice(req,res,next){
//     console.log("Product API request received")
//     next();
// }
// app.use(requestLogger);

// app.get("/",(req,res)=>{
//     res.send("Welcome to middleware");
// })

// const products = [
//     { id: 1, name: "Keyboard", price: 1200 },
//     { id: 2, name: "Mouse", price: 500 },
//     { id: 3, name: "Monitor", price: 8000 }
// ]

// app.use("/products", checkProductAccess, maintenanceNotice);
// app.get("/products", (req,res)=>{
//     res.json(products);
// })

// app.get("/products/:id", (req, res) => {
//     const id = Number(req.params.id);
//     if(!Number.isInteger(id) || id<=0){
//         return res.status(400).json({error: "Invalid ID"})
//     }
//     const product = products.find((title)=>title.id === id);
//     if(!product){
//         return res.status(404).json({error: "Product not found"});
//     }
//     res.json(product);
// });

// app.get("/about",(req,res)=>{
//     res.status(200).json({
//         "project": "Product Explorer",
//         "purpose": "Learning Express"
//     })
// })

// app.listen(PORT, ()=>{
//     console.log(`App is listening on the port ${PORT}`)
// })

const express = require("express");
const app = express();
 
const productRouter = express.Router();

productRouter.use((req,res,next)=>{
    console.log("Product router middleware");
    next();
})

productRouter.get("/",(req,res)=>{
    res.json([
        {id: 1, name: "Keyboard", price:1200},
        {id: 2, name: "Mouse", price: 500}
    ]);
});

productRouter.get("/:id", (req,res)=>{
    res.json({productId : req.params.id});
});

productRouter.get("/:id/reviews", (req, res) => {
  res.json({
    productId: req.params.id,
    reviews: ["Great product", "Good value"]
  });
});

app.use("/products", productRouter);

app.get("/",(req,res)=>{
    res.send("Welcome to Home Page");
})
app.listen(3000, ()=>{
    console.log("Server running on the port 3000");
});