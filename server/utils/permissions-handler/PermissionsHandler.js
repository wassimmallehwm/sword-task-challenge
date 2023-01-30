const { MANAGER, TECHNICIAN } = require("../../constants");

class PermissionsHandler {
    constructor() {
    }

    static instance = new PermissionsHandler();

    isManager = (user) => {
        return user && user.role && user.role == MANAGER;
    }

    isTechnician = (user) => {
        return user && user.role && user.role == TECHNICIAN;
    }

}

module.exports = PermissionsHandler.instance;