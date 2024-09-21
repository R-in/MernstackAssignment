import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserTable from "./components/UserTable";
import Home from "./pages/Home";
//import Users from "./pages/Users";
import Navbar from './components/Navbar';
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserTable />} />
      </Routes>
    </Router>
    // <div className="App">
    //  <h1>User Management</h1>
    //  <UserTable />
    // </div>
  );
}

export default App;
