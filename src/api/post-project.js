async function postProject(title, description, goal, image, isOpen,startDate,endDate) {
    const url = `${import.meta.env.VITE_API_URL}/projects/`;
    const token=`Token ${window.localStorage.getItem("token")}`;

    const response = await fetch(url, {
        method: "POST",
        // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        },
        body: JSON.stringify({
            title: title,
            description: description,
            goal: goal,
            image: image,
            is_open: isOpen,
            startDate: startDate,
            endDate: endDate,
            date_created: new Date().toISOString()
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to sign up`;
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }
    return await response.json();
}
export default postProject;
