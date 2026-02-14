import { io } from "socket.io-client";

let socket;

export const initSocket = (userId) => {
  socket = io(import.meta.env.VITE_API_URL || "http://localhost:5050", {
    withCredentials: true,
    auth: { userId }, // send userId to backend for auth
  });

  socket.on("connect", () => console.log("Connected to socket server:", socket.id));
  socket.on("disconnect", () => console.log("Disconnected from socket server"));

  return socket;
};

export const subscribeCity = (city) => {
  if (!socket) return;
  socket.emit("subscribeCity", { city });
};

export const unsubscribeCity = () => {
  if (!socket) return;
  socket.emit("unsubscribeCity");
};

export const onNewNotification = (callback) => {
  if (!socket) return;
  socket.on("newNotification", callback);
};
