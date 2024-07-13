import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [data, setData] = React.useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/students");
    setData(result.data);
  };

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/students/${id}`);
    loadStudents();
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
      <div className="py-4">
        <table class="table border shadow">
          <thead>
            <tr>
              <th scope="col">NIM</th>
              <th scope="col">Full Name</th>
              <th scope="col">Age</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((student, index) => (
                <tr>
                  <td>{student.id}</td>
                  <td>{`${student.firstName} ${student.lastName}`}</td>
                  <td>{calculateAge(student.birthOfDate)}</td>
                  <td>
                    <Link
                      className="btn btn-primary mx-2"
                      to={`/viewStudent/${student.id}`}
                    >
                      View
                    </Link>
                    <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/editStudent/${student.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteStudent(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
