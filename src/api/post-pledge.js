async function postPledge(projectId, amount, comment, showAnonymous) {
    const url = `${import.meta.env.VITE_API_URL}/pledges/`;
    const token=`Token ${window.localStorage.getItem("token")}`;

    const response = await fetch(url, {
        method: "POST",
        // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        },
        body: JSON.stringify({
            comment: comment,
            amount: amount,
            anonymous: showAnonymous,
            project: projectId
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to adding pledge`;
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }
    return await response.json();
}
export default postPledge;
