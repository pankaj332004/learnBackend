const { errorResponse } = require("../utils/apiResponse")

function errorHandler(err, req, res, next) {
    console.error(err.message);

    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err.status || 500;
    const message = statusCode === 500
        ? "Internal Server Error"
        : err.message;

    return res.status(statusCode).json(
        errorResponse(message)
    );
}

function notFound(req, res, next) {
    res.status(404).json({
        success: false,
        message: "Route not found",
        data: null
    });
}

module.exports = {
    errorHandler,
    notFound
};