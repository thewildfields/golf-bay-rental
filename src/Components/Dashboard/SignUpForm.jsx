import axios from "axios";
import { useState } from "react";
import serverConnection from "../../Settings/serverConnection";

const SignUpForm = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUpForm = (e) => {
        e.preventDefault();
        const userData = {
            email: email,
            username: username,
            password: password
        }

        axios.post(serverConnection.api+'/auth/sign-up', userData)
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }

    return(
        <>
            <form
                className="gbrForm"
                onSubmit={ handleSignUpForm }
            >
                <div className="gbrForm__group mb-3">
                    <label htmlFor="user-email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="gbrForm__input form-control"
                        id="user-email"
                        value={email}
                        onChange={ e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="gbrForm__group mb-3">
                    <label htmlFor="user-email" className="form-label">Username</label>
                    <input
                        type="text"
                        className="gbrForm__input form-control"
                        id="user-username"
                        value={username}
                        onChange={ e => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="gbrForm__group mb-3">
                    <label htmlFor="user-password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="gbrForm__input form-control"
                        id="user-password"
                        value={password}
                        onChange={ e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="gbrForm__group">
                    <input type="submit" value="Sign up" className="btn btn-primary" />
                </div>
            </form>
        </>
    )
}

export default SignUpForm;