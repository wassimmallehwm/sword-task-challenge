class PermissionsHandler {
    instance;
    MANAGER = "Manager"
    TECHNICIAN = "Technician"

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
        return user && user.role && user.role == this.MANAGER;
    }

    isTechnician = (user) => {
        return user && user.role && user.role == this.TECHNICIAN;
    }

}

module.exports = PermissionsHandler.getInstance();