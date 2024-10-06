import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingForm from '../Components/BookingForm';
import Header from '../Components/Layout/Header';
import serverConnection from '../Settings/serverConnection';
import 'bootstrap/dist/css/bootstrap.css';

const VenuePage = () => {

    const { id } = useParams();
    const [venue, setVenue] = useState({});

    useEffect(() => {
        axios(serverConnection.api+`/venue/${id}`)
            .then(response => setVenue(response.data[0]))
            .catch(err => console.error(err))
    },[id])

    return(
        <>
            <Header />
            <div className="container">
                <h1>{venue.venueName}</h1>
                <BookingForm venue={venue} />
            </div>
        </>
    )
}

export default VenuePage;