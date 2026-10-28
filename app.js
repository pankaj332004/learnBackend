
const express = require("express");
const app = express();

const PORT = 3000;

const products = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Phone" }
  ]
// GET: retrieve data
app.get("/products", (req, res) => {
  res.json(products);
});

// POST: create a resource
app.post("/products", (req, res) => {
  res.status(201).json({
    message: "Product creation requested"
  });
});

// to get or retrive the particular id and product 
app.get("/products/:id", (req,res)=>{

    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id<=0){
        return res.status(400).json({error: "Invalid product ID"});
    }

    const product =  products.find((item)=> item.id === id);

    if(!product){
      return res.status(404).json({
        error: "Product not found"
      });
    }

    res.status(200).json(product);
})

// PUT: replace a resource
app.put("/products/:id", (req, res) => {
  res.json({
    message: `Replace product ${req.params.id}`
  });
});

// PATCH: partially update a resource
app.patch("/products/:id", (req, res) => {
  res.json({
    message: `Update part of product ${req.params.id}`
  });
});

// DELETE: delete a resource
app.delete("/products/:id", (req, res) => {
  res.json({
    message: `Delete product ${req.params.id}`
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
