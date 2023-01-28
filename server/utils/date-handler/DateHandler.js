const moment = require("moment");

class DateHandler {
    instance;

    constructor() {
    }

    static createInstance() {
        return new DateHandler()
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = this.createInstance()
        }
        return this.instance
    }

    formatDateTime = (date) => {
        return moment(date).format('MMMM Do YYYY, h:mm a')
    }
}

module.exports = DateHandler.getInstance();