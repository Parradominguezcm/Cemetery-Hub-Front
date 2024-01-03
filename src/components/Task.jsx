import { useState } from "react";
import { editTaskAPICall } from "../apiHelpers/editTaskApiCall";
import Cookies from 'js-cookie'

const Task = ({
    taskTitle,
    taskDescription,
    taskCompleted,
    id,
    taskDeadline
}) => {
    const [checked, setChecked] = useState(taskCompleted)

    const onClickChecked = async () => {
        const token = Cookies.get('token')

        if (checked === true) {
            setChecked(false)
            await editTaskAPICall(id, false, token)
        } else {
            setChecked(true)
            await editTaskAPICall(id, true, token)
        }
    }

    return (
        <tr key={id}>
            <th scope="row">{id}</th>
            <td>{taskTitle}</td>
            <td>{taskDescription}</td>
            <td>{taskDeadline}</td>
            <td><input type="checkbox" checked={checked} onClick={onClickChecked} /></td>
        </tr>
    )
}

export default Task