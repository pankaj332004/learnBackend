// const products = [
//     { id: 1, name: "Laptop", price: 50000 },
//     { id: 2, name: "Mobile", price: 10000 },
//     { id: 3, name: "Tablet", price: 15000 },
//     { id: 4, name: "Keyboard", price: 1500 },
//     { id: 5, name: "Mouse", price: 500 },
//     { id: 6, name: "Monitor", price: 12000 },
//     { id: 7, name: "Headphones", price: 2000 },
//     { id: 8, name: "Charger", price: 800 },
//     { id: 9, name: "Smartwatch", price: 5000 },
//     { id: 10, name: "Speaker", price: 3000 },
//     { id: 11, name: "Webcam", price: 2500 },
//     { id: 12, name: "Printer", price: 8000 },
//     { id: 13, name: "Power Bank", price: 1800 },
//     { id: 14, name: "USB Cable", price: 300 },
//     { id: 15, name: "External SSD", price: 7000 }
// ];

// function findProductById(id){
//     return products.find((product)=> product.id === id);
// }

// function findProductsByName(name){
//     return products.filter((product) => product.name === name);
// }

// function getAllProducts(){
//     return products;
// }

// function updateProduct(id, name, price){
//     const product = products.find(product => product.id === id);
//     if(!product){
//         return null;
//     }

//     product.name = name;
//     product.price = price;
//     return  product;
// }

// function createProduct(name, price){
//     const maxId = Math.max(0, ...products.map(product => product.id));
//     const newId = maxId+1;
//     const newProduct = {
//         id: newId,
//         name: name,
//         price: price
//     };
//     products.push(newProduct);
//     return newProduct;
// }

// function patchProduct(id, updates){
//     const product = products.find(product => product.id === id);

//     if(!product){
//         return null;
//     }

//     if(updates.name !== undefined){
//         product.name = updates.name;
//     }

//     if(updates.price !== undefined){
//         product.price = updates.price
//     }

//     return product;
// }

// function deleteProduct(id){
//     const index = products.findIndex(product => product.id === id);

//     if(index === -1){
//         return null;
//     }

//     const deletedProduct = products.splice(index,1);

//     return deletedProduct[0];
// }

// function getProductsWithOptions(options) {
//     let result = [...products];

//      if (
//         options.minPrice !== undefined &&
//         options.maxPrice !== undefined &&
//         options.minPrice > options.maxPrice
//     ) {
//         const error = new Error(
//             "Minimum price cannot be greater than maximum price"
//         );

//         error.status = 400;
//         throw error;
//     } 

//     // 1. Filter by minimum price
//     if (options.minPrice !== undefined) {
//         result = result.filter(
//             value => value.price >= options.minPrice
//         );
//     }
//     // 2. Filter by maximum price
//     if (options.maxPrice !== undefined) {
//         result = result.filter(
//             value => value.price <= options.maxPrice
//         );
//     }

//     // 3. Search by product name
//     if (options.name !== undefined && options.name !== "") {
//         result = result.filter(value =>
//             value.name.toLowerCase().includes(
//                 options.name.toLowerCase()
//             )
//         );
//     }

//     if (
//         options.sort !== undefined &&
//         options.sort !== "asc" &&
//         options.sort !== "desc"
//     ) {
//         const error = new Error(
//             "Invalid sort value. Use 'asc' or 'desc'"
//         );

//         error.status = 400;
//         throw error;
//     }

//     // 4. Sort by price
//     if (options.sort === "asc") {
//         result.sort((a, b) => a.price - b.price);
//     } else if (options.sort === "desc") {
//         result.sort((a, b) => b.price - a.price);
//     }

    
//     // 5. Pagination

//     const page = options.page === undefined
//         ? 1
//         : Number(options.page);

//     const limit = options.limit === undefined
//         ? 10
//         : Number(options.limit);

//     if (!Number.isInteger(page) || page < 1) {
//         const error = new Error("Page must be a positive integer");
//         error.status = 400;
//         throw error;
//     }

//     if (!Number.isInteger(limit) || limit < 1) {
//         const error = new Error("Limit must be a positive integer");
//         error.status = 400;
//         throw error;
//     }

//     const totalItems = result.length;
//     const offset = (page - 1) * limit;

//     const paginatedProducts = result.slice(
//         offset,
//         offset + limit
//     );

//     return {
//         products: paginatedProducts,
//         pagination: {
//             page,
//             limit,
//             totalItems,
//             totalPages: Math.ceil(totalItems / limit)
//         }
//     };
// }

// function increaseProductPrice(id, amount) {
//     const product = products.find(product => product.id === id);

//     if (!product) {
//         return null;
//     }

//     product.price = product.price + amount;

//     return product;
// }

// module.exports = {
//     findProductById, 
//     findProductsByName,
//     getAllProducts,
//     createProduct,
//     updateProduct,
//     patchProduct,
//     deleteProduct,
//     getProductsWithOptions,
//     increaseProductPrice
// };


const Product = require("../models/product");

async function findProductById(id) {
    // return Product.findOne({ id });
    return Product.findById(id)
}

async function findProductsByName(name) {
    return Product.find({ name });
}

async function getAllProducts() {
    return Product.find();
}

async function createProduct(sellerId, name, price) {
    // Suitable for this local learning project.
    // Concurrent production requests need a safer ID-generation strategy.
    const lastProduct = await Product.findOne().sort({ id: -1 });
    const newId = lastProduct ? lastProduct.id + 1 : 1;

    return Product.create({
        seller: sellerId,
        id: newId,
        name,
        price
    });
}

async function updateProduct(id, name, price, sellerId) {
    // return Product.findOneAndUpdate(
    //     { id },
    //     { name, price },
    //     { new: true, runValidators: true }
    // );
    return Product.findOneAndUpdate(
        {
            _id: id,
            seller: sellerId
        },
        {
            $set: { name, price }
        },
        {
            new: true,
            runValidators: true
        }
    );
}

// async function patchProduct(id, updates) {
//     return Product.findOneAndUpdate(
//         { id },
//         { $set: updates },
//         { new: true, runValidators: true }
//     );
// }
async function patchProduct(id, updates, sellerId){
    return Product.findOneAndUpdate(
        {
            _id: id,
            seller: sellerId
        },
        {
            $set:updates
        },
        {
            new:true, 
            runValidators:true
        }
    )
}

// async function deleteProduct(id) {
//     return Product.findOneAndDelete({ id });
// }

async function deleteProduct(id,sellerId){
    return Product.findOneAndDelete(
        {
            _id: id,
            seller: sellerId
        }
    );
}

async function getProductsWithOptions(options) {
    const {
        minPrice,
        maxPrice,
        name,
        sort,
        page = 1,
        limit = 10
    } = options;

    if (
        minPrice !== undefined &&
        maxPrice !== undefined &&
        minPrice > maxPrice
    ) {
        const error = new Error(
            "Minimum price cannot be greater than maximum price"
        );
        error.status = 400;
        throw error;
    }

    if (
        sort !== undefined &&
        sort !== "asc" &&
        sort !== "desc"
    ) {
        const error = new Error(
            "Invalid sort value. Use 'asc' or 'desc'"
        );
        error.status = 400;
        throw error;
    }

    if (!Number.isInteger(page) || page < 1) {
        const error = new Error("Page must be a positive integer");
        error.status = 400;
        throw error;
    }

    if (!Number.isInteger(limit) || limit < 1) {
        const error = new Error("Limit must be a positive integer");
        error.status = 400;
        throw error;
    }

    const filter = {};

    if (minPrice !== undefined) {
        filter.price = {
            ...filter.price,
            $gte: minPrice
        };
    }

    if (maxPrice !== undefined) {
        filter.price = {
            ...filter.price,
            $lte: maxPrice
        };
    }

    if (name && name.trim() !== "") {
        filter.name = {
            $regex: name.trim(),
            $options: "i"
        };
    }

    const sortOption =
        sort === "asc"
            ? { price: 1 }
            : sort === "desc"
                ? { price: -1 }
                : {};

    const totalItems = await Product.countDocuments(filter);

    const products = await Product.find(filter)
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(limit);

    return {
        products,
        pagination: {
            page,
            limit,
            totalItems,
            totalPages: Math.ceil(totalItems / limit)
        }
    };
}

async function increaseProductPrice(id, amount, sellerId) {
    // return Product.findOneAndUpdate(
    //     { id },
    //     { $inc: { price: amount } },
    //     { new: true, runValidators: true }
    // );
    return Product.findOneAndUpdate(
        {
            _id: id,
            seller: sellerId
        },
        {
            $inc: {price: amount} 
        },
        {
            new: true, 
            runValidators: true
        }
    );
}

module.exports = {
    findProductById,
    findProductsByName,
    getAllProducts,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct,
    getProductsWithOptions,
    increaseProductPrice
};
