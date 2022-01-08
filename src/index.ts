import express from "express";
import errorHandler from "./middlewares/errorHandler.middleware";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(usersRoute);
app.use(statusRoute);

app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server is running.");
});
