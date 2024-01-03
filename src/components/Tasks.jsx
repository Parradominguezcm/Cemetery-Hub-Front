import { Link } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import { tasksAPICall } from "../apiHelpers/tasksApiCall";
import Cookies from 'js-cookie'
import Task from "./Task";


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

            </div>
            {!loggedIn && <div>
                <h2>Welcome to the Cemetery's communications center!</h2>
                <Link to="/login"><button className="btn btn-primary m-3">Log in to view and manage your tasks</button></Link>
                <Link to="/signup"><button className="btn btn-primary m-3">Sign up to get started</button></Link>
            </div>}
            {loggedIn && <div>
                <h3>Volunteer's to-do list</h3>
                {tasks.length === 0 && <div><h1> No tasks</h1>
                    <button type="button" className="btn-outline-success"><Link to="/createTask">Create a task</Link></button></div>}
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
                                    id,
                                    task_deadline
                                }) => {
                                    return <Task id={id} taskDeadline={task_deadline} taskTitle={task_title} taskDescription={task_description} taskCompleted={task_completed} />
                                })}

                            </tbody>
                        </table>
                        <button type="button" className="btn-outline-success"><Link to="/createTask">Create a task</Link></button>
                    </div>
                }</div>}
        </div>
    )

}