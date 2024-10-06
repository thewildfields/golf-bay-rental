import axios from "axios";
import { useEffect, useState } from "react";
import serverConnection from "../../Settings/serverConnection";
import { useLocation } from "react-router-dom";
import BookingCard from "./BookingCard";

const Bookings = () => {

    const location = useLocation();
    const { user } = location.state || {};
    const [venues, setVenues] = useState([]);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        !venues.length && axios.get(`${serverConnection.api}/venues/${user._id}`)
            .then( response => setVenues(response.data))
            .catch( err => console.error(err))
    },[])

    useEffect(() => {
        if( venues.length > 0){
            axios.get(serverConnection.api+'/bookings')
                .then(response => {
                    const bookingsUnfiltered = response.data;
                    if( typeof bookingsUnfiltered !== 'object'){
                        return;
                    }
                    const venueIds = venues.map( venue => venue.venueId);
                    const bookingsFiltered = bookingsUnfiltered.filter( (booking) => 
                        venueIds.includes(booking.venueId) )
                    setBookings(bookingsFiltered)
                })
                .catch(err => console.error(err))
        }
    },[venues])

    return(
        <>
            {bookings.map( booking => (
                <BookingCard key={booking._id} booking={booking} />
            ))}
        </>
    )
}

export default Bookings;