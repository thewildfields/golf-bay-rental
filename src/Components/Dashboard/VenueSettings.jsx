import { Link } from "react-router-dom";
import VenueForm from "../VenueForm";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import serverConnection from "../../Settings/serverConnection";

const VenueSettings = () => {

    const { id } = useParams();
    const [venue, setVenue] = useState({});

    useEffect(() => {
        axios(serverConnection.api+`/venue/${id}`)
            .then(response => setVenue(response.data[0]))
            .catch(err => console.error(err))
    },[id])

    return(
        <>
            { id }
            { venue.venueId && <VenueForm venue={venue} /> }
        </>
    )
}

export default VenueSettings;