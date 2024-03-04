import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import AddProjectHeader from "../components/ProjectHeader.jsx";
import postProject from "../api/post-project.js";
import useAuth from "../hooks/use-auth.js";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import Switch from "@mui/material/Switch";
import {
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import GetUserDetails from "../api/get-user-details.js";
import getProject from "../api/get-project.js";
import putProject from "../api/put-project.js";

export default function AddProjectPage() {
    // Here we use a hook that comes for free in react router called `useParams`to get
    // the id from the URL so that we can pass it to our useProject hook.
    const {id} = useParams();
    const isEditMode = Boolean(id); // Convert presence of id to a boolean to signify edit mode

// Initialize state for project data, loading status, and error, assuming these are not fetched from `useProject` directly if in create mode.
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const {auth} = useAuth();

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        isOpen: true,
        image: "",
        goal: 10, // Corrected typo here
        endDate: "",
        startDate: "",
        description: "",
        title: "",
    });

    // State to hold the fetched data
    const [ownerData, setOwnerData] = useState(null);
    // State to hold any error from the fetch operation
    const [ownerError, setOwnerError] = useState(null);
    // State to indicate if the request is still loading
    const [ownerLoading, setOwnerLoading] = useState(true);

    useEffect(() => {
        if (auth?.user?.id) {
            GetUserDetails(auth.user.id)
                .then((owner) => {
                    setOwnerData({...owner});
                    setOwnerLoading(false);
                })
                .catch((error) => {
                    setOwnerError(error);
                    setOwnerLoading(false);
                });
        }
        if (isEditMode) {
            setIsLoading(true);
            getProject(id)
                .then(projectData => {
                    const dataToSet = {
                        isOpen: projectData.project.isOpen || true,
                        image: projectData.project.image || '',
                        goal: projectData.project.goal || 10,
                        endDate: projectData.project.endDate || '',
                        startDate: projectData.project.startDate || '',
                        description: projectData.project.description || '',
                        title: projectData.project.title || '',
                    };
                    setFormData(dataToSet);
                    setIsLoading(false);
                })
                .catch(err => {
                    setError(err);
                    setIsLoading(false);
                });
        }
    }, [auth?.user?.id, id, isEditMode]);

    const handleChange = (event) => {
        const {name, value} = event.target; // Changed from id to name for consistency

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value, // Changed to use name attribute
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (
            formData.image &&
            formData.goal &&
            formData.description &&
            formData.title
        ) {
            try {

                if (isEditMode) {
                    putProject(
                        id,
                        formData.title,
                        formData.description,
                        formData.goal,
                        formData.image,
                        formData.isOpen,
                        formData.startDate,
                        formData.endDate
                    )
                        .then(() => {
                            navigate("/");
                        })
                        .catch((error) => {
                            console.error("Adding a new project failed:", error);
                            // Optionally, update the UI to reflect the error
                        });
                } else {
                    postProject(
                        formData.title,
                        formData.description,
                        formData.goal,
                        formData.image,
                        formData.isOpen,
                        formData.startDate,
                        formData.endDate
                    )
                        .then(() => {
                            navigate("/");
                        })
                        .catch((error) => {
                            console.error("Adding a new project failed:", error);
                            // Optionally, update the UI to reflect the error
                        });
                }
                navigate("/");
            } catch (error) {
                console.error("Operation failed:", error);
                // Optionally, handle the error in UI
            }

        }
    };

    return (
        <>
            <AddProjectHeader titlePart1={"Add a new"} titlePart2={"Project"}/>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                        <LockOutlinedIcon/>
                    </Avatar>

                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{mt: 3}}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                    id="title"
                                    label="Project Title"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="description"
                                    label="Project Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                                        <DatePicker
                                            required
                                            id="startDate"
                                            label="Start Date"
                                            value={formData.startDate}
                                            onChange={handleChange}
                                        />
                                        <DatePicker
                                            required
                                            id="endDate"
                                            label="End Date"
                                            name="endDate"
                                            value={formData.endDate}
                                            onChange={handleChange}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-amount">
                                        Amount
                                    </InputLabel>
                                    <OutlinedInput
                                        startAdornment={
                                            <InputAdornment position="start">$</InputAdornment>
                                        }
                                        required
                                        fullWidth
                                        type={"number"}
                                        id="goal"
                                        label="Amount to raise"
                                        name="goal"
                                        value={formData.goal}
                                        onChange={handleChange}
                                        autoComplete="goal"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="image"
                                    label="Image Address"
                                    type="url"
                                    id="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    autoComplete="image"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={formData.isOpen}
                                            onChange={(event, checked) =>
                                                setFormData({...formData, isOpen: checked})
                                            }
                                            name="isOpen"
                                            inputProps={{"aria-label": "controlled"}}
                                        />
                                    }
                                    label="Open Project"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox value="allowExtraEmails" color="primary"/>
                                    }
                                    label="I want to receive any update regarding my project via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            SUBMIT
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
