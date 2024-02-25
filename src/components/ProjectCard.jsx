import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LinearProgressWithLabel from "./LinearProgressWithLabel";

function ProjectCard(props) {
  const { projectData } = props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={`${projectData.title}.image`}
        height="140"
        image={projectData.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {projectData.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {projectData.description}
        </Typography>
        <LinearProgressWithLabel value={42} />
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
export default ProjectCard;
