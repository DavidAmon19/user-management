import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import api from "../services/api";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [role, setRole] = useState("user"); 
  const [editingUserId, setEditingUserId] = useState(null); 
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api.get("/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleAddUser = () => {
    api
      .post("/users", { name, email, password, role })
      .then((response) => {
        setUsers([...users, response.data.user]);
        setName("");
        setEmail("");
        setPassword("");
        setRole("user");
        toast.success("Usuário adicionado com sucesso!");
      })
      .catch(() => toast.error("Erro ao adicionar usuário!"));
  };

  const handleOpenModal = (user) => {
    setEditingUserId(user.id);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setName("");
    setEmail("");
    setRole("user");
    setEditingUserId(null);
  };

  const handleUpdateUser = () => {
    api
      .put(`/users/${editingUserId}`, { name, email, role })
      .then((response) => {
        setUsers(
          users.map((user) =>
            user.id === editingUserId ? response.data.user : user
          )
        );
        toast.success("Usuário atualizado com sucesso!");
        handleCloseModal();
      })
      .catch(() => toast.error("Erro ao atualizar usuário!"));
  };

  const handleDeleteUser = (id) => {
    api
      .delete(`/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
        toast.success("Usuário deletado com sucesso!");
      })
      .catch(() => toast.error("Erro ao deletar usuário!"));
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
          style={{ marginRight: "10px" }}
        />
        <input
          className="form-control"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <select
          className="form-control"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="user">Usuário</option>
          <option value="admin">Admin</option>
        </select>
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
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role === "admin" ? "Admin" : "Usuário"}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleOpenModal(user)}
                  style={{ marginRight: "10px" }}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Usuário</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  className="form-control mb-3"
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="form-control mb-3"
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <select
                  className="form-control mb-3"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">Usuário</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleUpdateUser}
                >
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
