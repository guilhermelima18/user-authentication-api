import express from "express";
import bearerAuthentication from "./middlewares/bearerAuthentication.middleware";
import errorHandler from "./middlewares/errorHandler.middleware";
import authorizationRoute from "./routes/authorization.route";
import usersRoute from "./routes/users.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authorizationRoute);
app.use(bearerAuthentication);
app.use(usersRoute);

app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server is running.");
});
