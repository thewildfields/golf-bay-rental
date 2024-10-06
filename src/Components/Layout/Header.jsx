import { Link } from "react-router-dom";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import 'bootstrap/dist/css/bootstrap.css';

const Header = () => { 
    const isAuthenticated = useIsAuthenticated()
    return(
        <>
            <header className="header">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container">
                        <Link className="navbar-brand" to={'/'}>GBR</Link>
                        {
                            isAuthenticated
                                ? <Link className="nav-link" to={'/sign-out'}>Sign out</Link>
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