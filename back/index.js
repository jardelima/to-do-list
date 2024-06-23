import express from "express";
import cors from "cors";

import todo_routes from "./routes/routes.js";
import login_routes from "./routes/login/login.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    }),
    express.json(),
);
app.use(todo_routes);
app.use(login_routes);
app.listen(port);