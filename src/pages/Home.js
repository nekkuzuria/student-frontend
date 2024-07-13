import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";

// Styling for TableContainer with blurred shadow
const StyledTableContainer = styled(TableContainer)({
  backdropFilter: "blur(10px)",
  borderRadius: "15px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
});

// Styled TableCell for TableHead to make text bold
const StyledTableHeaderCell = styled(TableCell)({
  fontWeight: "bold",
});

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/v1/students");
      setData(result.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/students/${id}`);
      loadStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <Container>
      <div style={{ marginTop: "2rem" }}>
        <StyledTableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableHeaderCell>NIM</StyledTableHeaderCell>
                <StyledTableHeaderCell>Full Name</StyledTableHeaderCell>
                <StyledTableHeaderCell>Age</StyledTableHeaderCell>
                <StyledTableHeaderCell>Action</StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                    <TableCell>{calculateAge(student.birthOfDate)}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`/viewStudent/${student.id}`}
                        size="small"
                        style={{ marginRight: "0.5rem", borderRadius: "20px" }}
                      >
                        View
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        component={Link}
                        to={`/editStudent/${student.id}`}
                        size="small"
                        style={{ marginRight: "0.5rem", borderRadius: "20px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteStudent(student.id)}
                        size="small"
                        style={{ borderRadius: "20px" }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </div>
    </Container>
  );
}
