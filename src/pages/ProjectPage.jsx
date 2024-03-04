import {Link, useNavigate, useParams} from "react-router-dom";
import useProject from "../hooks/use-project";
import DeleteProject from "../api/delete-project.js";
import {useState, useEffect} from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share"; // Import the share icon
import "./ProjectPage.css";
import ProjectHeader from "../components/ProjectHeader.jsx";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import LinearProgressWithLabel from "../components/LinearProgressWithLabel.jsx";
import GetUserDetails from "../api/get-user-details.js";
import {Skeleton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import useAuth from "../hooks/use-auth.js";
import ResponsiveDialog from "../components/ResponsiveDialog.jsx";
import DisplayPledges from "../components/DisplayPledges.jsx";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

function ProjectPage() {
    const {auth} = useAuth();
    const navigate = useNavigate();

    // Here we use a hook that comes for free in react router called `useParams`to get
    // the id from the URL so that we can pass it to our useProject hook.
    const {id} = useParams();
    // useProject returns three pieces of info, so we need to grab them all here
    const {project, isLoading, error} = useProject(id);

    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    // State to hold the fetched data
    const [ownerData, setOwnerData] = useState(null);
    // State to hold any error from the fetch operation
    const [ownerError, setOwnerError] = useState(null);
    // State to indicate if the request is still loading
    const [ownerLoading, setOwnerLoading] = useState(true);

    useEffect(() => {
        if (auth?.user?.id) {
            GetUserDetails(auth?.user?.id)
                .then((owner) => {
                    setOwnerData({...owner});
                    setOwnerLoading(false);
                })
                .catch((error) => {
                    setOwnerError(error);
                    setOwnerLoading(false);
                });
        }

    }, [project?.project?.owner]);

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

    // Function to handle the remove a project action
    const handleRemoveProject = (projectId) => {
        // Implement donation logic here
        DeleteProject(projectId).then(() => {
            navigate("/");
        });
    };

    return (
        <>
            <ProjectHeader titlePart1={project.project.title}/>
            <Container maxWidth="xl">
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        <Grid xs={12} sm={8}>
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
                                />
                                {ownerData?.username ? (
                                    <Box
                                        alignItems={"center"}
                                        sx={{display: "flex", alignContent: "center", m: 2}}
                                    >
                                        {/*<AttachMoneyIcon/>*/}
                                        <Typography>
                                            Organiser:{" "}
                                            {ownerData?.first_name && ownerData?.last_name
                                                ? `${ownerData?.first_name} ${ownerData?.last_name}`
                                                : ownerData?.username}{" "}
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Box>
                                        <Skeleton/>
                                        <Skeleton/>
                                        <Skeleton/>
                                    </Box>
                                )}
                                <Box
                                    alignItems={"center"}
                                    sx={{display: "flex", alignContent: "center", mx: 2, my: 5}}
                                >
                                    <Typography>{project?.project?.description}</Typography>
                                </Box>
                                <Box
                                    alignItems={"center"}
                                    sx={{display: "flex", alignContent: "center", mx: 2, my: 5}}
                                >
                                    {project?.project?.owner === auth?.user?.id && (
                                        <Stack direction="row" spacing={2}>
                                            <Button
                                                variant="outlined"
                                                onClick={handleOpen}
                                                startIcon={<DeleteIcon/>}
                                            >
                                                Delete
                                            </Button>
                                            <Button variant="contained" endIcon={<EditIcon/>} component={Link}
                                                    to={`/addProject/${id}`}>
                                                Edit
                                            </Button>
                                        </Stack>
                                    )}
                                </Box>
                            </Item>
                        </Grid>
                        <Grid xs={12} sm={4}>
                            <Item>
                                <Box
                                    alignItems={"center"}
                                    sx={{display: "flex", alignContent: "center", m: 2}}
                                >
                                    {/*<AttachMoneyIcon/>*/}
                                    <Typography variant="h5" component="h4">
                                        <strong>
                                            ${project.project.goal - project.amount_to_raise}
                                        </strong>
                                    </Typography>
                                    &nbsp;
                                    <Typography>
                                        raised of ${project.project.goal} goal
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="subtitle1"
                                    alignItems={"center"}
                                    sx={{display: "flex", alignContent: "center", m: 2}}
                                >
                                    {project?.project?.pledges.length ?? 0} donations
                                </Typography>
                                <LinearProgressWithLabel
                                    sx={{m: 2}}
                                    value={
                                        project.amount_to_raise
                                            ? Math.round(
                                                ((project.project.goal - project.amount_to_raise) *
                                                    100) /
                                                project.project.goal
                                            )
                                            : 0
                                    }
                                />
                                <Box
                                    sx={{flexGrow: 1, gap: 2, m: 2}}
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                >
                                    {/* Donation Button */}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{width: "100%"}}
                                        component={Link}
                                        to={`/project/pledge/${id}`}
                                    >
                                        Donate now
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"

                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <ShareIcon style={{marginRight: "8px"}}/>
                                        Share Now
                                    </Button>
                                </Box>
                                <Box sx={{flexGrow: 1, gap: 2, m: 2, pt: 5}}>
                                    <DisplayPledges pledges={project?.project?.pledges}/>
                                </Box>
                            </Item>
                        </Grid>
                        <Grid xs={12} sm={8}></Grid>
                    </Grid>
                </Box>
            </Container>
            <ResponsiveDialog
                isOpen={isOpen}
                handleClose={handleClose}
                title="Delete Project"
                content="Are you sure you want to delte this project?."
                actions={[
                    {label: "Cancel", onClick: handleClose},
                    {
                        label: "Delete",
                        onClick: () => {
                            /* handle submit */
                            handleRemoveProject(project.project.id);
                            handleClose();
                        },
                    },
                ]}
            />
        </>
    );
}

export default ProjectPage;
