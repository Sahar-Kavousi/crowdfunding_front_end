import { useParams } from "react-router-dom";
import useProject from "../hooks/use-project";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share"; // Import the share icon
import Grid from "@mui/material/Grid";
import "./ProjectPage.css";

function ProjectPage() {
  // Here we use a hook that comes for free in react router called `useParams`to get
  // the id from the URL so that we can pass it to our useProject hook.
  const { id } = useParams();
  // useProject returns three pieces of info, so we need to grab them all here
  const { project, isLoading, error } = useProject(id);

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
    // <Container
    //   style={{
    //     paddingLeft: "20px",
    //     paddingTop: "20px",
    //     margin: "0",
    //   }}
    //   maxWidth="sm"
    // >
    //   {/* Title */}
    //   <Typography variant="h4" gutterBottom>
    //     {project.project.title}
    //   </Typography>

    //   <Box
    //     sx={{
    //       height: imageHeight + 100, // Adjust the container height accordingly
    //       display: "flex",
    //       flexDirection: "column", // Align button below the image
    //       alignItems: "center",
    //       justifyContent: "center",
    //       paddingTop: "30px",
    //     }}
    //   >
    //     <img
    //       src={project.project.image}
    //       alt={project.project.title}
    //       loading="lazy"
    //       style={{
    //         width: "100%",
    //         height: imageHeight,
    //         objectFit: "cover",
    //         marginBottom: "16px", // Add space between image and button
    //       }}
    //     />
    //   </Box>
    //   <Box
    //     component="section"
    //     sx={{
    //       p: 2,
    //       border: "1px dashed grey",
    //       display: "flex",
    //       flexDirection: "column", // Align button below the image
    //       alignItems: "left",
    //       justifyContent: "left",
    //       width: "100%",
    //       mb: "1rem",
    //     }}
    //   >
    //     {/* Fundraiser Name */}
    //     <Typography
    //       variant="h6"
    //       gutterBottom
    //       style={{ textAlign: "left", align: "left" }}
    //     >
    //       Fundraiser: {project.project.id}
    //     </Typography>
    //     {/* Created At */}
    //     <Typography
    //       variant="body2"
    //       color="textSecondary"
    //       gutterBottom
    //       style={{ textAlign: "left" }}
    //     >
    //       Created At: {createdTime}
    //     </Typography>
    //     {/* Fundraiser Status */}
    //     <Typography
    //       variant="body2"
    //       color="textSecondary"
    //       gutterBottom
    //       style={{ textAlign: "left" }}
    //     >
    //       Status: {project.project.status}
    //     </Typography>
    //     {/* Goal Amount  */}
    //     <Typography
    //       variant="body2"
    //       color="textSecondary"
    //       gutterBottom
    //       style={{ textAlign: "left" }}
    //     >
    //       Goal Amount: ${project.project.goal}
    //     </Typography>
    //     {/* Amount Raised */}
    //     <Typography
    //       variant="body2"
    //       color="textSecondary"
    //       gutterBottom
    //       style={{ textAlign: "left" }}
    //     >
    //       Amount Raised: ${project.project.amount}
    //     </Typography>
    //     {/* Goal Amount and Amount Raised */}
    //     {/* <Typography
    //       variant="body2"
    //       color="textSecondary"
    //       gutterBottom
    //       style={{ textAlign: "left" }}
    //     >
    //       Goal Amount: ${project.project.goal_amount} | Amount Raised: $
    //       {project.project.amount_raised}
    //     </Typography> */}
    //   </Box>
    //   {/* Donation Button */}
    //   <Button
    //     variant="contained"
    //     color="primary"
    //     onClick={handleDonate}
    //     style={{ width: "100%", marginBottom: "8px" }}
    //   >
    //     Donate now
    //   </Button>

    //   <Button
    //     variant="contained"
    //     color="primary"
    //     onClick={handleShare}
    //     style={{ width: "100%", display: "flex", alignItems: "center" }}
    //   >
    //     <ShareIcon style={{ marginRight: "8px" }} />
    //     Share Now
    //   </Button>
    // </Container>

    <div className="product-container">
      <div className="product-row1">
        <div className="product-image">
          <img
            src={project.project.image}
            alt={project.project.title}
            loading="lazy"
            style={{
              width: "60%",
              height: imageHeight,
              objectFit: "cover",
            }}
          />
          <div className="product-image">
            <p>TETETET</p>
          </div>
        </div>
      </div>
      <div className="product-row2">
        {/* Donation Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleDonate}
          style={{ width: "100%", marginBottom: "8px" }}
        >
          Donate now
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleShare}
          style={{ width: "100%", display: "flex", alignItems: "center" }}
        >
          <ShareIcon style={{ marginRight: "8px" }} />
          Share Now
        </Button>
      </div>
    </div>

    // <Grid container spacing={2}>
    //   <Grid item xs={12}>
    //     {/* Title */}
    //     <Typography variant="h4">{project.project.title}</Typography>
    //   </Grid>
    //   <Grid item xs={6}>
    //     <img
    //       src={project.project.image}
    //       alt={project.project.title}
    //       loading="lazy"
    //       style={{
    //         width: "100%",
    //         height: imageHeight,
    //         objectFit: "cover",
    //         marginBottom: "16px", // Add space between image and button
    //       }}
    //     />
    //   </Grid>
    //   <Grid item xs={12}>
    //     {/* Fundraiser Name */}
    //     <Typography
    //       variant="h6"
    //       gutterBottom
    //       style={{ textAlign: "left", align: "left" }}
    //     >
    //       Fundraiser: {project.project.id}
    //     </Typography>
    //     {/* Created At */}
    //     <Typography
    //       variant="body2"
    //       color="textSecondary"
    //       gutterBottom
    //       style={{ textAlign: "left" }}
    //     >
    //       Created At: {createdTime}
    //     </Typography>
    //     {/* Fundraiser Status */}
    //     <Typography
    //       variant="body2"
    //       color="textSecondary"
    //       gutterBottom
    //       style={{ textAlign: "left" }}
    //     >
    //       Status: {project.project.status}
    //     </Typography>
    //     {/* Goal Amount  */}
    //     <Typography
    //       variant="body2"
    //       color="textSecondary"
    //       gutterBottom
    //       style={{ textAlign: "left" }}
    //     >
    //       Goal Amount: ${project.project.goal}
    //     </Typography>
    //     {/* Amount Raised */}
    //     <Typography
    //       variant="body2"
    //       color="textSecondary"
    //       gutterBottom
    //       style={{ textAlign: "left" }}
    //     >
    //       Amount Raised: ${project.project.amount}
    //     </Typography>
    //   </Grid>
    //   <Grid item xs={6}>
    //     {/* Donation Button */}
    //     <Button
    //       variant="contained"
    //       color="primary"
    //       onClick={handleDonate}
    //       style={{ width: "100%", marginBottom: "8px" }}
    //     >
    //       Donate now
    //     </Button>
    //     <Button
    //       variant="contained"
    //       color="primary"
    //       onClick={handleShare}
    //       style={{ width: "100%", display: "flex", alignItems: "center" }}
    //     >
    //       <ShareIcon style={{ marginRight: "8px" }} />
    //       Share Now
    //     </Button>
    //   </Grid>
    // </Grid>
  );
}

// Function to handle the donation action
const handleDonate = () => {
  // Implement donation logic here
  console.log("Donation button clicked!");
};
export default ProjectPage;
