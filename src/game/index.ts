import {
  ECell,
  EGameStatus,
  IdGame,
  IGame,
  IUser,
  ZUserSchema,
} from "../types";
import { nanoid } from "nanoid";

const games = new Map<IdGame, IGame>();

export const createGame = (user: IUser): IGame => {
  const id = nanoid(10);

  user = ZUserSchema.parse(user);

  const game: IGame = {
    id,
    start: new Date(),
    users: [user, null],
    status: EGameStatus.CREATED,
    board: [
      [ECell.VOID, ECell.VOID, ECell.VOID],
      [ECell.VOID, ECell.VOID, ECell.VOID],
      [ECell.VOID, ECell.VOID, ECell.VOID],
    ],
  };

  games.set(id, game);

  return game;
};

export const getById = (id: IdGame) => games.get(id) || null;

export const getAll = () => games.values();

export const joinUser = (user: IUser, id: IdGame) => {
  const game = games.get(id);
  if (!game) return null;
  const isComplete = game.users.every((u) => !!u);
  if (isComplete) return null;
  game.users[1] = user;
  return game;
};
