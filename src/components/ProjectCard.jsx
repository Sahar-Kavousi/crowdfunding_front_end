import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LinearProgressWithLabel from "./LinearProgressWithLabel";

function ProjectCard(props) {
  const {
    projectData: { id, description, goal, image, raised, title },
  } = props;
  const handleShare = () => {
      console.log(`Click on the Shared: ${title}`)
  };

  return (
    <Card sx={{ maxWidth: 450 }}>
      <CardMedia
        component="img"
        alt={`${title}.image`}
        height="180"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <LinearProgressWithLabel
          value={raised && goal ? Math.round((raised / goal) * 100) : 0}
        />
      </CardContent>
      <CardActions>
        <Button onClick={handleShare} size="small">
          Share
        </Button>
        <Button component={Link}  to={`/project/${id}`} size="small">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
export default ProjectCard;
