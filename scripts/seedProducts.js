
const mongoose = require("mongoose");
const Product = require("../models/product");

const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mobile", price: 10000 },
    { id: 3, name: "Tablet", price: 15000 },
    { id: 4, name: "Keyboard", price: 1500 },
    { id: 5, name: "Mouse", price: 500 },
    { id: 6, name: "Monitor", price: 12000 },
    { id: 7, name: "Headphones", price: 2000 },
    { id: 8, name: "Charger", price: 800 },
    { id: 9, name: "Smartwatch", price: 5000 },
    { id: 10, name: "Speaker", price: 3000 },
    { id: 11, name: "Webcam", price: 2500 },
    { id: 12, name: "Printer", price: 8000 },
    { id: 13, name: "Power Bank", price: 1800 },
    { id: 14, name: "USB Cable", price: 300 },
    { id: 15, name: "External SSD", price: 7000 }
];

async function seedProducts() {
    try {
        await mongoose.connect(
            "mongodb://127.0.0.1:27017/learnbackend"
        );

        for (const product of products) {
            await Product.updateOne(
                { id: product.id },
                { $set: product },
                { upsert: true, runValidators: true }
            );
        }

        console.log("Products seeded successfully!");
        console.log("Total products processed:", products.length);
    } catch (error) {
        console.error("Seeding failed:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

seedProducts();
