require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require("../src/routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/management', userRoutes);
app.use("/management/auth", authRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  try {
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});

