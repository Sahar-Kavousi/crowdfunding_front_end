async function getProject(projectId) {
    const url =`${import.meta.env.VITE_API_URL}/project/${projectId}`;
    const response = await fetch(url,{method:"GET"});

    if (!response.ok) {
        const fallbackError =`Error fetching project with id ${projectId}`;

        const data =await response.json().catch(() =>{
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail?? fallbackError;
        throw newError(errorMessage);  
    }
    return await response.json();
}
export default getProject;