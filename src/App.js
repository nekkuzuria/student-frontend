import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddStudent from "./users/AddStudent";
import EditStudent from "./users/EditStudent";
import ViewStudent from "./users/ViewStudent";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addStudent" element={<AddStudent />} />
          <Route exact path="/editStudent/:id" element={<EditStudent />} />
          <Route exact path="/viewStudent/:id" element={<ViewStudent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
