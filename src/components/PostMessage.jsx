import { useState } from "react";
import Cookies from 'js-cookie'
import Header from "./Header";
import { Link } from "react-router-dom";

export default function PostMessage({ loggedIn, setLoggedIn }) {
    const [message, setMessage] = useState()
    const [submitted, setSubmitted] = useState()
    const [hasError, setHasError] = useState(false)

    const onChangeMessage = (e) => {
        setMessage(e.target.value)
        setHasError(false)
    }

    const createMessageSubmitHandler = async (e) => {
        e.preventDefault();
        const token = Cookies.get('token')
        const messageSubmitResult = await fetch("http://localhost:3000/writemessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: message, token: token })
        });
        const result = await messageSubmitResult.json()
        if (result.status) {
            setSubmitted(true)
            setHasError(false)
        } else {
            setHasError(true)
        }
    }

    if (submitted) {
        return (
            <div>
                <h2>Message Posted!</h2>
                <a href="/" >View your tasks</a>
                <a href="/messageBoard">View all messages</a>
            </div>
        )
    }

    return (
        <div className="container">
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <h2>Create your task</h2>

            {!loggedIn && <div>
                <Link to="/login"><button className="btn btn-primary m-3">Log in to view and manage your tasks</button></Link>
                <Link to="/signup"><button className="btn btn-primary m-3">Sign up to get started</button></Link>
            </div>}
            {loggedIn && <div>
                <form className="form-horizontal" method="post" onSubmit={createMessageSubmitHandler} >
                    <div className="control-group">
                        <label className="control-label" htmlFor="message" ><small>Message</small></label>
                        <input
                            className="form-control"
                            type="text"
                            name="message"
                            id="message"
                            placeholder="message"
                            onChange={onChangeMessage}
                            value={message}
                            required />
                    </div>
                    {hasError && <h2>An error occurred</h2>}
                    <button type="submit" className="btn btn-primary" disabled={hasError}>Post your Message!</button>
                </form>
            </div>}
        </div>
    )
} 