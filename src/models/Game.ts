import { Schema, model } from "mongoose";

const gameSchema = new Schema({
  start: Date,
});

export const Game = model("Game", gameSchema);
