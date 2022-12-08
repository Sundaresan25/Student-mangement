import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Studentlogin } from "./Studentlogin";
import { Dashboard } from "./Dashboard/Dashboard";
import { Students } from "./Dashboard/Students";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Studentlogin />}></Route>
        <Route path="/adminlogin" element={<Login />}></Route>
        <Route path="/admin" element={<Dashboard />}></Route>
        <Route path="/student" element={<Students />}></Route>
      </Routes>
    </div>
  );
}

export default App;
