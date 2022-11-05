import z from "zod";

export enum EGameStatus {
  CREATED = "CREATED",
  PLAYING = "PLAYING",
  FINISH = "FINISH",
}
export const ZEnumGameStatus = z.nativeEnum(EGameStatus);

export enum EPlayerTurn {
  FIRST = "FIRST",
  SECOND = "SECOND",
}
export const ZEnumPlayerTurn = z.nativeEnum(EPlayerTurn);

export enum ECell {
  FIRST = "FIRST",
  SECOND = "SECOND",
  VOID = "VOID",
}
export const ZEnumCell = z.nativeEnum(ECell);

export const ZBoardSchema = z.tuple([
  z.tuple([ZEnumCell, ZEnumCell, ZEnumCell]),
  z.tuple([ZEnumCell, ZEnumCell, ZEnumCell]),
  z.tuple([ZEnumCell, ZEnumCell, ZEnumCell]),
]);
export type IBoard = z.infer<typeof ZBoardSchema>;

export const ZUserSchema = z.object({
  nickname: z.string(),
  id: z.string(),
});
export type IUser = z.infer<typeof ZUserSchema>;

export const ZGameSchema = z.object({
  id: z.string(),
  start: z.date(),
  users: z.tuple([ZUserSchema, z.union([ZUserSchema, z.null()])]),
  status: ZEnumGameStatus,
  winner: z.union([ZEnumPlayerTurn, z.null()]),
  turn: ZEnumPlayerTurn,
  board: ZBoardSchema,
});
export type IGame = z.infer<typeof ZGameSchema>;

export const ZIdGameSchema = z.string();
export type IdGame = z.infer<typeof ZIdGameSchema>;

export type IRowIndex = 0 | 1 | 2;
export type ICellIndex = 0 | 1 | 2;
