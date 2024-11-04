
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require("express-session");

const customerRouter = require('./routes/customer');
const customersRouter = require('./routes/customers');
const bookingRouter = require('./routes/booking');
const venueRouter = require('./routes/venue');
const venuesRouter = require('./routes/venues');
const bookingsRouter = require('./routes/bookings');
const authRouter = require('./routes/auth');
const paymentRouter = require('./routes/payment');
const userRouter = require('./routes/user');
const roleRouter = require('./routes/role');
const rolesRouter = require('./routes/roles');
const capabilitiesRouter = require('./routes/capabilities');
const capabilityRouter = require('./routes/capability');
const kioskRouter = require('./routes/kiosk');
 
const app = new express();
const PORT = 8080;

const allowedOrigins = ['https://golf-bay-rental.web.app', 'http://localhost:5173'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(
  session({
    secret: "session_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
  })
);

mongoose.connect('mongodb+srv://oleksii:0mVxbsWJuZF2xvyf@main.qi8ve8h.mongodb.net/GolfBayRentals');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

app.use('/booking', bookingRouter);
app.use('/bookings', bookingsRouter);
app.use('/venue', venueRouter);
app.use('/venues', venuesRouter);
app.use('/customer', customerRouter);
app.use('/customers', customersRouter);
app.use('/auth', authRouter);
app.use('/payment', paymentRouter);
app.use('/user', userRouter);
app.use('/role', roleRouter)
app.use('/roles', rolesRouter)
app.use('/capabilities', capabilitiesRouter)
app.use('/capability', capabilityRouter)
app.use('/kiosk', kioskRouter)

module.exports = app;