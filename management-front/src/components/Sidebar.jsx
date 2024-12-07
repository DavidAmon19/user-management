import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); 

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    setIsLoading(true); 
    toast.success("Logout realizado com sucesso!"); 

    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoading(false); 
      navigate("/login"); 
    }, 2000);
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>User management</h2>
      <div style={styles.conatiner}>
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
                  backgroundColor: isActive("/users")
                    ? "#1abc9c"
                    : "transparent",
                }}
              >
                👥 Usuários
              </Link>
            </li>
          </ul>
        </nav>
        <nav>
          <ul style={styles.navList}>
            <li>
              <button
                style={{
                  ...styles.navItem,
                  border: "none",
                  background: "none",
                  cursor: isLoading ? "not-allowed" : "pointer",
                }}
                onClick={handleLogout}
                disabled={isLoading}
              >
                {isLoading ? "Saindo..." : "⬅️ Sair"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
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
  conatiner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    padding: "20px",
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
