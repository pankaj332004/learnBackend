const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

const swaggerUi = require("swagger-ui-express")
const cookieParser = require("cookie-parser")
const swaggerDocument = require("./docs/swagger.json")

const PORT = process.env.PORT || 3000;

const productRoutes = require("./routes/productRoute");
const orderRoutes = require("./routes/orderRoute");
const userRoutes = require("./routes/userRoutes");
const productV2Routes = require("./routes/productV2Route");
const authRoute = require("./routes/authRoute");
const sessionRoute = require("./routes/sessionRoute");
const cookieRoute = require("./routes/cookieRoute");
const jwtRoute = require("./routes/jwtRoute")

const {sessionMiddleware} = require("./middleware/session.middleware");
const { errorHandler, notFound } = require("./middleware/errorHandler");

app.use(express.json());
app.use(cookieParser());
app.use(sessionMiddleware);

app.get("/test-session", (req, res) => {
    req.session.testValue = "Session is working";

    res.json({
        success: true,
        sessionId: req.sessionID,
        sessionValue: req.session.testValue
    });
});

app.get("/check-session", (req, res) => {
    res.json({
        sessionId: req.sessionID,
        sessionValue: req.session.testValue || null
    });
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/products", productRoutes);
app.use("/api/v2/products", productV2Routes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/sessions", sessionRoute);
app.use("/api/v1/cookies", cookieRoute);
app.use("/api/v1/jwt", jwtRoute);

app.get("/test-error", (req, res, next) => {
    next(new Error("Something went wrong"));
});

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.use(notFound);

app.use(errorHandler);



mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });


app.listen(PORT,()=>{
    console.log(`App listening on the port ${PORT}`)
});