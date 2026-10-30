
// const {
//     findProductById,
//     findProductsByName,
//     getAllProducts,
//     createProduct: createProductServices,
//     updateProduct,
//     patchProduct,
//     deleteProduct,
//     getProductsWithOptions,
//     increaseProductPrice
// } = require("../services/productService");

// const{
//     successResponse,
//     errorResponse
// } = require("../utils/apiResponse")

// function getProductById(req,res){
//     const id = Number(req.params.id);

//     if(!Number.isInteger(id) || id<=0){
//         return res.status(400).json(
//             errorResponse("Invalid product ID")
//         );
//     }

//     const product = findProductById(id);

//     if(!product){
//         return res.status(404).json(
//             errorResponse("Product not found")
//         );
//     }

//     return res.status(200).json(
//          successResponse("Product retrieved successfully", product)
//     );
// }

// function getProductsByName(req,res){
//     const name = req.params.name;
//     const product = findProductsByName(name);

//     res.status(200).json(
//         successResponse("Products retrieved successfully",product)
//     )
// }

// function createProduct(req,res){
//     const {name, price} = req.body;

//     if(typeof name !== "string" || name.trim() === ""){
//         return res.status(400).json(
//             errorResponse("Product name is required")
//         );
//     }

//     if(typeof price !== "number" || !Number.isFinite(price) || price <= 0){
//         return res.status(400).json(
//             errorResponse("Price must be positive number")
//         );
//     }

//     const product = createProductServices(name.trim(), price);

//     return res.status(201).json(
//         successResponse("Product created successfully", product)
//     );
// }

// function getAllProductsController(req,res){
//     const products = getAllProducts();

//     return res.status(200).json(
//         successResponse("Products retrieved successfully", products)
//     );
// }


// function updateProductController(req, res) {
//     const id = Number(req.params.id);
//     const { name, price } = req.body;

//     if (!Number.isInteger(id) || id <= 0) {
//         return res.status(400).json(
//             errorResponse("Invalid product ID")
//         );
//     }

//     if (typeof name !== "string" || name.trim() === "") {
//         return res.status(400).json(
//             errorResponse("Product name is required")
//         );
//     }

//     if (
//         typeof price !== "number" ||
//         !Number.isFinite(price) ||
//         price <= 0
//     ) {
//         return res.status(400).json(
//             errorResponse("Price must be a positive number")
//         );
//     }

//     const product = updateProduct(id, name.trim(), price);

//     if (!product) {
//         return res.status(404).json(
//             errorResponse("Product not found")
//         );
//     }

//     return res.status(200).json(
//         successResponse("Product updated successfully", product)
//     );
// }

// function patchProductController(req,res){
//     const id = Number(req.params.id);
//     const {name, price} = req.body;

//     if(!Number.isInteger(id) || id<=0){
//         return res.status(400).json(
//             errorResponse("Invalid product ID")
//         )
//     }

//     if(name===undefined && price === undefined){
//         return res.status(400).json(
//             errorResponse("Provide at leas one field to update")
//         );
//     }

//     if(name !== undefined && (typeof name !== "string" || name.trim() === "")){
//         return res.status(400).json(
//             errorResponse("Product name must be a non-empty string")
//         );
//     }

//     if(price !== undefined && (typeof price !== "number" || !Number.isFinite(price) || price<=0)){
//         return res.status(400).json(
//             errorResponse("Price must be positive number")
//         );
//     }

//     const updates = {};

//     if (name !== undefined) {
//         updates.name = name.trim();
//     }

//     if (price !== undefined) {
//         updates.price = price;
//     }

//     const product = patchProduct(id, updates);

//     if (!product) {
//         return res.status(404).json(
//             errorResponse("Product not found")
//         );
//     }

//     return res.status(200).json(
//         successResponse("Product updated successfully", product)
//     );
// }


// function deleteProductController(req, res) {
//     const id = Number(req.params.id);

//     if (!Number.isInteger(id) || id <= 0) {
//         return res.status(400).json(
//             errorResponse("Invalid product ID")
//         );
//     }

//     const product = deleteProduct(id);

//     if (!product) {
//         return res.status(404).json(
//             errorResponse("Product not found")
//         );
//     }

//     return res.status(200).json(
//         successResponse("Product deleted successfully", product)
//     );
// }

// function getProductsWithOptionsController(req,res,next){
//     try{
//         const options ={
//             minPrice: req.query.minPrice !== undefined 
//                 ? Number(req.query.minPrice)
//                 :undefined,
//             maxPrice: req.query.maxPrice !== undefined
//                 ? Number(req.query.maxPrice)
//                 : undefined,
//             name: req.query.name,
//             sort: req.query.sort,
//             page: req.query.page,
//             limit: req.query.limit,
            
//         };

//         const result = getProductsWithOptions(options);

//         return res.status(200).json({
//             success: true,
//             message: "Products retrieved successfully",
//             data: result.products,
//             pagination: result.pagination
//         });
//     }
//     catch(err){
//         next(err);
//     }
// }

// function increaseProductPriceController(req, res, next) {
//     try {
//         const id = Number(req.params.id);
//         const amount = 1000;

//         const product = increaseProductPrice(id, amount);

//         if (!product) {
//             const error = new Error("Product not found");
//             error.status = 404;
//             throw error;
//         }

//         return res.status(200).json({
//             success: true,
//             message: "Product price increased successfully",
//             data: product
//         });
//     } catch (error) {
//         next(error);
//     }
// }


// module.exports = {
//     getProductById, 
//     getProductsByName, 
//     createProduct,
//     getAllProductsController,
//     updateProductController,
//     patchProductController,
//     deleteProductController,
//     getProductsWithOptionsController,
//     increaseProductPriceController
// };

const mongoose = require("mongoose");

const {
    findProductById,
    findProductsByName,
    getAllProducts,
    createProduct: createProductService,
    updateProduct,
    patchProduct,
    deleteProduct,
    getProductsWithOptions,
    increaseProductPrice
} = require("../services/productService");

const {
    successResponse,
    errorResponse
} = require("../utils/apiResponse");

// 1. GET product by ID
async function getProductById(req, res, next) {
    try {
        // const id = Number(req.params.id);
        const id = req.params.id;

        // if (!Number.isInteger(id) || id <= 0) {
        //     return res.status(400).json(
        //         errorResponse("Invalid product ID")
        //     );
        // }
        
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json(
                errorResponse("Invalid product ID")
            );
        }

        const product = await findProductById(id);

        if (!product) {
            return res.status(404).json(
                errorResponse("Product not found")
            );
        }

        return res.status(200).json(
            successResponse("Product retrieved successfully", product)
        );
    } catch (error) {
        next(error);
    }
}

// 2. GET products by name
async function getProductsByName(req, res, next) {
    try {
        const name = req.params.name;

        if (!name || name.trim() === "") {
            return res.status(400).json(
                errorResponse("Product name is required")
            );
        }

        const products = await findProductsByName(name.trim());

        return res.status(200).json(
            successResponse("Products retrieved successfully", products)
        );
    } catch (error) {
        next(error);
    }
}

// 3. CREATE a product
async function createProduct(req, res, next) {
    try {
        const { name, price } = req.body;

        if (typeof name !== "string" || name.trim() === "") {
            return res.status(400).json(
                errorResponse("Product name is required")
            );
        }

        if (
            typeof price !== "number" ||
            !Number.isFinite(price) ||
            price <= 0
        ) {
            return res.status(400).json(
                errorResponse("Price must be a positive number")
            );
        }

        const product = await createProductService(name.trim(), price);

        return res.status(201).json(
            successResponse("Product created successfully", product)
        );
    } catch (error) {
        next(error);
    }
}

// 4. GET all products
async function getAllProductsController(req, res, next) {
    try {
        const products = await getAllProducts();

        return res.status(200).json(
            successResponse("Products retrieved successfully", products)
        );
    } catch (error) {
        next(error);
    }
}

// 5. PUT - replace product name and price
async function updateProductController(req, res, next) {
    try {
        // const id = Number(req.params.id);
        const id = req.params.id;
        const { name, price } = req.body;

        // if (!Number.isInteger(id) || id <= 0) {
        //     return res.status(400).json(
        //         errorResponse("Invalid product ID")
        //     );
        // }
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json(
                errorResponse("Invalid product ID")
            );
        }

        if (typeof name !== "string" || name.trim() === "") {
            return res.status(400).json(
                errorResponse("Product name is required")
            );
        }

        if (
            typeof price !== "number" ||
            !Number.isFinite(price) ||
            price <= 0
        ) {
            return res.status(400).json(
                errorResponse("Price must be a positive number")
            );
        }

        const product = await updateProduct(id, name.trim(), price);

        if (!product) {
            return res.status(404).json(
                errorResponse("Product not found")
            );
        }

        return res.status(200).json(
            successResponse("Product updated successfully", product)
        );
    } catch (error) {
        next(error);
    }
}

// 6. PATCH - update selected fields
async function patchProductController(req, res, next) {
    try {
        // const id = Number(req.params.id);
        const id = req.params.id;
        const { name, price } = req.body;

        // if (!Number.isInteger(id) || id <= 0) {
        //     return res.status(400).json(
        //         errorResponse("Invalid product ID")
        //     );
        // }

        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json(
                errorResponse("Invalid product ID")
            );
        }

        if (name === undefined && price === undefined) {
            return res.status(400).json(
                errorResponse("Provide at least one field to update")
            );
        }

        if (
            name !== undefined &&
            (typeof name !== "string" || name.trim() === "")
        ) {
            return res.status(400).json(
                errorResponse("Product name must be a non-empty string")
            );
        }

        if (
            price !== undefined &&
            (
                typeof price !== "number" ||
                !Number.isFinite(price) ||
                price <= 0
            )
        ) {
            return res.status(400).json(
                errorResponse("Price must be a positive number")
            );
        }

        const updates = {};

        if (name !== undefined) {
            updates.name = name.trim();
        }

        if (price !== undefined) {
            updates.price = price;
        }

        const product = await patchProduct(id, updates);

        if (!product) {
            return res.status(404).json(
                errorResponse("Product not found")
            );
        }

        return res.status(200).json(
            successResponse("Product updated successfully", product)
        );
    } catch (error) {
        next(error);
    }
}

// 7. DELETE a product
async function deleteProductController(req, res, next) {
    try {
        // const id = Number(req.params.id);
        const id = req.params.id;

        // if (!Number.isInteger(id) || id <= 0) {
        //     return res.status(400).json(
        //         errorResponse("Invalid product ID")
        //     );
        // }
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json(
                errorResponse("Invalid product ID")
            );
        }

        // const product = await deleteProduct(id);
        const product = await deleteProduct(id);

        if (!product) {
            return res.status(404).json(
                errorResponse("Product not found")
            );
        }

        return res.status(200).json(
            successResponse("Product deleted successfully", product)
        );
    } catch (error) {
        next(error);
    }
}

// 8. GET products with filters, sorting and pagination
async function getProductsWithOptionsController(req, res, next) {
    try {
        const options = {
            minPrice: req.query.minPrice !== undefined
                ? Number(req.query.minPrice)
                : undefined,

            maxPrice: req.query.maxPrice !== undefined
                ? Number(req.query.maxPrice)
                : undefined,

            name: req.query.name,
            sort: req.query.sort,

            page: req.query.page !== undefined
                ? Number(req.query.page)
                : 1,

            limit: req.query.limit !== undefined
                ? Number(req.query.limit)
                : 10
        };

        // Reject empty or non-numeric price query values.
        for (const key of ["minPrice", "maxPrice"]) {
            if (
                req.query[key] !== undefined &&
                (
                    req.query[key].trim() === "" ||
                    !Number.isFinite(options[key])
                )
            ) {
                return res.status(400).json(
                    errorResponse(`${key} must be a valid number`)
                );
            }
        }

        const result = await getProductsWithOptions(options);

        return res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: result.products,
            pagination: result.pagination
        });
    } catch (error) {
        next(error);
    }
}

// 9. Increase a product's price by 1000
async function increaseProductPriceController(req, res, next) {
    try {
        // const id = Number(req.params.id);
        const id = req.params.id;

        // if (!Number.isInteger(id) || id <= 0) {
        //     return res.status(400).json(
        //         errorResponse("Invalid product ID")
        //     );
        // }
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json(
                errorResponse("Invalid product Id")
            );
        }

        const amount = 1000;
        const product = await increaseProductPrice(id, amount);

        if (!product) {
            return res.status(404).json(
                errorResponse("Product not found")
            );
        }

        return res.status(200).json(
            successResponse(
                "Product price increased successfully",
                product
            )
        );
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getProductById,
    getProductsByName,
    createProduct,
    getAllProductsController,
    updateProductController,
    patchProductController,
    deleteProductController,
    getProductsWithOptionsController,
    increaseProductPriceController
};
