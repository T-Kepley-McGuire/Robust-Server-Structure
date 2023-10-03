const express = require("express");
const app = express();

const usersRouter = require("./users/users.router");
const pastesRouter = require("./pastes/pastes.router");

app.use("/users", usersRouter);
app.use("/pastes", pastesRouter);


app.use(express.json());

// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, request, response, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  response.status(status).json({ error: message });
});

module.exports = app;
