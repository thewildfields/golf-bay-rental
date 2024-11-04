import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingForm from '../Components/BookingForm';
import Header from '../Components/Layout/Header';
import serverConnection from '../Settings/serverConnection';

const VenuePage = () => {

    const { name } = useParams();
    const [venue, setVenue] = useState({});

    useEffect(() => {
        axios(serverConnection.api+`/venue/${name}`)
            .then(response => setVenue(response.data[0]))
            .catch(err => console.error(err))
    },[name])

    return(
        <>
            <Header />
            <div className="container">
                <h1>{venue.title}</h1>
                <BookingForm venue={venue} />
            </div>
        </>
    )
}

export default VenuePage;