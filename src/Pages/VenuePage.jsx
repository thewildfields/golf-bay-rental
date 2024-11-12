import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingForm from '../Components/BookingForm';
import Header from '../Components/Layout/Header';
import serverConnection from '../Settings/serverConnection';
import PageContent from '../Components/Layout/PageContent';

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
            <PageContent
                title={venue.title}
            >
                <BookingForm venue={venue} />
            </PageContent>
        </>
    )
}

export default VenuePage;