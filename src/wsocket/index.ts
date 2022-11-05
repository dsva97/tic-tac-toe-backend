import { Server as SocketIoServer } from "socket.io";
import { Server as HttpServer } from "http";
import { isUserInGame, move } from "../game";
import { ICellIndex, IdGame, IRowIndex, IUser } from "../types";

interface IWSocketJoinGroup {
  idGame: IdGame;
  user: IUser;
}

interface IWSocketMove {
  idGame: IdGame;
  user: IUser;
  row: IRowIndex;
  cell: ICellIndex;
}

export const initWSocket = (httpServer: HttpServer) => {
  const io = new SocketIoServer(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.on("join-group", ({ idGame, user }: IWSocketJoinGroup) => {
      const game = isUserInGame(user, idGame);
      if (!game) return;
      console.log(user);
      socket.join("game-" + game.id);
    });

    socket.on("move", ({ idGame, user, row, cell }: IWSocketMove) => {
      const game = isUserInGame(user, idGame);
      if (!game) return;
      const gameUpdated = move(game, user, row, cell);
      io.to("game-" + game.id).emit("moved", gameUpdated);
    });
  });
};
