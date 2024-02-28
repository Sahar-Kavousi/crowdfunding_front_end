import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import Hero from "../components/Hero";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";

function HomePage() {
  const { projects, isLoading, error } = useProjects();

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>{error.message}</h1>;

  return (
    <>
      <Hero />
      <h1>Categories</h1>

      {/* <Box
        my={4}
        display="flex"
        alignItems="center"
        justifyItems="center"
        alignContent="center"
        justifyContent="center"
        gap={4}
        p={2}
      > */}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {projects.map((projectData, key) => (
          <Grid xs={2} sm={4} md={4} key={key}>
            <ProjectCard projectData={projectData} />
          </Grid>
        ))}
      </Grid>
      {/* </Box> */}
    </>
  );
}
export default HomePage;
