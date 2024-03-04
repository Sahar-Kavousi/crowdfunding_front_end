async function getUserDetails(userId) {
    const url = `${import.meta.env.VITE_API_URL}/user/${userId}/`;
    const token = `Token ${window.localStorage.getItem("token")}`;

    const response = await fetch(url, {
        method: "GET", headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        },
    });

    if (!response.ok) {
        const fallbackError = `Error fetching current user details`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw newError(errorMessage);
    }
    return await response.json();
}

export default getUserDetails;
