import express from "express";
import cors from "cors";

import postRoutes from "./routes/post.routes.js";
import notFound from "./middlewares/error.middleware.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/posts", postRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;