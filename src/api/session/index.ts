import { Router } from "express";

const router = Router();

router.use("/login", (req, res) => res.json({ data: "Hi" }));

export const sessionRouter = router;
