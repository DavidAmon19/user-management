import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import api from "../services/api";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [showModal, setShowModal] = useState(false); 
  const [editingUser, setEditingUser] = useState(null);

  const loggedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {
      const response = await api.get(`/users?page=${page}&limit=5`);
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error("Erro ao carregar usuários!");
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await api.post("/users", { name, email, password, role });
      toast.success("Usuário adicionado com sucesso!");
      fetchUsers();
      setName("");
      setEmail("");
      setPassword("");
      setRole("user");
    } catch {
      toast.error("Erro ao adicionar usuário!");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      toast.success("Usuário excluído com sucesso!");
      fetchUsers();
    } catch {
      toast.error("Erro ao excluir usuário!");
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const saveEditUser = async () => {
    try {
      await api.put(`/users/${editingUser.id}`, editingUser);
      toast.success("Usuário atualizado com sucesso!");
      setShowModal(false);
      fetchUsers();
    } catch {
      toast.error("Erro ao atualizar usuário!");
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div>
      <ToastContainer />
      <h1>Cadastro de Usuários</h1>
      <div className="d-flex align-items-center mb-4 gap-4">
        <span>Usuário logado: {loggedUser.name}</span>
        <button
          className="btn btn-warning"
          onClick={() => handleEditUser(loggedUser)}
        >
          Editar
        </button>
      </div>
      {loggedUser.role === "admin" && (
        <div className="d-flex mb-4">
          <input
            className="form-control"
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="form-control"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-control"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">Usuário</option>
            <option value="admin">Admin</option>
          </select>
          <button
            className="btn btn-success"
            onClick={handleAddUser}
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
            {loggedUser.role === "admin" && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              style={{
                backgroundColor: user.id === loggedUser.id ? "#f9f9f9" : "transparent",
              }}
            >
              <td>{index + 1 + (page - 1) * 5}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role === "admin" ? "Admin" : "Usuário"}</td>
              {loggedUser.role === "admin" && (
                <td>
                  {user.id !== loggedUser.id && (
                    <>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEditUser(user)}
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

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Voltar
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          className="btn btn-primary"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Avançar
        </button>
      </div>
    </div>
  );
};

export default Users;
