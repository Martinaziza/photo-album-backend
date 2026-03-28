// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
import "dotenv/config"; 


// ℹ️ Connects to the database
import "./db/index.js"; 

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
import express from "express";

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
import setupMiddleware from "./config/index.js";
setupMiddleware(app)

// 👇 Start handling routes here
import indexRoutes from "./routes/index.routes.js";
import authRoutes from "./routes/auth.routes.js";
import albumRoutes from "./routes/album.routes.js"
import photoRoutes from "./routes/photo.routes.js"
import commentRoutes from "./routes/comment.routes.js"

app.use("/api", indexRoutes);
app.use ("/auth", authRoutes)
app.use("/api", albumRoutes)
app.use("/api", photoRoutes)
app.use("/api", commentRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
import setupErrorHandling from "./error-handling/index.js"; 
setupErrorHandling(app)
// require("./error-handling")(app);

export default app;



