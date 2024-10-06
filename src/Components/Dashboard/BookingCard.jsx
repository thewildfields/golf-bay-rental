import axios from "axios";
import { useEffect, useState } from "react";
import serverConnection from "../../Settings/serverConnection";

const BookingCard = (props) => {

    const [booking] = useState(props && props.booking || {});
    const [customer, setCustomer] = useState({})
    const [venue, setVenue] = useState({})

    useEffect( () => {
        axios.get(serverConnection.api+`/customer/${booking.customerId}`)
            .then( response => setCustomer(response.data))
            .catch( err => console.error(err));
    },[booking])

    useEffect(() => {
        axios.get(serverConnection.api+`/venue/${booking.venueId}`)
            .then( response => {setVenue(response.data[0]); })
            .catch( err => console.error(err))
    },[booking])


    return (
        <>
        <div className="card mb-3">
            <div className="card-header">{`Booking #${booking._id}`}</div>
            <div className="card-body">
                <h5 className="card-title">{`${customer.firstName} ${customer.lastName}`}</h5>
                <p className="card-text">
                    {`Phone: ${customer.phone}`}
                </p>
                <p className="card-text">
                    {`Booking Venue: ${venue.venueName}`}
                </p>
                <p className="card-text">
                {`Booking Time: ${booking.bookingDate} at ${booking.bookingTime}`}
                </p>
                <p className="card-text">
                    {`Guests: ${booking.guestsCount}`}
                </p>
            </div>
        </div>
        </>
    )
}

export default BookingCard;