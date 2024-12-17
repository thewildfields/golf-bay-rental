const User = require('../models/User');
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
    const { email, username, password } = req.body;
    const userExists = await User.find({email: email.toLowerCase()});
    if(userExists.length){
        console.log(userExists)
        res.send('User with this email already exists');
        return;
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        email: email.toLowerCase(),
        username: username,
        password: hashedPassword
    });

    newUser.save()
        .then( savedUser => res.send('New user created'))
        .catch( err => console.error(err));
}

module.exports = signUp;