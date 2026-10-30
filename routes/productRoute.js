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

const requirePermission =
  require("../middleware/permissionMiddleware");

const {
    authenticateUser,
    requireAdmin
} = require("../middleware/authMiddleware");

route.get("/options", getProductsWithOptionsController);
route.get("/",getAllProductsController);
route.get("/:id", getProductById);
route.get("/name/:name",getProductsByName);

route.post("/", 
    authenticateUser,
    requirePermission("product:create"),
    createProduct
);

route.post(
    "/:id/increase-price",
    authenticateUser,
    requirePermission("product:update"),
    increaseProductPriceController
);

route.put("/:id", 
    authenticateUser,
    requirePermission("product:update"),
    updateProductController
);

route.patch("/:id",
    authenticateUser,
    requirePermission("product:update"),
    patchProductController
);

route.delete(
    "/:id",
    authenticateUser,
    requireAdmin,
    requirePermission("product:delete"),
    deleteProductController
);

module.exports = route