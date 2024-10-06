import { useEffect, useState } from "react";
import Header from "../Components/Layout/Header";
import { Link, Outlet } from "react-router-dom";
import Cookies from 'js-cookie'
import axios from "axios";
import serverConnection from "../Settings/serverConnection";

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
            <div className="container">
                <h1>Dashboard page</h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <div className="sidebar">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to={"/dashboard"}>Summary</Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to={"/dashboard/bookings"}
                                        state={{ user: user }}
                                    >
                                        My Bookings
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to={"/dashboard/venues"}
                                        state={{ user: user }}
                                    >My Venues</Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to={"/dashboard/profile"}
                                        state={{ user: user }}
                                    >My Profile</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-9">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardPage;