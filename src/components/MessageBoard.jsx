import { Link } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { messagesAPICall } from "../apiHelpers/messagesApiCall";

export default function MessageBoard({ loggedIn, setLoggedIn }) {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (loggedIn === true) {
            const token = Cookies.get('token')

            messagesAPICall(token).then(messages => {
                console.log(messages)
                setMessages(messages)
            }).catch((e) => {
                console.log(e)
            })
        }
    }, [loggedIn])

    return (
        <div className="container">
            <div>
                <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            </div>
            {!loggedIn && <div>
                <h2>Welcome to the Cemetery's communications center!</h2>
                <Link to="/login"><button className="btn btn-primary m-3">Log in to participate!</button></Link>
                <Link to="/signup"><button className="btn btn-primary m-3">Sign up to get started</button></Link>
            </div>}
            {loggedIn && <div>
                <h3>Highgate Cemetery's Notice Board</h3>
                {messages.length === 0 && <h1> No tasks</h1>}
                {messages.length > 0 &&
                    <div>
                        {messages.map(({ message, username, date_posted }, idx) => {
                            return <div key={idx} className="card m-2" style={{ width: "18rem" }}>
                                <div className="card-body">
                                    <h5 className="card-title">{username}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{date_posted}</h6>
                                    <p className="card-text">{message}</p>
                                </div>
                            </div>

                        })}
                        <button type="button" className="btn-outline-success m-3"><Link to="/postMessage">Post a Message</Link></button>
                    </div>
                }</div>}
        </div>
    )

}