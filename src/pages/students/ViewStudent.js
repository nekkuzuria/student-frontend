import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
} from "@mui/material";

export default function ViewStudent() {
  const { id } = useParams();

  const [student, setStudent] = useState({
    id: "",
    firstName: "",
    lastName: "",
    birthOfDate: "",
  });

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/students/${id}`
      );
      setStudent(response.data);
    } catch (error) {
      console.error("Error loading student:", error);
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
    <Container style={{ marginTop: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          className="border rounded p-4 shadow-lg"
          style={{ maxWidth: "600px", width: "100%", margin: "0 auto" }}
        >
          <h2 className="text-center mb-4">Student Details</h2>

          <CardHeader title="Details of Student:" />

          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>NIM:</b>
                  </TableCell>
                  <TableCell>{student.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Full Name:</b>
                  </TableCell>
                  <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Age:</b>
                  </TableCell>
                  <TableCell>{calculateAge(student.birthOfDate)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "1rem", borderRadius: "20px" }}
          >
            Back to Home
          </Button>
        </Card>
      </div>
    </Container>
  );
}
