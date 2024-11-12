import { useEffect, useState } from "react";
import Header from "../Components/Layout/Header";
import { Link, Outlet } from "react-router-dom";
import Cookies from 'js-cookie'
import axios from "axios";
import serverConnection from "../Settings/serverConnection";
import PageContent from "../Components/Layout/PageContent";

const DashboardPage = () => {

    const [userEmail] = useState(JSON.parse(Cookies.get('_auth_state')).email);
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get(serverConnection.api+`/user/${userEmail}`)
            .then( response => setUser(response.data[0]))
            .catch( err => console.error(err) )
    },[])

    return(
        <>
            <Header/>
            <PageContent
                title="Dashboard"
            >

            </PageContent>
            <div className="container mx-auto grid grid-cols-4">
                <div className="sidebar">
                    <Link className="block p-3" to={"/dashboard"}>Summary</Link>
                    <Link className="block p-3" to={"/dashboard/bookings"}>My Bookings</Link>
                    <Link className="block p-3" to={"/dashboard/venues"}>My Venues</Link>
                    <Link className="block p-3" to={"/dashboard/payment-accounts"}>Payment Accounts</Link>
                    <Link className="block p-3" to={"/dashboard/profile"}>My Profile</Link>
                </div>
                <div className="col-span-3">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default DashboardPage;