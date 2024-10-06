import axios from "axios";
import { useState } from "react";
import serverConnection from "../../Settings/serverConnection";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = useSignIn();
    const navigate = useNavigate();

    const handleSignInForm = async e => {
        e.preventDefault();
        const userData = {
            email: email,
            password: password
        }


        try{
            const response = await axios.post(
                serverConnection.api+'/auth/sign-in',
                userData
            );

            const signInData = {
                authState: { email: userData.email },
                auth: {
                  token: response.data.token,
                  type: 'Bearer',
                },
                expiresIn: 3600,
                userState: {email: userData.email}
            }

            signIn(signInData);

            navigate('/dashboard');

        } catch(err) {
            console.error( err)
        } 

    }

    return(
        <>
            <form
                className="gbrForm"
                onSubmit={ handleSignInForm }
            >
                <div className="gbrForm__group mb-3">
                    <label htmlFor="user-email" className="form-label">Username or Email</label>
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
                    <input type="submit" className="btn btn-primary" value="Sign In" />
                </div>
            </form>
        </>
    )
}

export default SignInForm;