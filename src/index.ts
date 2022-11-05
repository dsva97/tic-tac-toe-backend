import express from "express";
import path from "path";
import { createServer as createHttpServer } from "http";
import cors from "cors";
import { FRONTEND_PATH, PORT } from "./config";
import { initWSocket } from "./wsocket";
import { apiRouter } from "./api";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.use(express.static(FRONTEND_PATH));

app.get("*", (_req, res) =>
  res.sendFile(path.resolve(FRONTEND_PATH, "index.html"))
);

const httpServer = createHttpServer(app);

initWSocket(httpServer);

httpServer.listen(PORT, () => console.log(`Running in ${PORT} port.`));
