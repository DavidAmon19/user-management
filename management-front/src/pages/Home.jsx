import React from "react";
import logo from "../assets/analysis-concept-illustration/logo.jpg";
const Home = () => {
  return (
    <div>
      <h1>Bem vindo!</h1>
      <p>
        Sistema de Gestão de Usuários: Gerencie e controle de forma eficiente os
        usuários do seu sistema.
      </p>

      <div>
        <img style={{ width: "600px", height: "550px" }} src={logo} alt="" />
      </div>
    </div>
  );
};

export default Home;
