import { Link } from "react-router-dom";
import { useState } from "react";
import { PropTypes } from 'prop-types';
import { loginAPICall } from "../apiHelpers/LoginApiCall";
import Cookies from 'js-cookie'
import Header from "./Header";

export default function LogIn({ loggedIn, loggedInUser, setLoggedIn, setLoggedInUser }) {
    const [email, setEmail] = useState("")
    const [userpassword, setUserPassword] = useState("")
    const [validationError, setShowValidationError] = useState(false)

    const handleEmailChange = (e) => {
        setShowValidationError(false)
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setShowValidationError(false)
        setUserPassword(e.target.value)
    }

    const loginSubmitHandler = async e => {
        e.preventDefault();
        const userRes = await loginAPICall(email, userpassword);

        if (userRes.status) {
            setLoggedIn(true)
            setLoggedInUser(userRes.user)
            Cookies.set('token', userRes.token, { expires: userRes.expiryDate })
        } else {
            setLoggedIn(false)
            setShowValidationError(true)
        }
    }

    return (
        <div className="container">
            <div>
                <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                <div className="d-flex flex-column align-items-center">
                    <form action="" className="form-group mt-3 text-start pt-5">
                        <div className="form-header">
                            {loggedIn && <h2>Welcome, {loggedInUser}! </h2>}
                            {!loggedIn && (
                                <div className="loginContainer">
                                    <h2>Log in</h2>
                                    <p className="text-muted mb-3"><small>Don`t have an account? <Link to="/signup" className="link">sign up now</Link></small> </p>
                                    <div className='mb-3'>
                                        <label htmlFor="email" ><small>your email*</small></label>
                                        <input
                                            className="form-control"
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="email"
                                            onChange={handleEmailChange}
                                            value={email}
                                            required />
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor="userPassword-text"><small>your password*</small></label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            name="userPassword"
                                            id="userPassword-text"
                                            placeholder="userPassword"
                                            onChange={handlePasswordChange}
                                            value={userpassword}
                                            required
                                        />
                                    </div>

                                    {validationError && <strong>try again</strong>}

                                    <div>
                                        <input className="button" type="submit" onClick={loginSubmitHandler} value="log In" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </form >
                    <Link to="/" className="link"> Back to Tasks! </Link>
                </div>
            </div>
        </div>
    )
}

LogIn.propTypes = {
    'loggedIn': PropTypes.bool,
    'setLoggedIn': PropTypes.func,
    'setLoggedInUser': PropTypes.func,
    'loggedInUser': PropTypes.exact({
        "_id": PropTypes.string,
        "userName": PropTypes.string,
        "userFirstName": PropTypes.string,
        "userLastName": PropTypes.string,
        "userEmail": PropTypes.string,
        "userPassword": PropTypes.string,
        __v: PropTypes.number,
    })
}
