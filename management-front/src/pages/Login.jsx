import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      if (response.data.user.role === "admin") {
        navigate("/users");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Credenciais inválidas! Verifique seu e-mail e senha.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>LOGIN</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#2c3e50", 
  },
  loginBox: {
    backgroundColor: "#34495e", 
    borderRadius: "10px",
    padding: "30px",
    width: "400px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    color: "#ecf0f1", 
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#1abc9c",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    outline: "none",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#1abc9c", 
    border: "none",
    borderRadius: "5px",
    color: "#ecf0f1",
    fontSize: "16px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "15px",
    textAlign: "center",
  },
};

export default Login;
