import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

export default function verifyToken(req, res, next) {
    const getToken = req.headers["authorization"];

    if (!getToken) {
        return res.status(401).json({ auth: false, message: "Não existe token de autorização!" });
    }

    const token = getToken.split(" ")[1];

    jwt.verify(token, process.env.API_KEY, (error, decoded) => {
        if (error) {
            return res.status(500).json({ auth: false, message: error.message });
        }

        req.user = decoded.user;
        next();
    });
}