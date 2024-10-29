import axios from "axios";
import { useEffect, useState } from "react";
import serverConnection from "../../Settings/serverConnection";
import { useLocation } from "react-router-dom";
import VenuesTable from "../VenuesTable";

const PaymentAccounts = () => {

    const location = useLocation();
    const { user } = location.state || {};
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        !venues.length && axios.get(`${serverConnection.api}/venues/${user._id}`)
            .then( response => setVenues(response.data))
            .catch( err => console.error(err))
    },[])


    return(
        <>
            <h2>Table of my Payment Accounts</h2>
            <VenuesTable venues={venues} user={user}/>
        </>
    )
}

export default PaymentAccounts;