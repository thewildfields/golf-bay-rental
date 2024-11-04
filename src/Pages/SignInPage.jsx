import { Link } from "react-router-dom";
import SignInForm from "../Components/Dashboard/SignInForm";
import Header from "../Components/Layout/Header";

const SignInPage = () => {
    return(
        <>
            <Header/>
                <div className="container mx-auto">
                    <h1>Sign In Page</h1>
                    <SignInForm/>
                    <Link to={'/sign-up'}>Create an account</Link>
                </div>
        </>
    )
}

export default SignInPage;