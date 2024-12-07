import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import api from "../services/api";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [selectedUser, setSelectedUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setLoggedInUser(user);

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

  const handleDeleteUser = (id) => {
    api
      .delete(`/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
        toast.success("Usuário deletado com sucesso!");
      })
      .catch((err) => {
        toast.error(err.response?.data?.error || "Erro ao deletar usuário!");
      });
  };

  const handleUpdateUser = () => {
    api
      .put(`/users/${selectedUser.id}`, {
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
      })
      .then(() => {
        setUsers(
          users.map((user) =>
            user.id === selectedUser.id ? { ...selectedUser } : user
          )
        );
        setSelectedUser(null);
        toast.success("Usuário atualizado com sucesso!");
      })
      .catch((err) => {
        toast.error(err.response?.data?.error || "Erro ao atualizar usuário!");
      });
  };

  const openEditModal = (user) => {
    setSelectedUser({ ...user });
  };

  const closeEditModal = () => {
    setSelectedUser(null);
  };

  return (
    <div>
      <ToastContainer />
      <h1>Cadastro de Usuários</h1>
      <div className="d-flex align-items-start gap-2 mt-3 mb-5">
        <p className="fs-5">Usuário logado: {loggedInUser.name} </p>
        <button
          className="btn btn-warning btn-sm"
          onClick={() => openEditModal(loggedInUser)}
        >
          Editar
        </button>
      </div>
      {loggedInUser.role === "admin" && (
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
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            {loggedInUser.role === "admin" && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              style={
                user.id === loggedInUser.id
                  ? { backgroundColor: "#f8f9fa" }
                  : {}
              }
            >
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role === "admin" ? "Admin" : "Usuário"}</td>
              {loggedInUser.role === "admin" && (
                <td>
                  {user.id !== loggedInUser.id && (
                    <>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => openEditModal(user)}
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
                    </>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Usuário</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeEditModal}
                >
                </button>
              </div>
              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  type="text"
                  placeholder="Nome"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, name: e.target.value })
                  }
                />
                <input
                  className="form-control mb-2"
                  type="email"
                  placeholder="E-mail"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                />
                <select
                  className="form-control mb-2"
                  value={selectedUser.role}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, role: e.target.value })
                  }
                >
                  <option value="user">Usuário</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeEditModal}>
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={handleUpdateUser}>
                  Salvar
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
