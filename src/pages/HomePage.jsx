import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import Hero from "../components/Hero";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function HomePage() {
  const { projects, isLoading, error } = useProjects();

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>{error.message}</h1>;

  return (
    <>
      <Hero />
        <Container maxWidth="xl">

        <h1>Categories</h1>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        rowSpacing={{ xs: 3, sm: 6, md: 9 }}
        columnSpacing={{ xs: 3, sm: 6, md: 9 }}
      >
        {projects.map((projectData, key) => (
          <Grid xs={12} sm={3} md={4} key={key}>
            <ProjectCard projectData={projectData} />
          </Grid>
        ))}
      </Grid>
        </Container>
      {/* </Box> */}
    </>
  );
}
export default HomePage;
