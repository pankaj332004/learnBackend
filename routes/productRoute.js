const express = require("express");

const route = express.Router();

const {
    getProductById,
    getProductsByName,
    createProduct,
    getAllProductsController,
    updateProductController,
    patchProductController,
    deleteProductController,
    getProductsWithOptionsController,
    increaseProductPriceController
} = require("../controllers/productController");

const {
    authenticateUser,
    requireAdmin
} = require("../middleware/authMiddleware");

route.get("/options", getProductsWithOptionsController);
route.get("/",getAllProductsController);
route.get("/:id", getProductById);
route.get("/name/:name",getProductsByName);

route.post("/", createProduct);
route.post(
    "/:id/increase-price",
    increaseProductPriceController
);

route.put("/:id", updateProductController);

route.patch("/:id", patchProductController);

route.delete(
    "/:id",
    authenticateUser,
    requireAdmin,
    deleteProductController
);

module.exports = route