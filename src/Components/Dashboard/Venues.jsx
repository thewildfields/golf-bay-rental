import axios from "axios";
import { useEffect, useState } from "react";
import serverConnection from "../../Settings/serverConnection";
import { useLocation, Link } from "react-router-dom";
import Cookies from 'js-cookie'
import VenuesTable from "../VenuesTable";

const Venues = () => {

    const [userEmail] = useState(JSON.parse(Cookies.get('_auth_state')).email);
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get(serverConnection.api+`/user/${userEmail}`)
            .then( response => setUser(response.data[0]))
            .catch( err => console.error(err) )
    },[])

    const [venues, setVenues] = useState([]);

    useEffect(() => {
        !venues.length && axios.get(`${serverConnection.api}/venues/${user._id}`)
            .then( response => setVenues(response.data))
            .catch( err => console.error(err))
    },[user])


    return(
        <>
            <h2>Table of my Venues</h2>
            <table>
                <thead>
                    <tr>
                        <th>Venue Title</th>
                        <th>Venue Name</th>
                        <th>Payment account</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { Boolean(venues.length) && venues.map( (venue) => (
                        <tr key={venue._id}>
                            <td>{venue.title}</td>
                            <td>{venue.name}</td>
                            <td>{venue.name}</td>
                            <td><Link to={venue.name}>Edit</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={'new'}>Create New Venue</Link>
        </>
    )
}

export default Venues;