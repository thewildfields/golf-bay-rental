const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signOut = () => {

    res.clearCookie('_auth', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    
    res.clearCookie('_auth_state', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    
    res.clearCookie('_auth_type', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });

    res.send('Sign Out Successfull')
    
}

module.exports = signOut;