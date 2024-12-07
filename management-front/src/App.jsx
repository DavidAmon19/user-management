import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Users from "./pages/Users";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <div style={{ display: "flex", height: "100vh" }}>
                <Sidebar />
                <div style={{ marginLeft: "250px", padding: "20px", flex: 1 }}>
                  <Home />
                </div>
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <div style={{ display: "flex", height: "100vh" }}>
                <Sidebar />
                <div style={{ marginLeft: "250px", padding: "20px", flex: 1 }}>
                  <Users />
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
