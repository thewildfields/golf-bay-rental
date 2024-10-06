import SignUpForm from "../Components/Dashboard/SignUpForm";
import Header from "../Components/Layout/Header";

const SignUpPage = () => {
    return(
        <>
            <Header/>
            <div className="container">
                <h1>Sign Up Page</h1>
                <SignUpForm/>
            </div>
        </>
    )
}

export default SignUpPage;