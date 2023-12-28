import { Link } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import { tasksAPICall } from "../apiHelpers/tasksApiCall";
import Cookies from 'js-cookie'


export default function Tasks({ loggedIn, setLoggedIn }) {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        if (loggedIn === true) {
            const token = Cookies.get('token')

            tasksAPICall(token).then(tasks => {
                console.log(tasks)
                setTasks(tasks)
            }).catch((e) => {
                console.log(e)
            })
        }
    }, [loggedIn])

    return (
        <div className="container">
            <div>
                <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                <h3>Volunteer's to-do list</h3>
            </div>
            {!loggedIn && <div>
                <Link to="/login"><button className="btn btn-primary m-3">Log in to view and manage your tasks</button></Link>
                <Link to="/signup"><button className="btn btn-primary m-3">Sign up to get started</button></Link>
            </div>}
            {loggedIn && <div>
                {tasks.length === 0 && <h1> No tasks</h1>}
                {tasks.length > 0 &&
                    <div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Deadline</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map(({
                                    task_title,
                                    task_description,
                                    task_completed,
                                    user_id,
                                    id,
                                    task_deadline
                                }) => {
                                    return <tr key={id}>
                                        <th scope="row">{id}</th>
                                        <td>{task_title}</td>
                                        <td>{task_description}</td>
                                        <td>{task_deadline}</td>
                                        <td><input type="checkbox" /></td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        <button type="button" className="btn-outline-success"><Link to="/createTask">Create a task</Link></button>
                    </div>
                }</div>}
        </div>
    )

}