
const mongoose = require("mongoose");
const Product = require("./models/product");

async function testProduct() {
    try {
        await mongoose.connect(
            "mongodb://127.0.0.1:27017/learnbackend"
        );

        const product = await Product.create({
            name: "Keyboard",
            price: 1500,
            category: "Accessories"
        });

        console.log("Product saved:", product);

    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

testProduct();
