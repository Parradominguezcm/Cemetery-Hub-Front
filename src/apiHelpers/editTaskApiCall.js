export const editTaskAPICall = async (id, taskCompleted, token) => {
    const response = await fetch("http://localhost:3000/edittask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id,
            task_completed: taskCompleted,
            token
        }),

    });
    return await response.json()
}