require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const sequelize = require('./config/config'); 

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

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
