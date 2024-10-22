class User {
    constructor(user)
    {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.wallet = user.wallet.toFixed(2);
        this.credits = user.credits;
        this.country = user.country;
        this.city = user.city;
        this.isAdmin = user.isAdmin;
        this.isActive = user.isActive;
        this.joined = user.joined ? user.joined : Date.now(); 
    }

    UpdateWallet(value)
    {
        this.wallet = value;
    }
}

export default User;