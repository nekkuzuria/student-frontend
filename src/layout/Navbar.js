import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledAppBar = styled(AppBar)({
  background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
  boxShadow: "none",
});

const StyledButton = styled(Button)({
  background: "rgba(255, 255, 255, 0.3)",
  color: "white",
  borderRadius: "20px",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.5)",
  },
});

export default function Navbar() {
  return (
    <StyledAppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            College Student Management
          </Typography>
          <StyledButton component={Link} to="/addStudent">
            Add Student
          </StyledButton>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}
