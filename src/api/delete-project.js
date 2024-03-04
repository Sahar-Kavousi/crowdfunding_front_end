async function deleteProject(projectId) {
    const url = `${import.meta.env.VITE_API_URL}/project/${projectId}`;
    const token = `Token ${window.localStorage.getItem("token")}`;

    const response = await fetch(url, {
        method: "DELETE", headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        }
    });

    if (!response.ok) {
        const fallbackError = `Error deleting project with id ${projectId}`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw newError(errorMessage);
    }
    return await response;
}

export default deleteProject;
