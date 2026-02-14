// import { io } from "socket.io-client";

// let socket;

// export const initSocket = (userId) => {
//   socket = io(import.meta.env.VITE_API_URL || "http://localhost:5050", {
//     withCredentials: true,
//     auth: { userId }, // send userId to backend for auth
//   });

//   socket.on("connect", () => console.log("Connected to socket server:", socket.id));
//   socket.on("disconnect", () => console.log("Disconnected from socket server"));

//   return socket;
// };

// export const subscribeCity = (city) => {
//   if (!socket) return;
//   socket.emit("subscribeCity", { city });
// };

// export const unsubscribeCity = () => {
//   if (!socket) return;
//   socket.emit("unsubscribeCity");
// };

// export const onNewNotification = (callback) => {
//   if (!socket) return;
//   socket.on("newNotification", callback);
// };


import { io } from "socket.io-client";

let socket = null;


export const initSocket = (token) => {
  if (!import.meta.env.VITE_API_URL) {
    console.error("VITE_API_URL not set!");
    return null;
  }

  const backendURL = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, ""); // remove /api at end

  socket = io(backendURL, {
    transports: ["websocket"],
    withCredentials: true,
    auth: { token },
  });

  return socket;
};


export const subscribeCity = (city) => {
if (socket) socket.emit("subscribeCity", { city });
};

export const unsubscribeCity = () => {
if (socket) socket.emit("unsubscribeCity");
};

export const onNewNotification = (cb) => {
if (socket) socket.on("newNotification", cb);
};
