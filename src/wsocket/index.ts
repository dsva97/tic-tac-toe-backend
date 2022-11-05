import { Server as SocketIoServer } from "socket.io";
import { Server as HttpServer } from "http";

export const initWSocket = (httpServer: HttpServer) => {
  const socket = new SocketIoServer(httpServer);

  socket.on("connection", () => {});
};
