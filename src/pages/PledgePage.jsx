import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import postProject from "../api/post-project.js";
import AddProjectHeader from "../components/ProjectHeader.jsx";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined.js";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo/index.js";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import postPledge from "../api/post-pledge.js";

function PledgePage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        anonymous: true,
        amount: 40, // Corrected typo here
        comment: "",
        project: +id,
    });

    const handleChange = (event) => {
        const { name, value } = event.target; // Changed from id to name for consistency

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value, // Changed to use name attribute
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (
            formData.amount &&
            formData.comment &&
            formData.project
        ) {
            postPledge(
                formData.project,
                formData.amount,
                formData.comment,
                formData.anonymous
            )
                .then(() => {
                    navigate("/");
                })
                .catch((error) => {
                    console.error("Adding a new Pledge failed:", error);
                    // Optionally, update the UI to reflect the error
                });
        }
    };

    return (
        <>
            <AddProjectHeader titlePart1={"Add found to the"} titlePart2={"Project"}/>

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl fullWidth >
                                    <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                    <OutlinedInput
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
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
                                    id="comment"
                                    label="Description"
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleChange}
                                    multiline
                                    rows={4}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={formData.anonymous}
                                            onChange={(event, checked) => setFormData({ ...formData, anonymous: checked })}
                                            name="anonymous"
                                            inputProps={{ 'aria-label': 'anonymous' }}
                                        />
                                    }
                                    label="Show as anonymous"
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox value="allowExtraEmails" color="primary" />
                                    }
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            SUBMIT
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
}


export default PledgePage;
