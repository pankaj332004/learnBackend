
const express = require("express");
const router = express.Router();

const { getAllProducts } = require("../services/productService");
const { successResponse } = require("../utils/apiResponse");

router.get("/", (req, res) => {
    const products = getAllProducts();

    const updatedProducts = products.map(product => ({
        ...product,
        inStock: true
    }));

    return res.status(200).json(
        successResponse(
            "Products retrieved successfully",
            updatedProducts
        )
    );
});

module.exports = router;
