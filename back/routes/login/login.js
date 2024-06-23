import express from "express";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const login_routes = express.Router();

login_routes.post("/login", (req, res) => {
    const {login, password} = req.body;

    if (login !== "admin" || password !== "admin") {
        return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const user = "teste"; //Buscar no banco
    const token = jwt.sign({ user }, process.env.API_KEY);
    return res.status(200).json({ auth: true, token, message: "Login realizado com sucesso!" });
});

export default login_routes;