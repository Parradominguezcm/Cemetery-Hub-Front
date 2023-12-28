export const tasksAPICall = async (token) => {
    const response = await fetch("http://localhost:3000/alltasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token
        }),

    });
    return await response.json()
}