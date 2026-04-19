import express from "express";
import cors from "cors";

import postRoutes from "./routes/post.routes.js";
import errorHandler, { notFound } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/posts", postRoutes);

// 👇 siempre al final
app.use(notFound);
app.use(errorHandler);

export default app;