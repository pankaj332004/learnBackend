function successResponse(message, data){
    return {
        success: true,
        message,
        data
    };
}

function errorResponse(message){
    return {
        success: false,
        message,
        data: null
    };
}

module.exports ={
    successResponse,
    errorResponse
};