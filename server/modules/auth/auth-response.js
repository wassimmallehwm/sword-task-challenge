module.exports.AuthResponse = class AuthResponse {
    constructor({
        user,
        access_token,
        refresh_token
    }) {
        this.user = user;
        this.access_token = access_token;
        this.refresh_token = refresh_token;
    }
}