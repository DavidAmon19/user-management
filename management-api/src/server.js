require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require("../src/routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const sequelize = require('./config/config'); 

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use("/users/auth", authRoutes);


const PORT = process.env.PORT || 3000;
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });
