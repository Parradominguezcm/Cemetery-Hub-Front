import { useState } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from 'prop-types';
import Header from "./Header";

export default function SignUp({ loggedIn, setLoggedIn }) {
    const [signupSuccessful, setSignupSuccessful] = useState(false)
    const [errors, setErrors] = useState(null)

    const signupSubmitHandler = async e => {
        e.preventDefault();
        const fd = new FormData(e.target)
        const formJson = Object.fromEntries(fd.entries());
        const signupResult = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formJson)
        });
        const result = await signupResult.json()
        console.log(result)
        if (result.error) {
            setErrors(result.error)
        } else if (!result.status) {
            setErrors(result.message)
        } else {
            setSignupSuccessful(result.status)
        }
    }


    return (
        <div className="container">
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <div className="d-flex flex-column align-items-center">
                {signupSuccessful && <h1> success! </h1>}
                <ul>
                    {errors && errors.map((error) => <li key={error.msg}> {error.msg} </li>)}
                </ul>
                {!signupSuccessful && (
                    <form method="post" onSubmit={signupSubmitHandler} className="form-group mt-3 text-start pt-5">
                        <div className="form-header">
                            <h2>Sign Up!</h2>
                            <p className="text-muted mb-3"><small>Let&apos;s get organised!</small> </p>
                            <div className='mb-3'>
                                <label htmlFor="firstname" ><small>Your First Name</small></label>
                                <input
                                    className="form-control"
                                    type="name"
                                    name="firstname"
                                    id="firstName-text"
                                    placeholder="Your First Name"
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="lastname" ><small>Your Last Name</small></label>
                                <input
                                    className="form-control"
                                    type="name"
                                    name="lastname"
                                    id="lastName-text"
                                    placeholder="Your Last Name"
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="username" ><small>Your user name</small></label>
                                <input
                                    className="form-control"
                                    type="username"
                                    name="username"
                                    id="userName-text"
                                    placeholder="Your User Name"
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="email" ><small>Email Address*</small></label>
                                <input
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    id="email-text"
                                    placeholder="Email Address"
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="userpassword"><small>Password*</small></label>
                                <input
                                    className="form-control"
                                    name="userpassword"
                                    id="userpassword"
                                    placeholder="Password"
                                    type="password"
                                    required
                                />
                            </div>

                            <div>
                                <button type="submit" className="button">Sign up now!</button>
                                <Link to="/" className="link">Handle your Tasks</Link> or <Link to="/login" className="link">Log in to get organised and catch up on news!</Link>
                            </div>
                        </div>
                    </form>)}
            </div>
        </div>
    )
}

SignUp.propTypes = {
    signup: PropTypes.oneOfType([
        PropTypes.exact({
            users: PropTypes.arrayOf(
                PropTypes.shape({
                    "username": PropTypes.string,
                    "firstname": PropTypes.string,
                    "lastname": PropTypes.string,
                    "email": PropTypes.string,
                    "password": PropTypes.string,
                    __v: PropTypes.number,
                })
            ),
            error: PropTypes.string
        }),
    ])
}