module.exports = class UserDto {
    constructor({
        _id,
        username,
        firstname,
        lastname,
        email,
        role,
        createdAt
    }) {
        this.id = _id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.displayName = `${firstname} ${lastname}`;
        this.email = email;
        this.role = role;
        this.createdAt = createdAt;
    }
}