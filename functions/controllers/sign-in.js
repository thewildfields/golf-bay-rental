const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const session = require("express-session");

const SECRET_KEY = "your_secret_key"; // Use a secure key in production

const signIn = async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({email: email});
  
    if (!user) return res.status(404).json({ message: "User not found" });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Invalid password" });

    
    // Generate JWT Token
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
    
    res.json({ message: "Login successful" , token: token });
}

module.exports = signIn;