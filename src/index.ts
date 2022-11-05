import express from "express";
import { createServer as createHttpServer } from "http";
import cors from "cors";
import { PORT } from "./config";
import { initWSocket } from "./wsocket";
import { apiRouter } from "./api";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.get("/", (_req, res) => res.send("Hi there!"));

const httpServer = createHttpServer(app);

initWSocket(httpServer);

httpServer.listen(PORT, () => console.log(`Running in ${PORT} port.`));
