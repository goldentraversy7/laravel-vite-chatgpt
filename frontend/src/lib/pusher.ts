import Pusher from "pusher-js";

const pusher = new Pusher(process.env.VITE_PUSHER_APP_KEY || "default-key", {
  cluster: process.env.VITE_PUSHER_APP_CLUSTER || "default-cluster",
});

export default pusher;
