import { Router } from "express";
import { createGame, getAll, getById, joinUser } from "../../game";

const router = Router();

router.put("/join/:id", (req, res) => {
  try {
    const id = req.params.id;
    const user = req.body.user;
    const game = joinUser(user, id);
    res.json({ data: { game } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

router.post("/", (req, res) => {
  try {
    console.log(req.body);
    const user = req.body.user;
    const game = createGame(user);
    res.json({ data: { game } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

router.get("/:id", (req, res) => {
  try {
    const id = req.params.id;
    const game = getById(id);
    res.json({ data: { game } });
  } catch (error) {
    res.json({ error });
  }
});

router.get("/", (_req, res) => {
  try {
    const games = getAll();
    res.json({ data: { games } });
  } catch (error) {
    res.json({ error });
  }
});

export const gameRouter = router;
