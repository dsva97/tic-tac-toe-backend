import { Router } from "express";
import { gameRouter } from "./game";
import { sessionRouter } from "./session";

const router = Router();

router.use("/session", sessionRouter);
router.use("/game", gameRouter);

export const apiRouter = router;
