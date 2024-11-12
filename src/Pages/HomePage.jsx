import Header from "../Components/Layout/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import serverConnection from "../Settings/serverConnection";
import { Link } from "react-router-dom";
import PageContent from "../Components/Layout/PageContent";

const HomePage = () => {

    const [venues, setVenues] = useState([]);

    useEffect(() => {
        axios.get(serverConnection.api+'/venues')
            .then( response => setVenues(response.data))
            .catch( err => console.error( err))
    },[])

    return(
        <>
            <Header />
            <PageContent
                title="Welcome to Golf Bay Rentals"
            >
                <h2>Golf venues</h2>
                <Link to={'/kiosk'}>Kiosk</Link>
                {venues.map( venue => (
                    <div key={venue.name}>
                        <Link to={`/venue/${venue.name}`}>{venue.title}</Link>
                        <br />
                    </div>
                ))}
            </PageContent>
        </>
    )
}

export default HomePage;