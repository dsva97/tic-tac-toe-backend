import express from "express";
import { createServer as createHttpServer } from "http";
import cors from "cors";
import { PORT } from "./config";
import { initWSocket } from "./wsocket";
import { apiRouter } from "./api";

const app = express();

app.use("/api", apiRouter);

app.use(cors());

const httpServer = createHttpServer(app);

initWSocket(httpServer);

httpServer.listen(PORT, () => console.log(`Running in ${PORT} port.`));
