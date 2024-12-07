const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
  async createUser(req, res) {
    try {
      const { name, email, password, role } = req.body;

      const hashedPassword = await bcrypt.hash(password, 8);
      const newUser = await User.create({ name, email, password: hashedPassword, role });

      res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
      console.log(error);
    }
  },

  async listUsers(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'name', 'email', 'role', 'isActive'] });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar usuários', details: error.message });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password, isActive } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      const hashedPassword = password ? await bcrypt.hash(password, 8) : user.password;

      await user.update({ name, email, password: hashedPassword, isActive });
      res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar usuário', details: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      await user.destroy();
      res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar usuário', details: error.message });
    }
  },
};
