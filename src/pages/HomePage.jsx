import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import "./HomePage.css";

function HomePage() {
    const { projects, isLoading, error } = useProjects();

    if (isLoading) return <h1>Loading...</h1>;

    if (error) return <h1>{error.message}</h1>;

    return (
        <>
            <h1>Home Page</h1>
            <div id="project-list">
        
            {projects.map((projectData, key) => {
                return <ProjectCard key={key} projectData={projectData} />;
            })}
            </div>
        </>
        );
}
export default HomePage;
