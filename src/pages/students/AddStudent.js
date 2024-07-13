import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";

export default function AddStudent() {
  const navigate = useNavigate();

  const [student, setStudent] = React.useState({
    firstName: "",
    lastName: "",
    birthOfDate: "",
  });

  const { firstName, lastName, birthOfDate } = student;

  const handleInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/v1/students", student);
      navigate("/");
    } catch (error) {
      console.error("Error registering student:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: "4rem" }}>
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register Student
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                value={firstName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="birthOfDate"
                label="Date of Birth"
                name="birthOfDate"
                type="date"
                value={birthOfDate}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  placeholder: "DD/MM/YYYY",
                  style: { marginTop: "8px" },
                }}
                required
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1, borderRadius: "20px" }}
            color="primary"
          >
            Register
          </Button>
          <Button
            component={Link}
            to="/"
            fullWidth
            variant="outlined"
            sx={{ mt: 1, mb: 2, borderRadius: "20px" }}
            color="error"
          >
            Cancel
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
