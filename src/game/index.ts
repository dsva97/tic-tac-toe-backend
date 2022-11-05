import {
  ECell,
  EGameStatus,
  EPlayerTurn,
  ICellIndex,
  IdGame,
  IGame,
  IRowIndex,
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
    winner: null,
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

  if (game.users[0].nickname === user.nickname) return null;

  game.users[1] = user;

  game.status = EGameStatus.PLAYING;

  return game;
};

export const isUserInGame = (user: IUser, id: IdGame) => {
  const game = games.get(id);
  if (!game) return null;

  return game.users.find((u) => u?.nickname === user.nickname) ? game : null;
};

const whichTypeIsUser = (game: IGame, user: IUser): ECell | null => {
  const index = game.users.findIndex((u) => u?.nickname === user.nickname);
  if (index === 0) {
    return ECell.FIRST;
  }
  if (index === 1) {
    return ECell.SECOND;
  }
  return null;
};

const cellIsAvailable = (game: IGame, row: IRowIndex, cell: ICellIndex) => {
  if (game.winner) return false;

  if (game.status !== EGameStatus.PLAYING) return false;

  const cellBoard = game.board[row][cell];
  return cellBoard !== ECell.VOID;
};

export const move = (
  game: IGame,
  user: IUser,
  row: IRowIndex,
  cell: ICellIndex
) => {
  const isAvailable = cellIsAvailable(game, row, cell);
  if (!isAvailable) return null;

  const type = whichTypeIsUser(game, user);
  if (!type) return null;

  const isMatchFirst = game.turn === EPlayerTurn.FIRST && type === ECell.FIRST;
  const isMatchSecond =
    game.turn === EPlayerTurn.SECOND && type === ECell.SECOND;

  if (!(isMatchFirst || isMatchSecond)) return null;

  game.board[row][cell] = type;

  const cellWinner = getWinner(game);

  if (cellWinner) {
    game.winner =
      cellWinner === ECell.FIRST ? EPlayerTurn.FIRST : EPlayerTurn.SECOND;
  } else {
    if (isMatchFirst) game.turn = EPlayerTurn.SECOND;
    if (isMatchSecond) game.turn = EPlayerTurn.FIRST;
  }

  return game;
};

const getWinner = (game: IGame) => {
  const row = game.board.find((row) => {
    return row[0] === row[1] && row[0] === row[2];
  });
  const inRow = row ? row[0] : false;
  if (inRow) return inRow;

  let inColumn: ECell | false = false;
  for (let index = 0; index < 3; index++) {
    const first = game.board[0][index];
    const a = first === game.board[1][index];
    const b = game.board[1][index] === game.board[2][index];
    if (a && b) {
      inColumn = first;
      break;
    }
  }
  if (inColumn) return inColumn;

  const centerCell = game.board[1][1];

  const leftToRight =
    game.board[0][0] === centerCell && game.board[2][2] === centerCell;

  const rightToLeft =
    game.board[0][2] === centerCell && game.board[2][0] === centerCell;

  if (leftToRight || rightToLeft) return centerCell;

  return false;
};
