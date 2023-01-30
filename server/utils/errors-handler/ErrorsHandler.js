class ErrorsHandler {
    constructor() {
    }

    static instance = new ErrorsHandler();

    handle = (err, trace = "") => {
        console.error(`${trace} => ${err}`)
        let required = false;
        let message = 'serverError';
        let status = 500;
        if (err.name === 'ValidationError') {
            for (field in err.errors) {
                if (err.errors[field].kind == 'required') {
                    required = true;
                }
            }
            message = required ? 'requiredError' : 'invalidError'
            status = 400;
        } else if ((err.name === 'MongoError' || err.name === 'MongoServerError') && err.code === 11000) {
            message = 'duplicateError'
            status = 409;
        } else if (err.name === 'SyntaxError') {
            message = 'syntaxError'
            status = 400;
        }
        return { status, message };
    }

}

module.exports = ErrorsHandler.instance;