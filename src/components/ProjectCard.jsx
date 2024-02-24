import { Link } from "react-router-dom";

function ProjectCard(props) {
  const { projectData } = props;
  // const projectLink = `project/${projectData.id}`;
  return (
    <div className="project-card">
      <Link to={`/project/${projectData.id}`}>
        <img src={projectData.image} alt={`${projectData.title}.image`} />
        <h3>{projectData.title}</h3>
      </Link>
      <p>{projectData.description}</p>
    </div>
  );
}
export default ProjectCard;
