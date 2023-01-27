class BaseResponse {
    constructor(
        success,
        status,
        content
    ) {
        this.success = success;
        this.status = status;
        this.content = content;
    }
}

class ResponseSuccess extends BaseResponse {
    constructor({
        status,
        content,
        message = "",
        url = "",
    }) {
        super(true, status, content)
        this.message = message;
        this.url = url;
    }
}

class ResponseError extends BaseResponse {
    constructor({
        status,
        message,
        reason = "",
        url = "",
        validationErrors = []
    }) {
        super(false, status, null)
        this.message = message;
        this.reason = reason;
        this.url = url;
        this.validationErrors = validationErrors;
    }
}

module.exports = {
    ResponseSuccess,
    ResponseError
}