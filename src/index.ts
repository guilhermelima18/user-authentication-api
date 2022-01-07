import express, { Request, Response } from "express";
import usersRoute from "./routes/users.route";

const app = express();

app.use(usersRoute);

app.listen(5000, () => {
  console.log("Server is running.");
});
