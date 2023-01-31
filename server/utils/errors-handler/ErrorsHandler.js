const { SERVER_ERROR, INVALID_DATA, REQUIRED_DATA, DUPLICATED_DATA } = require("../../constants");

class ErrorsHandler {
    constructor() {
    }

    static instance = new ErrorsHandler();

    handle = (err, trace = "") => {
        console.error(`${trace} => ${err}`)
        let required = false;
        let message = SERVER_ERROR;
        let status = 500;
        if (err.name === 'ValidationError') {
            for (field in err.errors) {
                if (err.errors[field].kind == 'required') {
                    required = true;
                }
            }
            message = required ? REQUIRED_DATA : INVALID_DATA
            status = 400;
        } else if ((err.name === 'MongoError' || err.name === 'MongoServerError') && err.code === 11000) {
            message = DUPLICATED_DATA
            status = 409;
        }
        return { status, message };
    }

}

module.exports = ErrorsHandler.instance;