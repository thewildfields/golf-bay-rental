import { useEffect, useState } from "react";
import axios from "axios";
import serverConnection from '../Settings/serverConnection';
import 'bootstrap/dist/css/bootstrap.css';
import StripePayment from "./Payments/StripePayment";

const BookingForm = ({venue}) => {

    // const {minimalBookingTime, additionalPeriodPrice, venueId} = props.venue;

    const [venueId, setVenueId] = useState(venue.venueId);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [guestsCount, setGuestsCount] = useState(1);
    const [bookingDuration, setBookingDuration] = useState(1);
    const [bookingPrice, setBookingPrice] = useState(venue.initialPeriodPrice);
    const [additionalPeriodPrice, setAdditionalPeriodPrice] = useState(venue.additionalPeriodPrice);
    const [bookingStep, setBookingStep] = useState('initial');
    const [newBookingId, setNewBookingId] = useState(0);

    useEffect(() => {
        setBookingPrice(venue.initialPeriodPrice);
        setVenueId(venue.venueId);
        setAdditionalPeriodPrice(venue.additionalPeriodPrice);
    }, [venue]);

    const handleBookingDurationChange = async e => {
        setBookingDuration(e.target.value);
        updateBookingPrice(e.target.value);
    }

    const updateBookingPrice = (newDuration) => {
        setBookingPrice(venue.initialPeriodPrice + (newDuration-1) * additionalPeriodPrice );
    }


    const handleSubmit = e => {
        e.preventDefault();
        if(!firstName || !lastName || !customerPhone || !date || !time || !guestsCount){
            console.log('Some data is missing');
            return;
        }
        const bookingData = {
            firstName: firstName,
            lastName: lastName,
            customerPhone: customerPhone,
            bookingDate: date,
            bookingTime: time,
            guestsCount: guestsCount,
            isPaid: false,
            venueId: venueId
        }
        console.log( bookingData)

        axios.post(serverConnection.api+'/booking',bookingData)
            .then(response => {
                console.log(response);
                setNewBookingId(response.data.booking._id);
                setBookingStep('payment');
            })
            .catch(err => console.error(err));

    }

    // useEffect(() => {
    //     const openingTimeFormatted = Math.floor(openingTime / 100) + (openingTime % 100) / 60;
    //     const closingTimeFormatted = Math.floor(closingTime / 100) + (closingTime % 100) / 60;
    //     let loopTime = openingTimeFormatted;
    //     let displayedTimeSlots = [];
    //     const bookingFrequencyFormatted = bookingFrequency / 60;
    //     while (loopTime <= closingTimeFormatted - minimalBookingTime) {
    //         const displayedTime = Math.floor(loopTime) * 100 + (loopTime % 1) * 60;
    //         displayedTimeSlots.push(displayedTime);
    //         setTimeSlots(timeSlots.push({displayedTime}));
    //         loopTime += bookingFrequencyFormatted;
    //     }
    // }, []);

    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col">                        
                        <form
                        className="gbrForm"
                        onSubmit={handleSubmit}
                        >
                            <div className="row mb-3">
                                <div className="col">
                                    <div className="gbrForm__group">
                                        <label htmlFor="booking-name" className="form-label">First Name</label>
                                        <input
                                            type="text"
                                            className="gbrForm__input form-control"
                                            id="booking-name"
                                            value={firstName}
                                            onChange={ e => setFirstName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="gbrForm__group">
                                        <label htmlFor="booking-name" className="form-label">Last Name</label>
                                        <input
                                            type="text"
                                            className="gbrForm__input form-control"
                                            id="booking-name"
                                            value={lastName}
                                            onChange={ e => setLastName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <div className="gbrForm__group">
                                        <label htmlFor="booking-phone" className="form-label">Phone</label>
                                        <input
                                            type="tel"
                                            className="gbrForm__input form-control"
                                            id="booking-phone"
                                            value={customerPhone}
                                            onChange={e => setCustomerPhone(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="gbrForm__group">
                                        <label htmlFor="booking-people" className="form-label">Number of People</label>
                                        <input
                                            type="number"
                                            min="1"
                                            className="gbrForm__input form-control"
                                            id="booking-people"
                                            value={guestsCount}
                                            onChange={e => setGuestsCount(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="gbrForm__group">
                                <label htmlFor="booking-date" className="form-label">Date</label>
                                <input
                                    type="date"
                                    className="gbrForm__input form-control"
                                    id="booking-date"
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="gbrForm__group">
                                <label htmlFor="booking-time" className="form-label">Time</label>
                                <input
                                    type="time"
                                    className="gbrForm__input form-control"
                                    id="booking-time"
                                    value={time}
                                    onChange={e => setTime(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="gbrForm__group">
                                <label htmlFor="booking-duration" className="form-label">Booking Duration, hours</label>
                                <input
                                    type="number"
                                    min={ 1 }
                                    className="gbrForm__input form-control"
                                    id="booking-duration"
                                    value={bookingDuration}
                                    onChange={handleBookingDurationChange}
                                    required
                                />
                            </div>
                            <h2>{`Price: ${bookingPrice}`}</h2>
                            <div className="gbrForm__group">
                                <input type="submit" className="gbrForm__input form-control gbrForm__input_submit" value="Continue" />
                            </div>
                        </form>
                    </div>
                    <div className="col">
                        { bookingStep === 'payment' && <StripePayment price={bookingPrice} bookingId={newBookingId} />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookingForm;