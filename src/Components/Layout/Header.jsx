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
                <div className="container mx-auto flex justify-between">
                    <Link to={'/'}>GBR</Link>
                    {
                        isAuthenticated
                            ? <button to={'/sign-out'}>Sign out</button>
                            : <Link to={'/sign-in'}>Sign in</Link>
                    }
                </div>
            </header>
        </>
    )
}

export default Header;