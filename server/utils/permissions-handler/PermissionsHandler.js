const { MANAGER, TECHNICIAN } = require("../../constants");

class PermissionsHandler {
    instance;

    constructor() {
    }

    static createInstance() {
        return new PermissionsHandler()
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = this.createInstance()
        }
        return this.instance
    }

    isManager = (user) => {
        return user && user.role && user.role == MANAGER;
    }

    isTechnician = (user) => {
        return user && user.role && user.role == TECHNICIAN;
    }

}

module.exports = PermissionsHandler.getInstance();