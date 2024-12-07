import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import api from "../services/api";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    api.get("/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleAddUser = () => {
    api
      .post("/users", { name, email })
      .then((response) => {
        setUsers([...users, response.data.user]);
        setName("");
        setEmail("");
        toast.success("Usuário adicionado com sucesso!");
      })
      .catch(() => toast.error("Erro ao adicionar usuário!"));
  };

  return (
    <div>
      <ToastContainer />
      <h1>Cadastro de Usuários</h1>
      <div className="d-flex mb-4">
        <input
          className="form-control"
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          className="form-control"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="btn btn-success"
          onClick={handleAddUser}
          style={{ marginLeft: "10px" }}
        >
          Adicionar
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
