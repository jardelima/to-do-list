import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    }),
    express.json(),
);
app.use(routes);
app.listen(port);