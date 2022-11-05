import { Server as SocketIoServer } from "socket.io";
import { Server as HttpServer } from "http";
import { getById, isUserInGame } from "../game";
import { IdGame, IUser } from "../types";

interface IJoinGroup {
  idGame: IdGame;
  user: IUser;
}

export const initWSocket = (httpServer: HttpServer) => {
  const io = new SocketIoServer(httpServer);

  io.on("connection", (socket) => {
    socket.on("join-group", ({ idGame, user }: IJoinGroup) => {
      const game = isUserInGame(user, idGame);
      if (!game) return;
      socket.join("game-" + game.id);
    });

    socket.on("move", ({ idGame, user }: IJoinGroup) => {
      const game = isUserInGame(user, idGame);
      if (!game) return;
    });
  });
};
