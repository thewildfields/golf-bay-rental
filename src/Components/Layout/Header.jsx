import { Link } from "react-router-dom";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'js-cookie'
import { useEffect, useState } from "react";
import axios from "axios";
import serverConnection from "../../Settings/serverConnection";

const Header = () => { 

    const [userEmail] = useState(JSON.parse(Cookies.get('_auth_state')).email);
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get(serverConnection.api+`/user/${userEmail}`)
            .then( response => setUser(response.data[0]))
            .catch( err => console.error(err) )
    },[])

    const isAuthenticated = useIsAuthenticated();


    return(
        <>
            <header className="header">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container">
                        <Link className="navbar-brand" to={'/'}>GBR</Link>
                        {
                            isAuthenticated && (
                                <p>Hello, {userEmail}</p>
                            )
                        }
                        {
                            isAuthenticated
                                ? <button className="nav-link" to={'/sign-out'}>Sign out</button>
                                : <Link className="nav-link" to={'/sign-in'}>Sign in</Link>
                        }
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header;