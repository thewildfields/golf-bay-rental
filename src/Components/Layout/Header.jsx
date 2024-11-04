import { Link } from "react-router-dom";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import Cookies from 'js-cookie'
import { useEffect, useState } from "react";
import axios from "axios";
import serverConnection from "../../Settings/serverConnection";

const Header = () => { 
    const isAuthenticated = useIsAuthenticated();
    return(
        <>
            <header
                className="bg-slate-300	py-4 mb-6"
            >
                <div className="container mx-auto">
                    <Link className="navbar-brand" to={'/'}>GBR</Link>
                    {
                        isAuthenticated
                            ? <button className="nav-link" to={'/sign-out'}>Sign out</button>
                            : <Link className="nav-link" to={'/sign-in'}>Sign in</Link>
                    }
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </header>
        </>
    )
}

export default Header;