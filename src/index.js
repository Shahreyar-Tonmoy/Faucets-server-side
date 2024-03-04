import errorHandlingMiddleware from "./Middleware/errorHandlingMiddleware.js";
import router from "./Routes/auth.js";
import logoutRoute from "./Routes/logoutRoute.js";
import userProfile from "./Routes/profileRoutes.js";
import { requestRouter } from "./Routes/requestRoutes.js";
import { app } from "./app.js";
import connectDB from "./db/index.js";
const startServer = (port) => {
  return app.listen(port);
};

const tryStartServer = (port) => {
  const server = startServer(port);
  server.on("listening", () => {
    console.log(`Server is running at http://localhost:${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${port} is already in use. Trying a different port...`);
      tryStartServer(port + 1); // Try the next port
    } else {
      console.error("Error starting the server:", err);
      process.exit(1);
    }
  });
};

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.use(errorHandlingMiddleware);
    app.use("/auth", router);
    app.use("/auth/profile", userProfile);
    app.use("/auth", logoutRoute);
    app.use("/api", requestRouter);
    
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: "Internal Server Error" });
    });

    app.get("/", (req, res) => {
      res.send(`Server is running at http://localhost:${PORT}`);
    });

    tryStartServer(PORT);
  })
  .catch((err) => {
    console.log("Failed to start the server:", err);
  });
