import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import serverConnection from "../../Settings/serverConnection";

const Profile = () => {

    const location = useLocation();
    const { user } = location.state || {};
    const [email] = useState(user.email);
    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.firstName || '');

    const handleUserUpdate = (e) => {
        e.preventDefault();
        const userData = {
            firstName: firstName,
            lastName: lastName
        }

        axios.put(serverConnection.api+`/user/${email}`, userData)
            .then(response => console.log( response ) )
            .catch( err => console.error(err) );
    }

    return(
        <>
            <h2>Profile</h2>
            <form className="gbrForm" onSubmit={handleUserUpdate}>
                <div className="gbrForm__group mb-3">
                    <label htmlFor="" className="form-label">Email</label>
                    <input type="email" value={email} className="form-control" disabled readOnly/>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="gbrForm__group mb-3">
                            <label htmlFor="" className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={firstName}
                                onChange={ e => setFirstName(e.target.value) }
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="gbrForm__group mb-3">
                            <label htmlFor="" className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={lastName}
                                onChange={ e => setLastName(e.target.value) }
                            />
                        </div>
                    </div>
                </div>
                <input type="submit" value="Update" className="btn btn-primary" />
            </form>
        </>
    )
}

export default Profile;