const moment = require("moment");

class DateHandler {
    
    constructor() {
    }

    static instance = new DateHandler();

    formatDateTime = (date) => {
        return moment(date).format('MMMM Do YYYY, h:mm a')
    }
}

module.exports = DateHandler.instance;