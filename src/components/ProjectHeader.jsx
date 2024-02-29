import * as React from "react";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


export default ({title, subTitle}) => (
    <Box
        id="hero"
        sx={(theme) => ({
            width: "100%",
            backgroundImage:
                theme.palette.mode === "light"
                    ? "linear-gradient(180deg, #CEE5FD, #FFF)"
                    : "linear-gradient(#02294F, #090E10)",
            backgroundSize: "100% 20%",
            backgroundRepeat: "no-repeat",
        })}
    >
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pt: {xs: 14, sm: 20},
                //   pb: { xs: 8, sm: 12 },
            }}
        >
            <Stack spacing={2} useFlexGap sx={{width: {xs: "100%", sm: "70%"}}}>
                <Typography
                    component="h1"
                    variant="h1"
                    sx={{
                        display: "flex",
                        flexDirection: {xs: "column", md: "row"},
                        alignSelf: "center",
                        textAlign: "center",
                    }}
                >
                    Add a New&nbsp;
                    <Typography
                        component="span"
                        variant="h1"
                        sx={{
                            color: (theme) =>
                                theme.palette.mode === "light"
                                    ? "primary.main"
                                    : "primary.light",
                        }}
                    >
                        Project
                    </Typography>
                </Typography>
                <Typography variant="body1" textAlign="center" color="text.secondary">
                    {subTitle ?? 'Transforming Lives Through Innovation and Community Support'} <br/>
                </Typography>

                <Typography
                    variant="caption"
                    textAlign="center"
                    sx={{opacity: 0.8}}
                >

                </Typography>
            </Stack>
        </Container>

    </Box>
)
