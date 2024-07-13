import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditStudent() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [student, setStudent] = React.useState({
    firstName: "",
    lastName: "",
    birthOfDate: "",
  });

  const { firstName, lastName, birthOfDate } = student;

  const onInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadStudent();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/v1/students/${id}`, student);
    navigate("/");
  };

  const loadStudent = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/v1/students/${id}`
    );
    setStudent(result.data);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 border rounded p-4 mt-2 shadow-lg">
          <h2 className="text-center mb-4">Edit Student</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your first name"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your last name"
                name="lastName"
                id="lastName"
                value={lastName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="birthOfDate" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control"
                name="birthOfDate"
                id="birthOfDate"
                value={birthOfDate}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-primary w-100 mt-3"
            >
              Submit
            </button>
            <Link className="btn btn-outline-danger w-100 mt-3" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
