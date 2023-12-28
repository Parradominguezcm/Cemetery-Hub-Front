export const loginAPICall = async (email, userpassword) => {
    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            userpassword
        }),

    });
    return await response.json()
}