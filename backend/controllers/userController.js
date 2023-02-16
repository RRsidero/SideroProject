const registerUser = async (req, res) => {
    if (!req.body.email) {
        res.status(400)
        throw new Error("Email is Required");
    }
    if (!req.body.username) {
        res.status(400)
        throw new Error("Username is Required");
    }
    if (!req.body.password) {
        res.status(400)
        throw new Error("Password is Required");
    }
    res.send("User Registered")
};

module.exports = {
    registerUser
}