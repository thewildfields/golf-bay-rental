import Header from "../Components/Layout/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import serverConnection from "../Settings/serverConnection";
import { Link } from "react-router-dom";

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
            <div className="container pt-4">
                <h1>Welcome to Golf Bay Rentals</h1>
                <h2>Golf venues</h2>
                {venues.map( venue => (
                    <div key={venue.venueName}>
                        <Link to={`/venue/${venue.venueName}`}>{venue.venueTitle}</Link>
                        <br />
                    </div>
                ))}
            </div>
        </>
    )
}

export default HomePage;