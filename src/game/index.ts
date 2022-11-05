import {
  ECell,
  EGameStatus,
  EPlayerTurn,
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
    turn: EPlayerTurn.FIRST,
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

export const getAll = () => [...games.values()];

export const joinUser = (user: IUser, id: IdGame) => {
  const game = games.get(id);
  if (!game) return null;
  const isComplete = game.users.every((u) => !!u);
  if (isComplete) return null;
  game.users[1] = user;
  return game;
};

export const isUserInGame = (user: IUser, id: IdGame) => {
  const game = games.get(id);
  if (!game) return null;

  return game.users.find((u) => u?.nickname === user.nickname) ? game : null;
};

const whichTypeIsUser = (game: IGame, user: IUser) => {
  const index = game.users.findIndex((u) => u?.nickname === user.nickname);
  if (index === 0) {
    return ECell.FIRST;
  }
  if (index === 1) {
    return ECell.SECOND;
  }
  return null;
};

export const move = (
  game: IGame,
  user: IUser,
  row: 0 | 1 | 2,
  cell: 0 | 1 | 2
) => {
  // const type = whichTypeIsUser(game, user);
  // game.board[row][cell];
};
