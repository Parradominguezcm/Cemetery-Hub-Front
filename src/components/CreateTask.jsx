import { useState } from "react";
import Cookies from 'js-cookie'
import Header from "./Header";
import { Link } from "react-router-dom";

export default function CreateTask({ loggedIn, setLoggedIn }) {
    const [taskTitle, setTaskTitle] = useState()
    const [taskDescription, setTaskDescription] = useState()
    const [taskDeadline, setTaskDeadline] = useState()
    const [submitted, setSubmitted] = useState()
    const [hasError, setHasError] = useState(false)

    const onChangeTaskTitle = (e) => {
        setTaskTitle(e.target.value)
        setHasError(false)
    }
    const onChangeTaskDescription = (e) => {
        setTaskDescription(e.target.value)
        setHasError(false)
    }
    const onChangeTaskDeadline = (e) => {
        setTaskDeadline(e.target.value)
        setHasError(false)
    }

    const createTaskSubmitHandler = async (e) => {
        e.preventDefault();
        const token = Cookies.get('token')
        const taskSubmitResult = await fetch("http://localhost:3000/createTask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ task_title: taskTitle, task_description: taskDescription, task_deadline: taskDeadline, token: token })
        });
        const result = await taskSubmitResult.json()
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
                <h2>Task created successfully!</h2>
                <a href="/" >View your tasks</a>
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
                <form className="form-horizontal" method="post" onSubmit={createTaskSubmitHandler} >
                    <div className="control-group">
                        <label className="control-label" htmlFor="taskTitle" ><small>Task title</small></label>
                        <input
                            className="form-control"
                            type="taskTitle"
                            name="taskTitle"
                            id="taskTitle"
                            placeholder="taskTitle"
                            onChange={onChangeTaskTitle}
                            value={taskTitle}
                            required />
                    </div>
                    <div className="control-group">
                        <label className="control-label" htmlFor="taskDescription" ><small>Task description</small></label>
                        <input
                            className="form-control"
                            type="taskDescription"
                            name="taskDescription"
                            id="taskDescription"
                            placeholder="taskDescription"
                            onChange={onChangeTaskDescription}
                            value={taskDescription}
                            required />
                    </div>
                    <div className="control-group">
                        <label className="control-label" htmlFor="taskDeadline" ><small>Task deadline</small></label>
                        <input
                            className="form-control"
                            type="taskDeadline"
                            name="taskDeadline"
                            id="taskDeadline"
                            placeholder="taskDeadline"
                            onChange={onChangeTaskDeadline}
                            value={taskDeadline}
                            required />
                    </div>
                    {hasError && <h2>An error occurred</h2>}
                    <button type="submit" className="btn btn-primary" disabled={hasError}>Add your task!</button>
                </form>
            </div>}
        </div>
    )
} 