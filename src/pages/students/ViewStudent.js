import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function ViewStudent() {
  const { id } = useParams();

  const [student, setStudent] = React.useState({
    nim: "",
    firstName: "",
    lastName: "",
    birthOfDate: "",
  });

  React.useEffect(() => {
    loadStudent();
  });

  const loadStudent = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/v1/students/${id}`
    );
    setStudent(result.data);
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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 border rounded p-4 mt-2 shadow-lg">
          <h2 className="text-center mb-4">Student Details</h2>

          <div className="card">
            <div className="card-header">
              Details of Student :
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>NIM : </b>
                  {student.id}
                </li>
                <li className="list-group-item">
                  <b>Full Name : </b>
                  {student.firstName} {student.lastName}
                </li>
                <li className="list-group-item">
                  <b>Age : </b>
                  {calculateAge(student.birthOfDate)}
                </li>
              </ul>
            </div>
          </div>

          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
