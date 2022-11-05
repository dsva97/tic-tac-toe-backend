import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  res.json({ data: "Hi" });
});

export const gameRouter = router;
