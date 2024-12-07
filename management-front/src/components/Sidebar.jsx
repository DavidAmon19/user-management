import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>User management</h2>
      <nav>
        <ul style={styles.navList}>
          <li>
            <Link
              to="/"
              style={{
                ...styles.navItem,
                backgroundColor: isActive("/") ? "#1abc9c" : "transparent",
              }}
            >
              🏠 Início
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              style={{
                ...styles.navItem,
                backgroundColor: isActive("/users") ? "#1abc9c" : "transparent",
              }}
            >
              👥 Usuários
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "250px",
    background: "#2c3e50",
    color: "#ecf0f1",
    height: "100vh",
    padding: "20px",
    position: "fixed",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  navList: {
    listStyle: "none",
    padding: 0,
  },
  navItem: {
    display: "block",
    padding: "10px",
    color: "#ecf0f1",
    textDecoration: "none",
    borderRadius: "5px",
  },
};

export default Sidebar;
