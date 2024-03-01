import {Link, useParams} from "react-router-dom";
import useProject from "../hooks/use-project";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share"; // Import the share icon
import "./ProjectPage.css";
import ProjectHeader from "../components/ProjectHeader.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import LinearProgressWithLabel from "../components/LinearProgressWithLabel.jsx";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function ProjectPage() {
    // Here we use a hook that comes for free in react router called `useParams`to get
    // the id from the URL so that we can pass it to our useProject hook.
    const {id} = useParams();
    // useProject returns three pieces of info, so we need to grab them all here
    const {project, isLoading, error} = useProject(id);

    if (isLoading) {
        return <h1>loading...</h1>;
    }
    if (error) {
        return <h1>{error.message}</h1>;
    }

    // Function to handle the share action
    const handleShare = () => {
        // Implement share logic here
        console.log("Share button clicked!");
    };

    const imageHeight = 400; // Set the desired height for the image

    // Parse and format the creation time in a user-friendly way
    const createdTime = new Date(
        Date.parse(project.project.date_created)
    ).toLocaleString();

    // Function to handle the donation action
    const handleDonate = () => {
        // Implement donation logic here
        console.log("Donation button clicked!");
    };

    //   return (
    //     <div>
    //       <h2>{project.project.title}</h2>
    //       <h3>Created at: {project.project.date_created}</h3>
    //       <h3>{`Status: ${project.project.is_open}`}</h3>
    //       <h3>Pledges:</h3>
    //       <ul>
    //         {project.project.pledges.map((pledgeData, key) => {
    //           return (
    //             <li key={key}>
    //               {pledgeData.amount} from {pledgeData.supporter}
    //             </li>
    //           );
    //         })}
    //       </ul>
    //     </div>
    //   );

    return (
        <>

            <ProjectHeader titlePart1={project.project.title}/>
            <Container maxWidth="xl">
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        <Grid xs={12} sm={6}>
                            <Item>
                                <img
                                    src={project.project.image}
                                    alt={project.project.title}
                                    loading="lazy"
                                    style={{
                                        width: "100%",
                                        height: imageHeight,
                                        objectFit: "cover",
                                    }}
                                /></Item>
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Item>
                                <Typography textAlign={"start"} >
                                    {project.project.description}
                                </Typography>
                                <LinearProgressWithLabel
                                    value={project.amount_to_raise  ? Math.round(( (project.project.goal - project.amount_to_raise) * 100) / project.project.goal) : 0}
                                />
                            </Item>
                        </Grid>
                        <Grid xs={12} smOffset={6} sm={6}>
                            <Box sx={{flexGrow: 1, gap: 2 }}
                                 display="flex"
                                 alignItems="center">
                                {/* Donation Button */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleDonate}
                                    style={{width: "100%"}}
                                    component={Link}
                                    to={`/project/pledge/${id}`}
                                >
                                    Donate now
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleShare}
                                    style={{width: "100%", display: "flex", alignItems: "center"}}
                                >
                                    <ShareIcon style={{marginRight: "8px"}}/>
                                    Share Now
                                </Button>
                            </Box>

                        </Grid>

                    </Grid>
                </Box>
            </Container>
        </>
    );
}


export default ProjectPage;
