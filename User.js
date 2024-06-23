class User {
    constructor(fullName, email, password, phone) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.orders = [];
    }
}

export default User;
